import React, { useState, useEffect } from 'react';
import {
  Palette,
  FileText,
  FolderGit2,
  Settings as SettingsIcon,
  MessageSquareText,
  Eye,
  LogOut,
  Sparkles,
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Upload,
  Check,
  Search,
  Filter,
  ArrowLeft,
  Mail,
  Building,
  User as UserIcon,
  Calendar,
  Lock,
  ShieldCheck,
  Copy,
  CheckCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  WidgetSettings,
  Project,
  GOOGLE_FONTS_LIST,
  COLOR_PRESETS,
  DEFAULT_PROJECTS,
  DEFAULT_RESUME_TEXT,
} from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    loginWithGoogle,
    logout,
    settings,
    saveSettings,
    resume,
    saveResume,
    projects,
    saveProject,
    deleteProject,
    conversations,
    deleteConversation,
    updateConversationStatus,
    setCurrentView,
    setIsWidgetOpen,
    setNotification,
  } = useApp();

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<
    'visual' | 'widget' | 'resume' | 'projects' | 'conversations' | 'live'
  >('visual');

  // Local state for Visual Customization (Feature 1)
  const [visualForm, setVisualForm] = useState<WidgetSettings>({ ...settings });

  // Local state for Widget Copy (Feature 3)
  const [newQuickQuestion, setNewQuickQuestion] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');

  // Local state for Resume & Knowledge (Feature 2)
  const [resumeText, setResumeText] = useState(resume.resumeText);
  const [resumeSummary, setResumeSummary] = useState(resume.summary || '');
  const [isUploading, setIsUploading] = useState(false);

  // Synchronize local form state with context / Firestore updates
  useEffect(() => {
    if (resume.resumeText) {
      setResumeText(resume.resumeText);
    }
    if (resume.summary) {
      setResumeSummary(resume.summary);
    }
  }, [resume.resumeText, resume.summary]);

  useEffect(() => {
    setVisualForm({ ...settings });
  }, [settings]);

  // Local state for Project Modal / Editor (Feature 2)
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [projectTagInput, setProjectTagInput] = useState('');

  // Local state for Conversations Review (Feature 5)
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [conversationSearch, setConversationSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed' | 'contacted' | 'archived'>('all');
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Delete confirmation modals (avoids blocked window.confirm in iframes)
  const [conversationToDelete, setConversationToDelete] = useState<{
    id: string;
    name: string;
    company: string;
  } | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Embed code copy status
  const [hasCopiedEmbed, setHasCopiedEmbed] = useState(false);

  // If user is not authenticated or not admin, show Google Sign-In gate (Feature 7)
  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400 mb-6">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">
            Cyber Ivan Admin Portal
          </h2>

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            By default, this dashboard is accessible only to{' '}
            <span className="text-indigo-400 font-semibold">ivan.zhao@ivanzhao.design</span>{' '}
            and authorized accounts via Google Sign-In.
          </p>

          {currentUser && !isAdmin && (
            <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left">
              <p className="font-semibold mb-1">Signed in as: {currentUser.email}</p>
              <p className="text-amber-300/80">
                This Google account is not on the admin allowlist. Please sign in with{' '}
                <strong>ivan.zhao@ivanzhao.design</strong> or <strong>ivan.zhao.gd@gmail.com</strong>.
              </p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={loginWithGoogle}
              className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm transition shadow-lg flex items-center justify-center gap-3 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            <button
              onClick={() => setCurrentView('portfolio')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle saving visual customizations (Feature 1)
  const handleSaveVisual = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveSettings(visualForm);
  };

  // Avatar image upload handler (reads file as base64 data URL)
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setNotification('Please upload an image file (PNG, JPG, SVG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setVisualForm((prev) => ({ ...prev, avatarUrl: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle saving resume (Feature 2)
  const handleSaveResume = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveResume(resumeText, resumeSummary);
  };

  // PDF File upload handler (Extracts text and summary from PDF via Gemini)
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setNotification('Please upload a resume file in PDF format (.pdf).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const base64Data = event.target?.result as string;
        const response = await fetch('/api/parse-resume-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pdfBase64: base64Data,
            fileName: file.name,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to process PDF resume with AI parser.');
        }

        const data = await response.json();
        const extractedText = data.resumeText || '';
        const summaryText = data.summary || `Extracted from ${file.name}`;

        setResumeText(extractedText);
        setResumeSummary(summaryText);
        await saveResume(extractedText, summaryText, file.name);
      } catch (err: any) {
        console.error('PDF Parse Error:', err);
        setNotification(err.message || 'Could not parse PDF. Please try again.');
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      setNotification('Error reading PDF file.');
    };

    reader.readAsDataURL(file);
  };

  // Handle saving project (Feature 2)
  const handleSaveProjectForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.url || !editingProject?.description) {
      setNotification('Please fill in Title, URL, and Description.');
      return;
    }
    await saveProject({
      id: editingProject.id,
      title: editingProject.title,
      url: editingProject.url,
      role: editingProject.role || 'Lead Product Designer',
      year: editingProject.year || '2024',
      tags: editingProject.tags || [],
      description: editingProject.description,
      highlights: editingProject.highlights || '',
      isFeatured: Boolean(editingProject.isFeatured),
    });
    setEditingProject(null);
  };

  // Add tag to project
  const handleAddProjectTag = () => {
    if (!projectTagInput.trim() || !editingProject) return;
    const currentTags = editingProject.tags || [];
    setEditingProject({
      ...editingProject,
      tags: [...currentTags, projectTagInput.trim()],
    });
    setProjectTagInput('');
  };

  // Remove tag
  const handleRemoveProjectTag = (idx: number) => {
    if (!editingProject) return;
    const currentTags = editingProject.tags || [];
    setEditingProject({
      ...editingProject,
      tags: currentTags.filter((_, i) => i !== idx),
    });
  };

  // Filter conversations (Feature 5)
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.recruiterName.toLowerCase().includes(conversationSearch.toLowerCase()) ||
      c.recruiterEmail.toLowerCase().includes(conversationSearch.toLowerCase()) ||
      c.recruiterCompany.toLowerCase().includes(conversationSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);

  const webflowScriptSnippet = `<!-- Cyber Ivan Portfolio AI Chatbot - Webflow 1-Line Embed -->
<script
  src="https://ais-pre-5efmozibtofp33aeltzawf-486643578424.us-west2.run.app/widget.js"
  async>
</script>`;

  const webflowEmbedSnippet = `<!-- Cyber Ivan Portfolio AI Chatbot - Webflow Bottom-Right iFrame -->
<div id="cyber-ivan-widget-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 999999;">
  <iframe
    id="cyber-ivan-chatbot"
    src="https://ais-pre-5efmozibtofp33aeltzawf-486643578424.us-west2.run.app/?mode=widget"
    style="width: 420px; height: 640px; max-width: calc(100vw - 32px); max-height: calc(100vh - 48px); border: none; border-radius: 24px; box-shadow: 0 20px 50px -10px rgba(0,0,0,0.5); display: block;"
    allow="clipboard-write"
    loading="lazy"
    title="Cyber Ivan Portfolio AI">
  </iframe>
</div>`;

  const embedCodeSnippet = webflowScriptSnippet;

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('portfolio')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition cursor-pointer"
              title="Return to Portfolio View"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base">Cyber Ivan Control Center</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Admin Verified</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Connected to <span className="text-indigo-400">ivanzhao.design</span> • {currentUser.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setIsWidgetOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Test Widget</span>
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-xl bg-slate-900 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-800 text-slate-400 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 px-6">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs font-medium">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'visual'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>1. Visual Customization</span>
          </button>

          <button
            onClick={() => setActiveTab('widget')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'widget'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>2. Widget Copy & Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>3. Resume & Bio Data</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>4. Selected Project Links ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conversations')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'conversations'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <MessageSquareText className="w-3.5 h-3.5" />
            <span>5. Recruiter Conversations ({conversations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('live')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'live'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>6. Live Preview & Embed</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {/* TAB 1: VISUAL CUSTOMIZATION (Feature 1) */}
        {activeTab === 'visual' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSaveVisual} className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Visual Styling & Branding</h3>
                    <p className="text-xs text-slate-400">
                      Customize how Cyber Ivan appears on ivanzhao.design. Changes are saved to Firestore and update the live widget immediately.
                    </p>
                  </div>

                  {/* Primary Color Preset & Hex (AI Response Message & Buttons) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        Primary Brand Color (AI Response Message & Buttons)
                      </label>
                      <span className="text-[10px] text-indigo-400 font-medium">Applied to AI bubbles, CTA buttons & header</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {COLOR_PRESETS.map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() => setVisualForm({ ...visualForm, primaryColor: col.value, aiBubbleColor: col.value })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                            visualForm.primaryColor === col.value
                              ? 'border-white bg-slate-800 text-white'
                              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: col.value }}
                          />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={visualForm.primaryColor}
                        onChange={(e) =>
                          setVisualForm({ ...visualForm, primaryColor: e.target.value, aiBubbleColor: e.target.value })
                        }
                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={visualForm.primaryColor}
                        onChange={(e) =>
                          setVisualForm({ ...visualForm, primaryColor: e.target.value, aiBubbleColor: e.target.value })
                        }
                        className="w-32 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                      <span className="text-xs text-slate-500">Custom Primary Hex</span>
                    </div>
                  </div>

                  {/* User Response Bubble Background Color */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-300">
                        User Response Bubble Background Color
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">Applies exclusively to user messages</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {[
                        { name: 'Slate Dark (Default)', value: '#1e293b' },
                        { name: 'Charcoal Deep', value: '#27272a' },
                        { name: 'Indigo Shade', value: '#312e81' },
                        { name: 'Navy Midnight', value: '#0f172a' },
                        { name: 'Emerald Shade', value: '#064e3b' },
                        { name: 'Soft Light Gray', value: '#f1f5f9' },
                      ].map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() => setVisualForm({ ...visualForm, userBubbleColor: col.value })}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                            (visualForm.userBubbleColor || '#1e293b') === col.value
                              ? 'border-white bg-slate-800 text-white'
                              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: col.value }}
                          />
                          <span>{col.name}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={visualForm.userBubbleColor || '#1e293b'}
                        onChange={(e) =>
                          setVisualForm({ ...visualForm, userBubbleColor: e.target.value })
                        }
                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={visualForm.userBubbleColor || '#1e293b'}
                        onChange={(e) =>
                          setVisualForm({ ...visualForm, userBubbleColor: e.target.value })
                        }
                        className="w-32 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 font-mono text-white focus:outline-none focus:border-indigo-500"
                      />
                      <span className="text-xs text-slate-500">Custom User Bubble Hex</span>
                    </div>
                  </div>

                  {/* Google Fonts Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Widget Google Font
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {GOOGLE_FONTS_LIST.map((f) => (
                        <button
                          key={f.name}
                          type="button"
                          onClick={() => setVisualForm({ ...visualForm, fontFamily: f.name })}
                          className={`p-3 rounded-xl border text-left text-xs transition cursor-pointer ${
                            visualForm.fontFamily === f.name
                              ? 'border-indigo-500 bg-indigo-950/30 text-white font-semibold'
                              : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                          }`}
                          style={{ fontFamily: f.name }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{f.name}</span>
                            {visualForm.fontFamily === f.name && (
                              <Check className="w-4 h-4 text-indigo-400" />
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 opacity-80 block mt-0.5">
                            {f.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Position & Theme Mode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Widget Screen Position
                      </label>
                      <select
                        value={visualForm.chatBubblePosition}
                        onChange={(e) =>
                          setVisualForm({
                            ...visualForm,
                            chatBubblePosition: e.target.value as 'bottom-right' | 'bottom-left',
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="bottom-right">Bottom Right (Standard)</option>
                        <option value="bottom-left">Bottom Left</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-2">
                        Color Theme
                      </label>
                      <div className="flex gap-2">
                        {(['dark', 'light'] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setVisualForm({ ...visualForm, themeMode: m })}
                            className={`flex-1 py-2 px-3 rounded-xl border text-xs font-medium capitalize transition cursor-pointer ${
                              visualForm.themeMode === m
                                ? 'border-indigo-500 bg-indigo-950/40 text-white'
                                : 'border-slate-800 bg-slate-950 text-slate-400'
                            }`}
                          >
                            {m} Theme
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Avatar Upload */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Cyber Ivan Avatar Image
                    </label>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center overflow-hidden shrink-0">
                          {visualForm.avatarUrl ? (
                            <img
                              src={visualForm.avatarUrl}
                              alt="Cyber Ivan Avatar Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-xs text-white">IZ</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {visualForm.avatarUrl ? 'Custom Avatar Uploaded' : 'Default Avatar (IZ Initials)'}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Upload a high-resolution photo, illustration, or 3D render (.png, .jpg, .webp).
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium border border-indigo-500/50 transition cursor-pointer flex items-center gap-1.5 shadow-sm">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="hidden"
                          />
                        </label>

                        {visualForm.avatarUrl && (
                          <button
                            type="button"
                            onClick={() => setVisualForm({ ...visualForm, avatarUrl: undefined })}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Visual Customizations</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Live Visual Inspector Card */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Live Style Inspector</span>
              </h3>

              <div
                className={`p-6 border shadow-2xl transition-all rounded-2xl ${
                  visualForm.themeMode === 'light'
                    ? 'bg-white text-slate-900 border-slate-200'
                    : 'bg-slate-950 text-slate-100 border-slate-800'
                }`}
                style={{ fontFamily: visualForm.fontFamily }}
              >
                <div
                  className="px-4 py-3 rounded-xl text-white flex items-center justify-between mb-4"
                  style={{ backgroundColor: visualForm.primaryColor }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs overflow-hidden">
                      {visualForm.avatarUrl ? (
                        <img
                          src={visualForm.avatarUrl}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        'IZ'
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{visualForm.chatbotName}</div>
                      <div className="text-[10px] text-white/80">{visualForm.chatbotTitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-medium">
                    Cyber Version
                  </span>
                </div>

                <div className="space-y-2.5 text-xs mb-4">
                  {/* AI Response Message (Uses Primary Brand Color) */}
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-slate-400 mb-1 px-1">
                      {visualForm.chatbotName}
                    </span>
                    <div
                      className="p-3.5 rounded-2xl text-white shadow-md max-w-[85%]"
                      style={{ backgroundColor: visualForm.primaryColor }}
                    >
                      {visualForm.greetingMessage}
                    </div>
                  </div>

                  {/* User Message (Uses User Response Bubble Color) */}
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-slate-400 mb-1 px-1">
                      You
                    </span>
                    <div
                      className="p-3.5 rounded-2xl shadow-sm ml-auto max-w-[80%] border border-white/10 text-white"
                      style={{
                        backgroundColor:
                          visualForm.userBubbleColor ||
                          (visualForm.themeMode === 'light' ? '#334155' : '#1e293b'),
                      }}
                    >
                      Can you walk me through your AI Canvas case study?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WIDGET COPY & PROMPTS (Feature 3) */}
        {activeTab === 'widget' && (
          <div className="max-w-3xl space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Widget Personality & Copy</h3>
                <p className="text-xs text-slate-400">
                  Define the cyber persona's title, greeting message, and quick interview prompt chips shown to recruiters.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Chatbot Name
                  </label>
                  <input
                    type="text"
                    value={visualForm.chatbotName}
                    onChange={(e) => setVisualForm({ ...visualForm, chatbotName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Chatbot Subtitle
                  </label>
                  <input
                    type="text"
                    value={visualForm.chatbotTitle}
                    onChange={(e) => setVisualForm({ ...visualForm, chatbotTitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Recruiter Greeting Message
                  </label>
                  <textarea
                    rows={3}
                    value={visualForm.greetingMessage}
                    onChange={(e) =>
                      setVisualForm({ ...visualForm, greetingMessage: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Quick Questions List */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Quick Starter Prompts (Recruiter Interview Chips)
                  </label>
                  <div className="space-y-2 mb-3">
                    {visualForm.quickQuestions?.map((q, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
                      >
                        <span>{q}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = visualForm.quickQuestions.filter((_, i) => i !== idx);
                            setVisualForm({ ...visualForm, quickQuestions: updated });
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a new quick question chip..."
                      value={newQuickQuestion}
                      onChange={(e) => setNewQuickQuestion(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newQuickQuestion.trim()) return;
                        setVisualForm({
                          ...visualForm,
                          quickQuestions: [...visualForm.quickQuestions, newQuickQuestion.trim()],
                        });
                        setNewQuickQuestion('');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Chip</span>
                    </button>
                  </div>
                </div>

                {/* Feature 7: Admin emails */}
                <div className="pt-4 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Allowed Admin Google Accounts
                  </label>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Default: <code>ivan.zhao@ivanzhao.design</code>. You can add extra testing accounts below.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {visualForm.allowedAdminEmails?.map((em, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs flex items-center gap-2"
                      >
                        <span>{em}</span>
                        {em.toLowerCase() !== 'ivan.zhao@ivanzhao.design' && (
                          <button
                            type="button"
                            onClick={() => {
                              const updated = visualForm.allowedAdminEmails.filter((_, i) => i !== idx);
                              setVisualForm({ ...visualForm, allowedAdminEmails: updated });
                            }}
                            className="hover:text-rose-400"
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Add an email (e.g. your Google account)..."
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newAdminEmail.trim() || !newAdminEmail.includes('@')) return;
                        if (!visualForm.allowedAdminEmails.includes(newAdminEmail.trim())) {
                          setVisualForm({
                            ...visualForm,
                            allowedAdminEmails: [
                              ...visualForm.allowedAdminEmails,
                              newAdminEmail.trim(),
                            ],
                          });
                        }
                        setNewAdminEmail('');
                      }}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Admin</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => saveSettings(visualForm)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Personality & Copy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RESUME & BIO DATA (Feature 2) */}
        {activeTab === 'resume' && (
          <div className="max-w-4xl space-y-6">
            <form onSubmit={handleSaveResume} className="space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Resume Knowledge Base (Cyber Ivan Context)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Upload your official resume in PDF format. Cyber Ivan parses the PDF and uses its content to answer recruiter interview questions with precision.
                    </p>
                  </div>

                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 border border-indigo-500/50 transition cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>{isUploading ? 'Parsing PDF Resume...' : 'Upload PDF Resume (.pdf)'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      disabled={isUploading}
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* PDF Status / Dropzone Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{resume.uploadedFileName || 'Ivan_Zhao_Resume.pdf'}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
                          Active Ground Truth
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {isUploading
                          ? 'AI is extracting skills, career trajectory & case study highlights...'
                          : `Last synchronized: ${new Date(resume.updatedAt || '').toLocaleDateString([], { dateStyle: 'medium' })}`}
                      </p>
                    </div>
                  </div>

                  <label className="text-xs text-indigo-400 hover:text-indigo-300 font-medium underline underline-offset-2 cursor-pointer">
                    <span>{isUploading ? 'Processing...' : 'Replace with New PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      disabled={isUploading}
                      onChange={handlePdfUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Executive Summary / Bio Note
                  </label>
                  <input
                    type="text"
                    value={resumeSummary}
                    onChange={(e) => setResumeSummary(e.target.value)}
                    placeholder="Brief 1-liner summary of your design background..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Resume Content (Experience, Skills, Metrics, Tools, Education)
                  </label>
                  <textarea
                    rows={16}
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full p-4 text-xs font-mono rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setResumeText(DEFAULT_RESUME_TEXT);
                    }}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    Reset to Default Ivan Zhao Resume
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-lg shadow-indigo-600/25 flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Resume Context</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: SELECTED PROJECT LINKS (Feature 2) */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Selected Portfolio Projects for Interview Q&A
                </h3>
                <p className="text-xs text-slate-400">
                  Add or edit the exact project links and interview talking points that Cyber Ivan will cite and link to when answering recruiters.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingProject({
                    title: '',
                    url: 'https://www.ivanzhao.design/work/',
                    role: 'Lead Product Designer',
                    year: '2024',
                    tags: ['AI Interface', 'Design System'],
                    description: '',
                    highlights: '',
                    isFeatured: true,
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Portfolio Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-indigo-400">{proj.role}</span>
                      <span>{proj.year}</span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2">{proj.title}</h4>

                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-slate-400 hover:text-indigo-300 flex items-center gap-1 mb-3 truncate"
                    >
                      <span className="truncate">{proj.url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>

                    <p className="text-xs text-slate-300 mb-4 line-clamp-3">
                      {proj.description}
                    </p>

                    {proj.highlights && (
                      <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 mb-4">
                        <span className="font-semibold text-indigo-300 block text-[10px] uppercase tracking-wider mb-1">
                          Interview Talking Points:
                        </span>
                        <p className="line-clamp-3 text-[11px]">{proj.highlights}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {proj.tags?.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => setProjectToDelete({ id: proj.id, title: proj.title })}
                        className="text-rose-400 hover:text-rose-300 cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Edit/Add Modal */}
            {editingProject && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-xl p-6 rounded-3xl bg-slate-900 border border-slate-800 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-white">
                      {editingProject.id ? 'Edit Portfolio Project' : 'Add New Project'}
                    </h4>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-300">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={editingProject.title || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, title: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-slate-300">
                        Case Study URL (on ivanzhao.design) *
                      </label>
                      <input
                        type="url"
                        required
                        value={editingProject.url || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, url: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-slate-300">Your Role</label>
                        <input
                          type="text"
                          value={editingProject.role || ''}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, role: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1 text-slate-300">Timeline / Year</label>
                        <input
                          type="text"
                          value={editingProject.year || ''}
                          onChange={(e) =>
                            setEditingProject({ ...editingProject, year: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-slate-300">
                        Tags (Keywords for search & AI match)
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {editingProject.tags?.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] flex items-center gap-1"
                          >
                            <span>{t}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProjectTag(i)}
                              className="text-slate-500 hover:text-white"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Design Systems, WCAG AAA..."
                          value={projectTagInput}
                          onChange={(e) => setProjectTagInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddProjectTag}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 text-white"
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-slate-300">
                        Overview / Problem & Solution *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={editingProject.description || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, description: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-slate-300">
                        Interview Talking Points & Measurable Impact (Trained for Gemini)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Metrics, trade-offs, engineering collaboration anecdotes, user feedback..."
                        value={editingProject.highlights || ''}
                        onChange={(e) =>
                          setEditingProject({ ...editingProject, highlights: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                      >
                        Save Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: RECRUITER CONVERSATIONS REVIEW (Feature 5) */}
        {activeTab === 'conversations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Recruiter Conversations & Lead Registry
                </h3>
                <p className="text-xs text-slate-400">
                  Every conversation between recruiters and Cyber Ivan is recorded as text. Review transcripts, evaluate leads, and leave interview notes.
                </p>
              </div>

              {/* Filters & Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, company, email..."
                    value={conversationSearch}
                    onChange={(e) => setConversationSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>

                {conversations.length > 0 && (
                  <button
                    onClick={() => setShowClearAllModal(true)}
                    className="px-3 py-1.5 text-xs rounded-xl bg-slate-900 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-800 hover:border-rose-900/50 transition cursor-pointer flex items-center gap-1.5"
                    title="Delete all conversation records"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Clear All ({conversations.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Conversations split-view */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
              {/* List */}
              <div className="lg:col-span-5 space-y-2.5 overflow-y-auto max-h-[700px] pr-1">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 text-center text-slate-400 text-xs">
                    <MessageSquareText className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                    <p className="font-semibold text-slate-300">No recorded conversations yet</p>
                    <p className="mt-1">
                      Recruiters visiting the widget will appear here automatically once they enter their lead details.
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    const isSelected = selectedConversationId === conv.id;
                    const messageCount = conv.messages?.length || 0;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => {
                          setSelectedConversationId(conv.id);
                          setAdminNoteInput(conv.notes || '');
                        }}
                        className={`p-4 rounded-2xl border transition cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-950/40 border-indigo-500 shadow-md'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-white">{conv.recruiterName}</span>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                                conv.status === 'new'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : conv.status === 'contacted'
                                  ? 'bg-indigo-500/20 text-indigo-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {conv.status}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setConversationToDelete({
                                  id: conv.id,
                                  name: conv.recruiterName,
                                  company: conv.recruiterCompany,
                                });
                              }}
                              title="Delete conversation record"
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-indigo-300 mb-2">
                          <Building className="w-3 h-3" />
                          <span>{conv.recruiterCompany}</span>
                          {conv.recruiterRole && (
                            <span className="text-slate-500">• {conv.recruiterRole}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span className="truncate max-w-[180px]">{conv.recruiterEmail}</span>
                          <span>{messageCount} messages</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Transcript Drawer */}
              <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between max-h-[700px]">
                {selectedConversation ? (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4 flex-wrap gap-2">
                      <div>
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <span>{selectedConversation.recruiterName}</span>
                          <span className="text-xs font-normal text-slate-400">
                            from {selectedConversation.recruiterCompany}
                          </span>
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                          <a
                            href={`mailto:${selectedConversation.recruiterEmail}`}
                            className="text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            <span>{selectedConversation.recruiterEmail}</span>
                          </a>
                          <span>•</span>
                          <span>
                            Started:{' '}
                            {new Date(selectedConversation.startedAt).toLocaleString([], {
                              dateStyle: 'short',
                              timeStyle: 'short',
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={selectedConversation.status}
                          onChange={(e) =>
                            updateConversationStatus(
                              selectedConversation.id,
                              e.target.value as any,
                              adminNoteInput
                            )
                          }
                          className="px-2.5 py-1 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="archived">Archived</option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            setConversationToDelete({
                              id: selectedConversation.id,
                              name: selectedConversation.recruiterName,
                              company: selectedConversation.recruiterCompany,
                            })
                          }
                          title="Delete conversation & lead record"
                          className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 transition cursor-pointer flex items-center gap-1 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span className="hidden sm:inline">Delete Record</span>
                        </button>
                      </div>
                    </div>

                    {/* Chat Transcript List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
                      {selectedConversation.messages?.map((m) => {
                        const isUser = m.sender === 'user';
                        return (
                          <div
                            key={m.id}
                            className={`p-3 rounded-2xl text-xs leading-relaxed ${
                              isUser
                                ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-100 ml-4'
                                : 'bg-slate-950 border border-slate-800 text-slate-200 mr-4'
                            }`}
                          >
                            <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                              <span className="font-semibold text-slate-400">
                                {isUser
                                  ? selectedConversation.recruiterName
                                  : 'Cyber Ivan'}
                              </span>
                              <span>
                                {new Date(m.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                            <div className="whitespace-pre-wrap">{m.text}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Admin Follow-up Notes */}
                    <div className="pt-3 border-t border-slate-800">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">
                        Ivan's Private Notes / Interview Scheduling Action:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Followed up on LinkedIn, portfolio review call next Tuesday..."
                          value={adminNoteInput}
                          onChange={(e) => setAdminNoteInput(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                        />
                        <button
                          onClick={() =>
                            updateConversationStatus(
                              selectedConversation.id,
                              selectedConversation.status,
                              adminNoteInput
                            )
                          }
                          className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-white transition cursor-pointer"
                        >
                          Save Note
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 text-xs py-12">
                    <MessageSquareText className="w-10 h-10 mb-2 text-slate-600" />
                    <p className="font-semibold text-slate-400">Select a conversation to review transcript</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LIVE PREVIEW & EMBED CODE (Feature 4) */}
        {activeTab === 'live' && (
          <div className="max-w-4xl space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Webflow Embed & Bottom-Right Integration Guide
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Easily add the Cyber Ivan chatbot to your Webflow site (<strong>ivanzhao.design</strong>) so it appears fixed at the bottom right across every single page.
                </p>
              </div>

              {/* Step 1 & 2 Explanation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-[11px] text-white">1</span>
                    <span>Method A: Global Embed (All Webflow Pages)</span>
                  </div>
                  <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>Go to your Webflow <strong>Site Settings</strong>.</li>
                    <li>Click the <strong>Custom Code</strong> tab on the left.</li>
                    <li>Scroll down to <strong>Footer Code</strong> (before <code className="text-indigo-300">&lt;/body&gt;</code>).</li>
                    <li>Paste the code snippet below and click <strong>Save Changes</strong>.</li>
                    <li><strong>Publish</strong> your site to production!</li>
                  </ol>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-[11px] text-white">2</span>
                    <span>Method B: Webflow Designer Embed Block</span>
                  </div>
                  <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                    <li>In the Webflow Designer, open your Global <strong>Footer Symbol</strong>.</li>
                    <li>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-white">A</kbd> to open Add Elements and drag an <strong>Embed</strong> element into the footer.</li>
                    <li>Paste the code snippet into the HTML Embed Code editor.</li>
                    <li>Click <strong>Save & Close</strong> and <strong>Publish</strong>.</li>
                  </ol>
                </div>
              </div>

              {/* Option 1: 1-Line Script */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Option 1: Recommended 1-Line Script (Webflow Site Settings)
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium">
                      ✓ Injects floating bubble at bottom-right, responsive on all mobile and desktop pages
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(webflowScriptSnippet);
                      setHasCopiedEmbed(true);
                      setTimeout(() => setHasCopiedEmbed(false), 2000);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-semibold shadow-lg shadow-indigo-600/20 transition cursor-pointer shrink-0"
                  >
                    {hasCopiedEmbed ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5 text-white" />
                        <span>Copied Script!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy 1-Line Script</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                  {webflowScriptSnippet}
                </pre>
              </div>

              {/* Option 2: iFrame Embed */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Option 2: Direct iFrame Embed
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ✓ For custom iframe embedding with manual dimensions
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(webflowEmbedSnippet);
                      setNotification('Copied iFrame embed code!');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-medium transition cursor-pointer shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy iFrame Tag</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-indigo-300 font-mono overflow-x-auto leading-relaxed">
                  {webflowEmbedSnippet}
                </pre>
              </div>

              {/* Test Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-400">
                  Want to test the chatbot's live responses & prompt settings directly?
                </span>
                <button
                  onClick={() => {
                    setCurrentView('portfolio');
                    setIsWidgetOpen(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition cursor-pointer flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>Launch Live Simulation</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL: Delete Single Recruiter Conversation Record */}
      {conversationToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Delete Recruiter Conversation Record?
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Are you sure you want to permanently delete the conversation transcript and lead registry record for{' '}
              <strong className="text-white">{conversationToDelete.name}</strong> ({conversationToDelete.company})?
            </p>
            <p className="text-[11px] text-slate-500 mb-6">
              This action will remove the lead and conversation transcript immediately.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setConversationToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await deleteConversation(conversationToDelete.id);
                    if (selectedConversationId === conversationToDelete.id) {
                      setSelectedConversationId(null);
                    }
                  } finally {
                    setIsDeleting(false);
                    setConversationToDelete(null);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Record</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Clear All Recruiter Conversations */}
      {showClearAllModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Clear All Recruiter Conversations ({conversations.length})?
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              This will permanently delete all {conversations.length} recruiter conversation records and lead registry entries from the system.
            </p>
            <p className="text-[11px] text-slate-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setShowClearAllModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    for (const conv of conversations) {
                      await deleteConversation(conv.id);
                    }
                    setSelectedConversationId(null);
                    setNotification(`Cleared all conversation records.`);
                  } finally {
                    setIsDeleting(false);
                    setShowClearAllModal(false);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <span>Clearing All...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Records</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Delete Project */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">
              Delete Project?
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Are you sure you want to remove <strong className="text-white">{projectToDelete.title}</strong> from your portfolio and AI knowledge base?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    await deleteProject(projectToDelete.id);
                  } finally {
                    setIsDeleting(false);
                    setProjectToDelete(null);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/30 transition cursor-pointer flex items-center gap-1.5"
              >
                {isDeleting ? (
                  <span>Deleting...</span>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Project</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
