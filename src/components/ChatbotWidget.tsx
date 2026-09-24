import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Lock,
  UserCheck,
  Building2,
  Mail,
  User as UserIcon,
  ChevronDown,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatbotWidgetProps {
  isStandalone?: boolean;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ isStandalone = false }) => {
  const {
    settings,
    isWidgetOpen,
    setIsWidgetOpen,
    activeConversation,
    recruiterLead,
    startRecruiterConversation,
    sendMessage,
    isSendingMessage,
    setCurrentView,
    currentUser,
    isAdmin,
    endConversation,
  } = useApp();

  // Lead capture form state (Feature 6)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [leadError, setLeadError] = useState<string | null>(null);

  // Message input state
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isSendingMessage]);

  const handleStartLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      setLeadError('Please fill in your name, company name, and email address.');
      return;
    }
    // Simple email regex check
    if (!email.includes('@') || !email.includes('.')) {
      setLeadError('Please provide a valid email address.');
      return;
    }

    setLeadError(null);
    await startRecruiterConversation({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      role: role.trim() || undefined,
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isSendingMessage) return;
    const text = inputText;
    setInputText('');
    await sendMessage(text);
  };

  const handleQuickQuestion = async (q: string) => {
    if (isSendingMessage) return;
    await sendMessage(q);
  };

  // Border radius map
  const getRadiusClass = (radius: string) => {
    switch (radius) {
      case 'rounded-none':
        return 'rounded-none';
      case 'rounded-lg':
        return 'rounded-xl';
      case 'rounded-3xl':
        return 'rounded-3xl';
      case 'rounded-2xl':
      default:
        return 'rounded-2xl';
    }
  };

  const isDarkMode = settings.themeMode !== 'light';
  const positionClass =
    settings.chatBubblePosition === 'bottom-left'
      ? 'left-5 sm:left-8'
      : 'right-5 sm:right-8';

  // Helper to parse markdown links [Title](URL)
  const renderMessageContent = (content: string) => {
    // Regex for markdown links
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:opacity-80 transition mx-0.5"
          style={{ color: settings.primaryColor }}
        >
          <span>{match[1]}</span>
          <ExternalLink className="w-3 h-3 inline" />
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  const containerClasses = isStandalone
    ? 'w-full h-full flex flex-col justify-end items-end'
    : `fixed bottom-5 sm:bottom-8 ${positionClass} z-50`;

  const windowClasses = isStandalone
    ? `flex flex-col w-full h-full shadow-2xl overflow-hidden transition-all duration-300 border ${
        isDarkMode
          ? 'bg-slate-950 text-slate-100 border-slate-800/90'
          : 'bg-white text-slate-900 border-slate-200'
      } rounded-2xl`
    : `flex flex-col w-[92vw] sm:w-[410px] h-[600px] max-h-[85vh] shadow-2xl overflow-hidden transition-all duration-300 border ${
        isDarkMode
          ? 'bg-slate-950 text-slate-100 border-slate-800/90'
          : 'bg-white text-slate-900 border-slate-200'
      } rounded-2xl`;

  return (
    <div
      className={containerClasses}
      style={{ fontFamily: settings.fontFamily || 'Plus Jakarta Sans' }}
    >
      {/* Floating launcher trigger */}
      {!isWidgetOpen && (
        <div className="relative group">
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-white text-xs whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Interview Me ({settings.chatbotName} • Cyber Version)</span>
          </div>

          <button
            onClick={() => setIsWidgetOpen(true)}
            className="flex items-center gap-3 px-4 py-3.5 rounded-full text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: settings.primaryColor || '#6366f1',
              boxShadow: `0 10px 25px -5px ${settings.primaryColor || '#6366f1'}66`,
            }}
            aria-label="Open portfolio chatbot"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white overflow-hidden">
                {settings.avatarUrl ? (
                  <img
                    src={settings.avatarUrl}
                    alt={settings.chatbotName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  'IZ'
                )}
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
            </div>

            <div className="hidden sm:flex flex-col text-left pr-1">
              <span className="text-xs font-bold leading-tight">Interview Me</span>
              <span className="text-[10px] text-white/80 leading-tight">Cyber Version</span>
            </div>

            <MessageSquare className="w-5 h-5 text-white ml-0.5" />
          </button>
        </div>
      )}

      {/* Widget Window */}
      {isWidgetOpen && (
        <div
          className={windowClasses}
          style={{
            boxShadow: `0 20px 40px -15px ${settings.primaryColor}33`,
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3.5 flex items-center justify-between text-white relative overflow-hidden"
            style={{ backgroundColor: settings.primaryColor || '#6366f1' }}
          >
            <div className="flex items-center gap-3 z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-sm text-white border border-white/30 overflow-hidden">
                  {settings.avatarUrl ? (
                    <img
                      src={settings.avatarUrl}
                      alt={settings.chatbotName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    'IZ'
                  )}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight text-white leading-none">
                    {settings.chatbotName}
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 text-white font-medium">
                    Cyber Version
                  </span>
                </div>
                <p className="text-[11px] text-white/85 mt-0.5 leading-none truncate max-w-[200px]">
                  {settings.chatbotTitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 z-10">
              {/* Option to End Conversation if in active chat */}
              {activeConversation && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to end this interview conversation?')) {
                      endConversation();
                    }
                  }}
                  title="End Conversation & Reset Chat"
                  className="px-2 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-medium transition cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">End Chat</span>
                </button>
              )}

              {/* Feature 7: Admin Sign-In directly through widget header */}
              <button
                onClick={() => {
                  setCurrentView('admin');
                }}
                title={isAdmin ? 'Admin Dashboard' : 'Sign in as Ivan Zhao (Admin)'}
                className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs transition cursor-pointer flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-medium">
                  {isAdmin ? 'Admin' : 'Login'}
                </span>
              </button>

              <button
                onClick={() => {
                  setIsWidgetOpen(false);
                  try {
                    window.parent?.postMessage({ type: 'CYBER_IVAN_CLOSE' }, '*');
                  } catch (e) {}
                }}
                className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
                aria-label="Close widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader banner showing recruiter info if present */}
          {recruiterLead && (
            <div
              className={`px-3 py-1.5 text-[11px] flex items-center justify-between border-b ${
                isDarkMode
                  ? 'bg-slate-900/90 text-slate-400 border-slate-800'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-indigo-400 font-medium truncate max-w-[220px]">
                  Interviewing: {recruiterLead.name} ({recruiterLead.company})
                </span>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('End conversation and start a new session?')) {
                    endConversation();
                  }
                }}
                className="text-[10px] text-slate-400 hover:text-rose-400 transition cursor-pointer underline underline-offset-2"
              >
                End Chat
              </button>
            </div>
          )}

          {/* Main Body: Either Lead Capture Form (Feature 6) OR Chat Conversation */}
          {!activeConversation ? (
            <div className="flex-1 p-5 overflow-y-auto flex flex-col justify-center">
              <div className="text-center mb-6">
                <div
                  className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-white mb-3 shadow-lg"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold">Welcome, Recruiter!</h4>
                <p className={`text-xs mt-1 max-w-xs mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Please share your details before asking questions so Ivan can review the interview Q&A and follow up.
                </p>
              </div>

              {leadError && (
                <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{leadError}</span>
                </div>
              )}

              <form onSubmit={handleStartLead} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700 focus:border-indigo-500 text-white'
                          : 'bg-slate-50 border-slate-300 focus:border-indigo-600 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">
                    Company Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Figma, Stripe, Airbnb"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700 focus:border-indigo-500 text-white'
                          : 'bg-slate-50 border-slate-300 focus:border-indigo-600 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      placeholder="e.g. sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none transition ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700 focus:border-indigo-500 text-white'
                          : 'bg-slate-50 border-slate-300 focus:border-indigo-600 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 opacity-80">
                    Your Title / Role <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Design Talent Lead, Head of Design"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none transition ${
                      isDarkMode
                        ? 'bg-slate-900 border-slate-700 focus:border-indigo-500 text-white'
                        : 'bg-slate-50 border-slate-300 focus:border-indigo-600 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl text-white font-semibold text-xs transition shadow-md hover:brightness-110 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Start Interview Chat</span>
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-slate-800 text-center">
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-[11px] text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Are you Ivan Zhao? Sign in to Admin Dashboard</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Conversation View */
            <div className="flex-1 flex flex-col h-full min-h-0">
              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
                {activeConversation.messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-1 px-1">
                        <span>{isUser ? 'You' : settings.chatbotName}</span>
                        <span>•</span>
                        <span>
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>

                      <div
                        className={`max-w-[85%] p-3.5 leading-relaxed rounded-2xl text-white ${
                          isUser
                            ? 'shadow-sm border border-white/10'
                            : 'shadow-md'
                        }`}
                        style={{
                          backgroundColor: isUser
                            ? settings.userBubbleColor || (isDarkMode ? '#1e293b' : '#334155')
                            : settings.primaryColor,
                        }}
                      >
                        <div className="whitespace-pre-wrap">
                          {renderMessageContent(msg.text)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* AI typing indicator */}
                {isSendingMessage && (
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] text-slate-500 mb-1 px-1">
                      {settings.chatbotName} is formulating answer...
                    </span>
                    <div
                      className={`p-3 rounded-2xl flex items-center gap-1.5 ${
                        isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips (Feature 3) */}
              {settings.quickQuestions && settings.quickQuestions.length > 0 && (
                <div className={`p-2 border-t overflow-x-auto flex gap-1.5 no-scrollbar ${
                  isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  {settings.quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q)}
                      disabled={isSendingMessage}
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium transition cursor-pointer border ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-700/80 hover:border-indigo-500 text-slate-300 hover:text-white'
                          : 'bg-white border-slate-300 hover:border-indigo-600 text-slate-700'
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <form
                onSubmit={handleSend}
                className={`p-3 border-t flex items-center gap-2 ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <input
                  type="text"
                  placeholder="Ask about design projects, resume, process..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isSendingMessage}
                  className={`flex-1 px-3 py-2 text-xs rounded-xl border focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-700 focus:border-indigo-500 text-white'
                      : 'bg-slate-50 border-slate-300 focus:border-indigo-600 text-slate-900'
                  }`}
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isSendingMessage}
                  className="p-2 rounded-xl text-white font-medium transition disabled:opacity-40 cursor-pointer shadow-md"
                  style={{ backgroundColor: settings.primaryColor }}
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
