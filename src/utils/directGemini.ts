import { Project, Message, RecruiterLead } from '../types';

export async function callDirectGemini(params: {
  apiKey: string;
  messages: Message[];
  resumeText?: string;
  projects?: Project[];
  chatbotName?: string;
  chatbotTitle?: string;
  portfolioUrl?: string;
  recruiterInfo?: Partial<RecruiterLead>;
}): Promise<string> {
  const {
    apiKey,
    messages,
    resumeText = '',
    projects = [],
    chatbotName = 'Cyber Ivan',
    chatbotTitle = 'Senior Product Designer & Builder',
    portfolioUrl = 'https://www.ivanzhao.design/',
    recruiterInfo,
  } = params;

  const projectsContext = projects.length > 0
    ? projects
        .map(
          (p, idx) =>
            `Project ${idx + 1}: ${p.title} (${p.year || 'Recent'})
Role: ${p.role}
Tags: ${p.tags?.join(', ') || 'Product Design'}
URL: ${p.url}
Overview: ${p.description}
Key Highlights & Metrics: ${p.highlights || 'N/A'}`
        )
        .join('\n\n')
    : 'No additional projects listed yet.';

  const recruiterContext = recruiterInfo?.name
    ? `You are speaking with ${recruiterInfo.name}${
        recruiterInfo.company ? ` from ${recruiterInfo.company}` : ''
      }${recruiterInfo.role ? ` (Role: ${recruiterInfo.role})` : ''}. Acknowledge them warmly and tailor design discussions to their company/domain if appropriate.`
    : 'You are speaking with a portfolio visitor / hiring manager.';

  const systemInstruction = `You are "${chatbotName}", the official AI digital twin, avatar, and interview proxy for Ivan Zhao (${chatbotTitle}).
Portfolio Website: ${portfolioUrl}
Contact Email: ivan.zhao@ivanzhao.design

${recruiterContext}

=== OBJECTIVE ===
Your mission is to represent Ivan Zhao in product design interviews, portfolio walkthroughs, and recruiter inquiries with high precision, professionalism, depth, and enthusiasm.

=== KNOWLEDGE BASE ===
1. IVAN'S RESUME & BACKGROUND:
${resumeText}

2. FEATURED CASE STUDIES & PROJECTS:
${projectsContext}

=== GUIDELINES ===
- Speak in the first person ("I", "my work", "my design process") as Ivan's cyber avatar.
- Deeply ground all answers in the resume, metrics, and project case studies provided above.
- Provide crisp, structured, engaging responses using clean formatting.
- Invite recruiters to reach out to ivan.zhao@ivanzhao.design for direct conversations.`;

  const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-2.5-flash'];
  const contents = messages
    .filter((m) => m.sender === 'user' || m.sender === 'assistant')
    .map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

  let lastError: any = null;

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      } else {
        const errData = await res.json().catch(() => ({}));
        lastError = new Error(errData?.error?.message || `HTTP ${res.status}`);
      }
    } catch (e: any) {
      lastError = e;
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini API.');
}
