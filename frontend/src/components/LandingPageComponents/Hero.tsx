import { useState } from 'react';
import { ArrowRight, Play, Sparkles, CheckCircle2, AlertCircle, Code2, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';

export default function Hero() {
  const candidates = [
    {
      id: 1,
      name: "John Doe",
      score: 98,
      statusColor: "bg-emerald-500",
      stack: ["Go", "Rust", "React", "Node.js", "Python"],
      experience: "3+ Years (Fullstack & AI Research)",
      projects: ["AI Resume Parser", "Distributed Ledger System"],
      strengths: ["Expert in modern low-level languages (Rust/Go)", "Winner of National Innovation Award", "Strong Machine Learning foundations"],
      gaps: ["Currently an undergraduate (2027 grad)", "No enterprise-scale legacy system experience"],
      education: "Global Tech Institute"
    },
    {
      id: 2,
      name: "Sarah Chen",
      score: 88,
      statusColor: "bg-amber-400",
      stack: ["React", "TypeScript", "AWS", "Tailwind", "PostgreSQL"],
      experience: "5 Years (Senior Frontend at FinTech)",
      projects: ["Global Payments Dashboard", "Design System CLI"],
      strengths: ["Deep expertise in Cloud Architecture (AWS)", "Lead experience managing small teams", "Exceptional UI/UX implementation"],
      gaps: ["No backend experience in Go/Rust", "Limited exposure to Python AI libraries"],
      education: "Horizon University"
    },
    {
      id: 3,
      name: "Kevin Miller",
      score: 11,
      statusColor: "bg-rose-500",
      stack: ["HTML", "Basic CSS", "Wordpress"],
      experience: "6 Months (Internship)",
      projects: ["Personal Blog", "To-Do List App"],
      strengths: ["Basic understanding of web structure", "Eager to learn"],
      gaps: ["Missing core requirements (JS/React)", "Lacks professional project depth", "Incomplete CV documentation"],
      education: "Riverdale Academy"
    }
  ];

  const [activeTab, setActiveTab] = useState(candidates[0]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* 1. DYNAMIC BACKGROUND ELEMENTS (RESTORED) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/40 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-100/50 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA5MDkxYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-100"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* 2. LIQUID BADGE */}
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-full px-4 py-2 mb-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="bg-cyan-500 p-1 rounded-full">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            The Future of Hiring
          </span>
        </div>

        {/* 3. BOLD TYPOGRAPHY */}
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
          Hire <span className="text-transparent bg-clip-text bg-linear-to-br from-cyan-500 to-blue-600">Smarter</span> <br /> 
          with AI
        </h1>

        <p className="max-w-2xl mx-auto text-xl text-slate-500 font-medium leading-relaxed mb-12">
          JobThingIG helps companies instantly evaluate, rank, and shortlist candidates using AI — so you spend time interviewing the best, not filtering resumes.
        </p>

        {/* 4. TACTILE BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a href="#contact-form">
            <button className="group relative bg-slate-900 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200">
              Book a Demo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>

          <a href="/dashboard">
            <button className="group bg-white border-2 border-slate-100 hover:border-blue-200 text-slate-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all hover:bg-slate-50 shadow-sm">
              <div className="bg-blue-100 p-1.5 rounded-full group-hover:bg-blue-600 transition-colors">
                <Play className="w-3 h-3 text-blue-600 group-hover:text-white fill-current" />
              </div>
              Try It Live
            </button>
          </a>
        </div>

        {/* 5. INTERACTIVE MOCKUP */}
        <div className="mt-20 relative max-w-6xl mx-auto group">
          <div className="absolute -inset-4 bg-linear-to-r from-cyan-100 to-blue-100 rounded-[3rem] blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000" />
          
          <div className="relative rounded-3xl border border-slate-200/60 bg-white p-2 shadow-2xl backdrop-blur-sm flex flex-col md:flex-row h-162.5">
            
            {/* SIDEBAR */}
            <div className="w-full md:w-80 border-r border-slate-100 bg-slate-50/50 p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-6 px-2 text-left">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Ranking</span>
                <div className="bg-blue-100 text-blue-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Page 1</div>
              </div>
              
              <div className="space-y-3">
                {candidates.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveTab(c)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer ${
                      activeTab.id === c.id 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-[1.02]' 
                        : 'hover:bg-white border border-transparent text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${activeTab.id === c.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {c.id}
                      </div>
                      <div className="text-left">
                        <p className="text-[12px] font-black leading-tight">{c.name}</p>
                        <p className={`text-[9px] uppercase tracking-tighter font-bold opacity-60`}>Rank #{c.id}</p>
                      </div>
                    </div>
                    <div className={`${activeTab.id === c.id ? 'bg-white/20' : c.statusColor} text-white text-[9px] font-black px-2 py-1 rounded-lg`}>
                      {c.score}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 bg-white p-8 overflow-y-auto text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{activeTab.name} <span className={`inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] text-white align-middle ${activeTab.statusColor}`}>{activeTab.score}%</span></h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <GraduationCap size={14} /> {activeTab.education}
                    </span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="flex items-center gap-1 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                      <Briefcase size={14} /> {activeTab.experience}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <a  className="p-3 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-slate-50 transition-colors">Portfolio</a>
                   <a  className="p-3 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors">Github</a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* STRENGTHS */}
                <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-[2rem]">
                  <div className="flex items-center gap-2 mb-4 text-emerald-600">
                    <CheckCircle2 size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Strengths</span>
                  </div>
                  <ul className="space-y-3">
                    {activeTab.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-slate-600 font-medium leading-tight flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GAPS (ALWAYS RED) */}
                <div className="bg-rose-50/50 border border-rose-100 p-6 rounded-[2rem]">
                  <div className="flex items-center gap-2 mb-4 text-rose-600">
                    <AlertCircle size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Critical Gaps</span>
                  </div>
                  <ul className="space-y-3">
                    {activeTab.gaps.map((g, i) => (
                      <li key={i} className="text-xs text-rose-700 font-medium leading-tight flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* STACK & PROJECTS */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <div className="flex items-center gap-2 mb-4 text-slate-900">
                      <Code2 size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeTab.stack.map(s => (
                        <span key={s} className="bg-white border border-slate-200 px-3 py-1 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                    <div className="flex items-center gap-2 mb-4 text-slate-900">
                      <FolderGit2 size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Key Projects</span>
                    </div>
                    <div className="space-y-2">
                      {activeTab.projects.map(p => (
                        <div key={p} className="text-[11px] font-bold text-slate-600 flex items-center gap-2 uppercase tracking-tighter">
                          <div className="w-1 h-1 rounded-full bg-blue-500" /> {p}
                        </div>
                      ))}
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}