export interface WidgetSettings {
  chatbotName: string;
  chatbotTitle: string;
  greetingMessage: string;
  themeMode: 'light' | 'dark' | 'system';
  primaryColor: string; // Applies to AI response message bubbles, buttons, header and primary branding
  userBubbleColor?: string; // Applies only to user response message bubbles
  aiBubbleColor?: string; // Maintained for backwards compatibility
  fontFamily: string;
  borderRadius: string;
  chatBubblePosition: 'bottom-right' | 'bottom-left';
  quickQuestions: string[];
  portfolioUrl: string;
  allowedAdminEmails: string[];
  avatarUrl?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  url: string;
  role: string;
  year: string;
  tags: string[];
  description: string;
  highlights: string;
  isFeatured: boolean;
  createdAt?: string;
}

export interface ResumeKnowledge {
  resumeText: string;
  uploadedFileName?: string;
  summary?: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: number;
}

export interface RecruiterLead {
  name: string;
  email: string;
  company: string;
  role?: string;
}

export interface Conversation {
  id: string;
  recruiterName: string;
  recruiterEmail: string;
  recruiterCompany: string;
  recruiterRole?: string;
  messages: Message[];
  startedAt: string;
  updatedAt: string;
  notes?: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
}

export const DEFAULT_WIDGET_SETTINGS: WidgetSettings = {
  chatbotName: 'Cyber Ivan',
  chatbotTitle: 'Senior Product Designer & Builder',
  greetingMessage: "Hello! I'm the cyber avatar of Ivan Zhao. Ask me anything about my product design process, featured case studies, resume experience, or interview questions!",
  themeMode: 'dark',
  primaryColor: '#6366f1',
  userBubbleColor: '#1e293b',
  aiBubbleColor: '#6366f1',
  fontFamily: 'Plus Jakarta Sans',
  borderRadius: 'rounded-2xl',
  chatBubblePosition: 'bottom-right',
  quickQuestions: [
    'Tell me about your product design philosophy',
    'Walk me through your featured case study',
    'How do you collaborate with engineering & PMs?',
    'What roles and team sizes are you looking for?'
  ],
  portfolioUrl: 'https://www.ivanzhao.design/',
  allowedAdminEmails: ['ivan.zhao@ivanzhao.design', 'ivan.zhao.gd@gmail.com'],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
};

export const DEFAULT_RESUME_TEXT = `Ivan Zhao — Senior Product Designer & Design Technologist
Website: https://www.ivanzhao.design/
Email: ivan.zhao@ivanzhao.design
Location: San Francisco, CA (Open to Hybrid & Remote)

PROFESSIONAL SUMMARY
Lead & Senior Product Designer with 7+ years of experience crafting intuitive 0-to-1 enterprise SaaS platforms, AI-native workflow canvases, and consumer digital experiences. Specialized in bridging complex systems engineering with elegant, human-centric design. Track record of driving 40%+ retention boosts, architecting scalable multi-brand design systems, and rapid prototyping in React/TypeScript.

CORE EXPERTISE
• Product Design & Strategy: End-to-end design lifecycle, 0-to-1 feature definition, user journey mapping, design sprints, North Star vision.
• AI & Interaction Design: Multi-modal agent interfaces, canvas UX, latency feedback, human-in-the-loop workflows, prompt ergonomics.
• Design Systems & Engineering: Multi-theme token architecture, component libraries, Figma Auto-layout & Variables, React, Tailwind CSS.
• User Research & Analytics: Qualitative user interviews, usability benchmarking, telemetry-driven UX iteration, WCAG AAA compliance.

EXPERIENCE
Lead Product Designer | NextGen AI Studio (2022 – Present)
• Directed end-to-end product design for an AI orchestration canvas used by over 120,000 creators and enterprise developers.
• Devised visual interaction patterns for streaming model outputs, reducing user drop-off by 34% during long-running tasks.
• Partnered closely with VP of Product and Staff ML engineers to define foundational UX principles for autonomous agents.

Senior Product Designer | FinScale Technologies (2019 – 2022)
• Spearheaded the complete redesign of flagship enterprise fintech dashboard across desktop web and mobile (iOS/Android).
• Built Design System 2.0 with 80+ accessible components, cutting developer handoff friction and accelerating sprint delivery by 65%.
• Mentored 4 junior and mid-level product designers in design critique and interaction prototyping.

Product Designer & Frontend Prototyper | Apex Studio (2017 – 2019)
• Designed and shipped 10+ client mobile and web apps across healthcare, commerce, and media sectors.
• Built interactive functional prototypes in React and Framer to validate UX hypotheses with executive stakeholders.

EDUCATION & HONORS
• B.S. in Human-Computer Interaction & Design
• Red Dot Design Concept Winner
• Best Design System Award 2023`;

