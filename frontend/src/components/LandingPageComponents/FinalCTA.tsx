import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* 1. DYNAMIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
        {/* Soft Organic Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-125 bg-blue-50 rounded-full blur-[120px] opacity-60" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA5MDkxYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] [mask:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* 2. FLOATING LIQUID CONTAINER */}
        <div className="relative bg-white/60 backdrop-blur-3xl border border-white border-b-slate-200 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.08)] rounded-[4rem] p-12 md:p-20 text-center overflow-hidden">
          
          {/* Animated Gradient Border (Optional Visual) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-20" />

          <div className="max-w-3xl mx-auto">
            {/* TAG */}
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-8 animate-bounce-slow">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Efficiency Unlocked</span>
            </div>

            {/* HEADING */}
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
              Ready to Transform <br /> 
              <span className="text-blue-600">Your Hiring?</span>
            </h2>

            {/* DESCRIPTION */}
            <div className="space-y-2 mb-12">
              <p className="text-xl md:text-2xl text-slate-600 font-bold tracking-tight">
                Stop wasting time on resumes.
              </p>
              <p className="text-lg text-slate-400 font-medium">
                Let AI do the heavy lifting while you focus on the people.
              </p>
            </div>

            {/* 3. TACTILE CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <button className="group relative w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-2xl shadow-slate-200">
                Book a Free Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 hover:border-blue-200 text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all hover:bg-slate-50">
                <MessageSquare className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                Talk to Sales
              </button>
            </div>
          </div>

          {/* BACKGROUND DECORATION INSIDE CARD */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-100/30 rounded-full blur-3xl" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />
        </div>

        {/* 4. FINAL TRUST INDICATOR */}
        <div className="mt-16 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
            Join 500+ teams hiring 10x faster
          </p>
        </div>
      </div>
    </section>
  );
}