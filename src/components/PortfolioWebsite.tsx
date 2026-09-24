import React, { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  Lock,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PortfolioWebsite: React.FC = () => {
  const {
    projects,
    resume,
    setIsWidgetOpen,
    setCurrentView,
    currentUser,
    isAdmin,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Banner indicating Cyber AI Demo & Admin Access */}
      <div className="border-b border-indigo-500/20 bg-indigo-950/40 backdrop-blur-md px-3 sm:px-4 py-2 text-xs text-indigo-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-white">Live Portfolio Simulation:</span>
            <span className="text-indigo-300 truncate">
              Official Site <a href="https://www.ivanzhao.design/" target="_blank" rel="noreferrer" className="underline hover:text-white">ivanzhao.design</a>
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600/80 hover:bg-indigo-500 active:scale-95 text-white text-[11px] sm:text-xs font-medium transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Ask Cyber Ivan AI</span>
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-[11px] sm:text-xs transition cursor-pointer border border-slate-700"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Admin {currentUser ? `(${currentUser.email?.split('@')[0]})` : ''}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#090b10]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-base sm:text-lg text-white shadow-lg shadow-indigo-500/25">
              IZ
            </div>
            <div>
              <a href="#hero" className="font-semibold text-base sm:text-lg text-white tracking-tight hover:text-indigo-400 transition">
                Ivan Zhao
              </a>
              <p className="text-[11px] sm:text-xs text-slate-400 hidden xs:block">Senior Product Designer & Builder</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#work" className="hover:text-white transition">Selected Work</a>
            <a href="#philosophy" className="hover:text-white transition">Philosophy</a>
            <a href="#resume" className="hover:text-white transition">Experience</a>
            <a
              href="https://www.ivanzhao.design/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
            >
              <span>ivanzhao.design</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-indigo-500/50 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isAdmin ? 'Admin Panel' : 'Admin Login'}</span>
            </button>

            <button
              onClick={() => setIsWidgetOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Chat with Cyber Ivan</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#090b10] px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <a
              href="#work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-200 hover:text-indigo-400 transition"
            >
              Selected Work
            </a>
            <a
              href="#philosophy"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-200 hover:text-indigo-400 transition"
            >
              Design Philosophy
            </a>
            <a
              href="#resume"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-200 hover:text-indigo-400 transition"
            >
              Experience & Resume
            </a>
            <a
              href="https://www.ivanzhao.design/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 py-2 text-sm text-slate-400 hover:text-white transition"
            >
              <span>Visit Official Site (ivanzhao.design)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsWidgetOpen(true);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Open Interview Chatbot</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setCurrentView('admin');
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-medium text-xs flex items-center justify-center gap-2 border border-slate-700"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 sm:pt-20 pb-16 sm:pb-28 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[700px] h-[200px] sm:h-[350px] bg-gradient-to-r from-indigo-600/15 via-violet-600/20 to-blue-600/15 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shrink-0" />
              <span className="truncate">Available for Senior / Staff Product Design roles</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-5 sm:mb-6">
              Designing intelligent <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">AI interfaces</span> and scalable product systems.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 leading-relaxed mb-7 sm:mb-8">
              I’m Ivan Zhao, a Senior Product Designer & Design Technologist. I specialize in 0-to-1 complex platforms, generative AI ergonomics, and high-impact design systems.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsWidgetOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium text-sm shadow-xl shadow-indigo-600/25 transition cursor-pointer min-h-[44px]"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Interview Me (Cyber Version)</span>
              </button>

              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 active:scale-95 text-slate-200 border border-slate-700 text-sm font-medium transition min-h-[44px]"
              >
                <span>View Selected Case Studies</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-20 pt-8 sm:pt-10 border-t border-slate-800/80">
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-3xl font-bold text-white mb-0.5 sm:mb-1">7+ Years</div>
              <div className="text-[11px] sm:text-xs text-slate-400">0-to-1 & Scale Product Design</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-3xl font-bold text-indigo-400 mb-0.5 sm:mb-1">120K+</div>
              <div className="text-[11px] sm:text-xs text-slate-400">Active Creators on AI Canvas</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-3xl font-bold text-violet-400 mb-0.5 sm:mb-1">65% Cut</div>
              <div className="text-[11px] sm:text-xs text-slate-400">Design-to-Code Friction</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-xl sm:text-3xl font-bold text-emerald-400 mb-0.5 sm:mb-1">WCAG AAA</div>
              <div className="text-[11px] sm:text-xs text-slate-400">Accessible System Standards</div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="py-14 sm:py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Featured Case Studies</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Selected Portfolio Projects
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Configured dynamically in Ivan's admin dashboard. Cyber Ivan uses these exact projects and metrics to answer recruiters' questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 p-5 sm:p-6 shadow-lg hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 sm:mb-4">
                    <span className="font-medium text-indigo-400">{proj.role}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  {proj.highlights && (
                    <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 mb-4">
                      <span className="font-semibold text-indigo-300 block mb-1">Key Impact & Interview Context:</span>
                      {proj.highlights}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
                    {proj.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-800 text-xs gap-2">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition py-1"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        setIsWidgetOpen(true);
                      }}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer py-1"
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>Ask AI</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="philosophy" className="py-14 sm:py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Design Framework</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              How I Think & Build
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              My approach connects user research, systems architecture, and generative AI ergonomics into production-ready software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 sm:mb-5">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">AI UX & Latency Ergonomics</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Generative AI requires new interaction primitives: progressive disclosure during inference, non-blocking undo/redo states, and confidence indicators that respect user agency.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4 sm:mb-5">
                <Layers className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">Scalable Systems Architecture</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Design systems must be living contracts between engineering and design. I build tokenized architectures that support multi-brand theming, strict accessibility, and automated component sync.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 sm:mb-5">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">0-to-1 Discovery & Validation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                De-risking technical products through rapid interactive prototyping in code (React/TypeScript) and qualitative user interview loops before committing months of engineering capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Resume Overview */}
      <section id="resume" className="py-14 sm:py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-12 gap-3 sm:gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Background</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Experience & Resume Data
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Manage Resume in Dashboard</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-800 mb-4 sm:mb-6 flex-wrap gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Ivan Zhao</h3>
                <p className="text-xs sm:text-sm text-indigo-400 font-medium">Senior Product Designer & Design Technologist</p>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span>Synchronized with Cyber Ivan AI Knowledge Base</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed font-mono bg-slate-950/80 p-3.5 sm:p-5 rounded-xl border border-slate-800/80 max-h-96 overflow-y-auto">
              {resume.resumeText}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 sm:py-12 bg-[#090b10] safe-bottom">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
              IZ
            </div>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Ivan Zhao. All rights reserved. Portfolio at{' '}
              <a href="https://www.ivanzhao.design/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">
                ivanzhao.design
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400 flex-wrap justify-center">
            <button
              onClick={() => setCurrentView('admin')}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer py-1"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Admin Dashboard</span>
            </button>
            <span>•</span>
            <a href="mailto:ivan.zhao@ivanzhao.design" className="hover:text-white transition py-1">
              ivan.zhao@ivanzhao.design
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