export const DEFAULT_PROJECTS: Omit<Project, 'id'>[] = [
  {
    title: 'Autonomous Canvas: Generative AI Workflow Suite',
    url: 'https://www.ivanzhao.design/work/autonomous-canvas',
    role: 'Lead Product Designer',
    year: '2023 - 2025',
    tags: ['AI Interface', 'Canvas UX', '0-to-1', 'Design Systems'],
    description: 'A modular, node-based workspace enabling creators and developers to compose, test, and deploy multi-agent AI workflows.',
    highlights: 'Pioneered non-blocking progressive disclosure for multi-step LLM operations. Led user testing across 50+ enterprise creators, yielding a 42% retention increase and reducing canvas cognitive friction.',
    isFeatured: true
  },
  {
    title: 'FinScale Enterprise: Cross-Platform Design System',
    url: 'https://www.ivanzhao.design/work/finscale',
    role: 'Staff Product Designer & Architect',
    year: '2021 - 2023',
    tags: ['Design System', 'Accessibility (WCAG AAA)', 'Fintech', 'Design Tokens'],
    description: 'Unified cross-platform design language and React token pipeline serving 4 mission-critical trading and asset management apps.',
    highlights: 'Authored 90+ accessible components with automatic dark/high-contrast mode token translation. Reduced frontend engineering review cycles by 65% and passed rigorous financial accessibility audits.',
    isFeatured: true
  },
  {
    title: 'Pulse Health: Patient Diagnostic Companion',
    url: 'https://www.ivanzhao.design/work/pulse-health',
    role: 'Senior Product Designer',
    year: '2019 - 2021',
    tags: ['Healthcare Mobile App', 'Data Visualization', 'Patient UX', 'iOS/Android'],
    description: 'Transforming dense diagnostic laboratory results into clear visual timelines and doctor-approved recovery action plans.',
    highlights: 'Designed intuitive visual biomarkers for elderly and anxious patients. Validated in clinical pilot resulting in 38% reduction in patient anxiety score and 54% higher treatment adherence.',
    isFeatured: false
  }
];

export const GOOGLE_FONTS_LIST = [
  { name: 'Roboto', label: 'Roboto (Clean & Ubiquitous)' },
  { name: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Modern & Clean)' },
  { name: 'Inter', label: 'Inter (Tech & Neutral)' },
  { name: 'Outfit', label: 'Outfit (Friendly & Geometric)' },
  { name: 'Space Grotesk', label: 'Space Grotesk (Cyber & Avant-Garde)' },
  { name: 'DM Sans', label: 'DM Sans (Minimalist & Crisp)' },
  { name: 'Playfair Display', label: 'Playfair Display (Editorial & Elegant)' }
];

export const COLOR_PRESETS = [
  { name: 'Indigo Electric', value: '#6366f1' },
  { name: 'Cyber Violet', value: '#8b5cf6' },
  { name: 'Emerald Matrix', value: '#10b981' },
  { name: 'Cyan Neon', value: '#06b6d4' },
  { name: 'Rose Quartz', value: '#f43f5e' },
  { name: 'Amber Sunset', value: '#f59e0b' },
  { name: 'Monochrome Steel', value: '#0f172a' }
];
