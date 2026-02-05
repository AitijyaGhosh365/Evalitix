import { Clock, TrendingUp, DollarSign, Scale, ArrowUpRight } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Screen hundreds of resumes in minutes instead of days.',
    delay: '0',
  },
  {
    icon: TrendingUp,
    title: 'Hire Better',
    description: 'Make data-driven decisions instead of gut feeling.',
    delay: '100',
  },
  {
    icon: DollarSign,
    title: 'Reduce Cost',
    description: 'No need for large recruiting teams to do manual filtering.',
    delay: '200',
  },
  {
    icon: Scale,
    title: 'Fair & Unbiased',
    description: 'Every candidate is evaluated using the same criteria.',
    delay: '300',
  },
];

const stats = [
  { metric: '10×', label: 'faster shortlisting' },
  { metric: '70%', label: 'cost reduction' },
  { metric: 'Better', label: 'quality of hires' },
  { metric: 'Zero', label: 'missed candidates' },
];

export default function WhySection() {
  return (
    <section id="why" className="relative py-32 bg-white overflow-hidden">
      {/* Background organic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-24">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
            The ROI of AI
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">
            Why <span className="text-slate-400">JobThingIG?</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            We don't just automate tasks; we elevate your entire talent acquisition strategy.
          </p>
        </div>

        {/* BENEFIT GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group relative text-center"
              >
                <div className="relative w-24 h-24 mx-auto mb-8">
                  {/* Liquid Circle Decoration */}
                  <div className="absolute inset-0 bg-blue-100/50 rounded-full blur-2xl scale-0 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="relative w-24 h-24 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-slate-900 shadow-xl shadow-slate-200/50 transition-all duration-500 group-hover:-translate-y-3 group-hover:bg-slate-900 group-hover:text-white group-hover:shadow-blue-200">
                    <Icon className="w-10 h-10 transition-transform duration-500 group-hover:rotate-6" />
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-4 uppercase">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed px-4">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* FROSTED IMPACT PANE */}
        <div className="relative group p-1 lg:p-2 rounded-[4rem] bg-linear-to-b from-slate-200/50 to-transparent">
          <div className="relative bg-slate-900 rounded-[3.5rem] p-12 md:p-20 overflow-hidden shadow-2xl">
            {/* Animated Mesh background inside the pane */}
            <div className="absolute top-0 right-0 w-100 h-100 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-100 h-100 bg-cyan-600/10 rounded-full blur-[100px] -z-10" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/3 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                  <ArrowUpRight className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Proven Data</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-none">
                  Real-World <br /> Impact.
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed">
                  Companies using our neural engine see dramatic improvements in every hiring KPI.
                </p>
              </div>

              {/* STAT CARDS */}
              <div className="lg:w-2/3 grid sm:grid-cols-2 gap-4 w-full">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                  >
                    <div className="text-5xl font-black bg-linear-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text mb-2 tracking-tighter">
                      {stat.metric}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                      {stat.label}
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