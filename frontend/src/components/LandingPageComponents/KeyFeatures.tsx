import { Search, BarChart3, Sliders, FolderLock, Share, Zap, Plus } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'AI Resume Screening',
    description: 'Automatically analyze CVs and match them to your job description with neural precision.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: BarChart3,
    title: 'Smart Ranking',
    description: 'Candidates are instantly sorted by objective fit scores—eliminating manual guesswork.',
  },
  {
    icon: Sliders,
    title: 'Custom Evaluation',
    description: 'Define your own pillars: technical stack, cultural values, or specific industry experience.',
  },
  {
    icon: FolderLock,
    title: 'Secure CV Vault',
    description: 'Enterprise-grade encryption for all candidate data, accessible from a single unified source.',
  },
  {
    icon: Share,
    title: 'Frictionless Sharing',
    description: 'Candidates apply via a direct link. No accounts, no passwords, just pure conversion.',
  },
  {
    icon: Zap,
    title: 'Real-time Pipeline',
    description: 'Watch your leaderboard update instantly the moment a candidate hits submit.',
  },
];

export default function KeyFeatures() {
  return (
    <section id="features" className="py-32 bg-white relative">
      {/* Background organic blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full blur-[120px] opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
              Core Capabilities
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              Everything you need to <br /> 
              <span className="text-slate-400">hire 10x faster.</span>
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-xs leading-relaxed">
            A comprehensive suite of AI tools designed to strip away the administrative burden of recruiting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative p-10 transition-all duration-500 hover:bg-slate-50/50 border border-slate-100 -ml-px -mt-px"
              >
                {/* Subtle Hover Reveal Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-90">
                  <Plus className="w-4 h-4 text-blue-400" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600 shadow-xl shadow-slate-200">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-slate-500 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Border Beam */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        {/* <div className="mt-20 p-8 rounded-[3rem] bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 bg-slate-800" />
                    ))}
                </div>
                <p className="text-white font-bold tracking-tight">
                    Join 2,000+ recruiters worldwide
                </p>
            </div>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-colors">
                Explore All Features
            </button>
        </div> */}
      </div>
    </section>
  );
}