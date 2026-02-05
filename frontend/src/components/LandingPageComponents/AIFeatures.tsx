import { Sparkles, Award, Briefcase, GraduationCap, Target, FileCheck, Brain } from 'lucide-react';

const features = [
  { icon: Award, label: 'Skills', color: 'text-amber-500', bg: 'bg-amber-50' },
  { icon: Briefcase, label: 'Experience', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: FileCheck, label: 'Projects', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: GraduationCap, label: 'Education', color: 'text-purple-500', bg: 'bg-purple-50' },
  { icon: Target, label: 'Role fit', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Sparkles, label: 'Job-specific', color: 'text-cyan-500', bg: 'bg-cyan-50' },
];

export default function AIFeatures() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-125 h-125 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mb-8">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Neural Intelligence</span>
            </div>

            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8">
              AI Evaluation <br /> <span className="text-blue-600">Reimagined.</span>
            </h2>

            <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
              JobThingIG doesn't just scan keywords — it understands professional context, intent, and potential.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="group flex flex-col gap-3 p-4 rounded-3xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all">
                    <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{feature.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DASHBOARD PREVIEW CARD */}
          <div className="relative">
            <div className="absolute -inset-4 bg-linear-to-tr from-blue-100 to-cyan-100 rounded-[3rem] blur-2xl opacity-30 -z-10 animate-pulse" />
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] backdrop-blur-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h4 className="font-black text-slate-900 text-lg uppercase tracking-tighter">Live Analysis</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Search: Senior Dev</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', score: 95, color: 'from-emerald-400 to-emerald-600' },
                  { name: 'Marcus Rodriguez', score: 88, color: 'from-blue-400 to-blue-600' },
                  { name: 'Emily Johnson', score: 82, color: 'from-blue-500 to-indigo-600' },
                ].map((candidate, index) => (
                  <div key={index} className="group bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-transparent hover:border-slate-100 rounded-3xl p-5 transition-all duration-500">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-black text-slate-800 uppercase tracking-tighter">{candidate.name}</span>
                      <span className="text-lg font-black text-blue-600 tracking-tighter">{candidate.score}%</span>
                    </div>
                    <div className="w-full bg-slate-200/50 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-linear-to-r ${candidate.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}