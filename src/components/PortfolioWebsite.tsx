import React from 'react';
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Briefcase,
  FileText,
  Mail,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PortfolioWebsite: React.FC = () => {
  const {
    projects,
    resume,
    settings,
    setIsWidgetOpen,
    setCurrentView,
    currentUser,
    isAdmin,
  } = useApp();

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Banner indicating Cyber AI Demo & Admin Access */}
      <div className="border-b border-indigo-500/20 bg-indigo-950/40 backdrop-blur-md px-4 py-2.5 text-xs text-indigo-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-white">Live Portfolio Simulation:</span>
            <span className="text-indigo-300">
              Official Site <a href="https://www.ivanzhao.design/" target="_blank" rel="noreferrer" className="underline hover:text-white">ivanzhao.design</a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWidgetOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600/80 hover:bg-indigo-500 text-white font-medium transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Ask Cyber Ivan AI</span>
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer border border-slate-700"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Admin Dashboard {currentUser ? `(${currentUser.email?.split('@')[0]})` : ''}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-[#090b10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/25">
              IZ
            </div>
            <div>
              <a href="#hero" className="font-semibold text-lg text-white tracking-tight hover:text-indigo-400 transition">
                Ivan Zhao
              </a>
              <p className="text-xs text-slate-400">Senior Product Designer & Builder</p>
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('admin')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 hover:border-indigo-500/50 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/60 transition cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isAdmin ? 'Admin Panel' : 'Admin Login'}</span>
            </button>

            <button
              onClick={() => setIsWidgetOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chat with Cyber Ivan</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-28 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-600/15 via-violet-600/20 to-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>Available for Senior / Staff Product Design roles</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.12] mb-6">
              Designing intelligent <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">AI interfaces</span> and scalable product systems.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
              I’m Ivan Zhao, a Senior Product Designer & Design Technologist. I specialize in 0-to-1 complex platforms, generative AI ergonomics, and high-impact design systems.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsWidgetOpen(true)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm shadow-xl shadow-indigo-600/25 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Interview Me (Cyber Version)</span>
              </button>

              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 text-sm font-medium transition"
              >
                <span>View Selected Case Studies</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">7+ Years</div>
              <div className="text-xs text-slate-400">0-to-1 & Scale Product Design</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-1">120K+</div>
              <div className="text-xs text-slate-400">Active Creators on AI Canvas</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-bold text-violet-400 mb-1">65% Cut</div>
              <div className="text-xs text-slate-400">Design-to-Code Review Friction</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">WCAG AAA</div>
              <div className="text-xs text-slate-400">Accessibility Compliant Systems</div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Featured Case Studies</span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
                Selected Portfolio Projects
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Configured dynamically in Ivan's admin dashboard. Cyber Ivan uses these exact projects and metrics to answer recruiters' questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 p-6 shadow-lg hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                    <span className="font-medium text-indigo-400">{proj.role}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                    {proj.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
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
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.tags?.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-medium transition"
                    >
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        setIsWidgetOpen(true);
                        // trigger inquiry in widget
                      }}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-yellow-400" />
                      <span>Ask AI about this</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section id="philosophy" className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Design Framework</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
              How I Think & Build
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              My approach connects user research, systems architecture, and generative AI ergonomics into production-ready software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AI UX & Latency Ergonomics</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Generative AI requires new interaction primitives: progressive disclosure during inference, non-blocking undo/redo states, and confidence indicators that respect user agency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Scalable Systems Architecture</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Design systems must be living contracts between engineering and design. I build tokenized architectures that support multi-brand theming, strict accessibility, and automated component sync.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">0-to-1 Discovery & Validation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                De-risking technical products through rapid interactive prototyping in code (React/TypeScript) and qualitative user interview loops before committing months of engineering capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Resume Overview */}
      <section id="resume" className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Background</span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-1">
                Experience & Resume Data
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Upload New Resume in Dashboard</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 md:p-8">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6 flex-wrap gap-3">
              <div>
                <h3 className="text-xl font-bold text-white">Ivan Zhao</h3>
                <p className="text-sm text-indigo-400 font-medium">Senior Product Designer & Design Technologist</p>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Synchronized with Cyber Ivan AI Knowledge Base</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-sm text-slate-300 whitespace-pre-line leading-relaxed font-mono bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 max-h-96 overflow-y-auto">
              {resume.resumeText}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-12 bg-[#090b10]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
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

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => setCurrentView('admin')}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-indigo-400" />
              <span>Admin Dashboard</span>
            </button>
            <span>•</span>
            <a href="mailto:ivan.zhao@ivanzhao.design" className="hover:text-white transition">
              ivan.zhao@ivanzhao.design
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
