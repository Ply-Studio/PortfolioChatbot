import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  sender: 'user' | 'assistant' | 'system';
  text: string;
}

interface ProjectInfo {
  title: string;
  url: string;
  role: string;
  year?: string;
  tags?: string[];
  description: string;
  highlights?: string;
}

interface RecruiterInfo {
  name: string;
  company: string;
  email: string;
  role?: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  resumeText?: string;
  projects?: ProjectInfo[];
  chatbotName?: string;
  chatbotTitle?: string;
  portfolioUrl?: string;
  recruiterInfo?: RecruiterInfo;
}

export async function handleGeminiChat(body: ChatRequestBody): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const {
    messages = [],
    resumeText = '',
    projects = [],
    chatbotName = 'Cyber Ivan',
    chatbotTitle = 'Senior Product Designer & Builder',
    portfolioUrl = 'https://www.ivanzhao.design/',
    recruiterInfo,
  } = body;

  const projectsContext = projects.length > 0
    ? projects.map((p, idx) => `
Project #${idx + 1}: ${p.title}
URL: ${p.url}
Role: ${p.role || 'Product Designer'}
Timeline: ${p.year || 'Recent'}
Tags: ${Array.isArray(p.tags) ? p.tags.join(', ') : ''}
Overview: ${p.description}
Key Interview Talking Points & Metrics: ${p.highlights || 'N/A'}
`).join('\n---\n')
    : 'No specific project links provided yet.';

  const recruiterContext = recruiterInfo
    ? `You are speaking with ${recruiterInfo.name} from ${recruiterInfo.company} (${recruiterInfo.email}${recruiterInfo.role ? `, ${recruiterInfo.role}` : ''}). Greet them warmly and tailor answers to their company context when appropriate.`
    : 'You are speaking with a recruiter visiting the portfolio.';

  const systemInstruction = `You are ${chatbotName} (${chatbotTitle}), the official cyber version of Ivan Zhao, representing Ivan to prospective recruiters, hiring managers, and design leaders visiting ${portfolioUrl}.

COMMUNICATION PERSONA & TONE:
- Tone: Professional, Senior UX / Visual Designer tone. Articulate, design-systems fluent, craft-obsessed, thoughtful, and executive-ready.
- Perspective: Always speak in the first person ("I", "my design process", "when I led design at...", "my approach to interaction architecture").
- Core Strengths to highlight: 0-to-1 complex product discovery, AI interaction heuristics & latency ergonomics, scalable design systems (multi-brand tokens, WCAG AAA accessibility), high-fidelity visual craft, and rigorous engineering collaboration.
- Recruiter Context: ${recruiterContext}

DATA SOURCES TO GROUND ANSWERS:
1. RESUME & CAREER CONTEXT:
${resumeText || 'Ivan Zhao — Senior Product Designer & Design Technologist with 7+ years in enterprise SaaS, AI workflows, and design systems.'}

2. SELECTED PORTFOLIO PROJECTS:
${projectsContext}

RESPONSE GUIDELINES:
- Deliver structured, insightful, and concise responses reflecting the thought process of a Senior / Lead Product Designer.
- When referencing case studies or portfolio work, weave in the exact markdown project link, e.g. [Project Title](URL), so recruiters can click directly.
- Use structured bullet points or paragraphs with clear UX terminology (e.g., progressive disclosure, mental models, cognitive load, token architecture, Figma variables, usability testing).
- For behavioral/interview questions, use concise STAR format (Situation, Task, Action, Result) with real impact metrics.
- Keep responses sharp and impactful (avoid fluff). For scheduling interviews or confidential items, warmly provide Ivan's email: ivan.zhao@ivanzhao.design.`;

  // Format message history for Gemini
  // Last message is the current prompt
  const lastUserMsg = messages[messages.length - 1]?.text || 'Hello!';

  // Format previous history
  const historyTurns: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
  
  // Take last 8 messages for context
  const contextMsgs = messages.slice(0, -1).slice(-8);
  for (const m of contextMsgs) {
    if (m.sender === 'user') {
      historyTurns.push({
        role: 'user',
        parts: [{ text: m.text }],
      });
    } else if (m.sender === 'assistant') {
      historyTurns.push({
        role: 'model',
        parts: [{ text: m.text }],
      });
    }
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: [
      ...historyTurns,
      {
        role: 'user',
        parts: [{ text: lastUserMsg }],
      },
    ],
    config: {
      systemInstruction,
      temperature: 0.7,
      topP: 0.95,
    },
  });

  return response.text || "Thank you for asking! I'd love to chat more about this. Feel free to explore my portfolio at https://www.ivanzhao.design/ or reach out directly at ivan.zhao@ivanzhao.design.";
}

export async function handleParseResumePdf(pdfBase64: string, fileName?: string): Promise<{ resumeText: string; summary: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables.');
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Remove data URI prefix if present
  const base64Clean = pdfBase64.replace(/^data:application\/pdf;base64,/, '').trim();

  const pdfPart = {
    inlineData: {
      mimeType: 'application/pdf',
      data: base64Clean,
    },
  };

  const promptPart = {
    text: `You are an expert talent recruiter and document parser.
Analyze this uploaded PDF resume in full detail and extract:
1. "summary": A concise 1-2 sentence executive summary of the candidate's professional profile, seniority, and primary expertise.
2. "resumeText": The complete, comprehensive, verbatim resume content formatted in clean structured Markdown.
   - Include EVERY single section found in the document: Contact/Links, Summary/Objective, Full Work Experience (every company, job title, employment dates, detailed bullet points, accomplishments, and quantifiable metrics), Core Competencies & Skills, Design Systems & Methodologies, Software Tools & Tech Stack, Education, Certifications, and Awards.
   - Do NOT omit or summarize any job roles or achievements from the PDF.

Return ONLY a valid JSON object matching this exact structure:
{
  "summary": "...",
  "resumeText": "..."
}`,
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3.7-flash',
    contents: {
      parts: [pdfPart, promptPart],
    },
    config: {
      responseMimeType: 'application/json',
      temperature: 0.1,
    },
  });

  try {
    const parsed = JSON.parse(response.text || '{}');
    return {
      resumeText: parsed.resumeText || response.text || '',
      summary: parsed.summary || 'Senior Product Designer & Design Technologist',
    };
  } catch {
    const raw = response.text || '';
    return {
      resumeText: raw,
      summary: 'Senior Product Designer & Design Technologist',
    };
  }
}

