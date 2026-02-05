import { Rocket, Users, Building2, Briefcase, GraduationCap, Building } from 'lucide-react';

const audiences = [
  { icon: Rocket, label: 'Startups', color: 'from-cyan-500 to-blue-600' },
  { icon: Users, label: 'Recruiters', color: 'from-blue-500 to-indigo-600' },
  { icon: Building2, label: 'HR teams', color: 'from-indigo-600 to-violet-600' },
  { icon: Briefcase, label: 'Agencies', color: 'from-violet-600 to-purple-500' },
  { icon: GraduationCap, label: 'Universities', color: 'from-purple-500 to-blue-500' },
  { icon: Building, label: 'Enterprises', color: 'from-blue-500 to-cyan-500' },
];

export default function TargetAudience() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <span className="text-[20vw] font-black uppercase tracking-tighter">Scalable</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Universal Compatibility
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
            Built for Modern <span className="text-slate-400">Hiring Teams</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
            From 5 candidates to 50,000 — our AI engine adapts to your specific organizational needs.
          </p>
        </div>

        {/* 6-Column Pod Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-linear-to-br ${audience.color} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative bg-white/60 backdrop-blur-xl border border-slate-100 rounded-[2rem] p-8 text-center transition-all duration-500 group-hover:bg-white group-hover:border-blue-100 group-hover:-translate-y-2 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-500/10 h-full flex flex-col items-center justify-center">
                  
                  {/* Icon Container */}
                  <div className={`w-14 h-14 bg-linear-to-br ${audience.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:rotate-12`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-black text-slate-900 text-[11px] uppercase tracking-widest">
                    {audience.label}
                  </h3>

                  {/* Dot Decorator */}
                  <div className={`mt-4 w-1 h-1 rounded-full bg-linear-to-r ${audience.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Social Proof Hint */}
        <div className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale contrast-125">
          <div className="font-black text-2xl tracking-tighter text-slate-900">FORBES</div>
          <div className="font-black text-2xl tracking-tighter text-slate-900">TECHCRUNCH</div>
          <div className="font-black text-2xl tracking-tighter text-slate-900">WIRED</div>
          <div className="font-black text-2xl tracking-tighter text-slate-900">VERGE</div>
        </div>
      </div>
    </section>
  );
}