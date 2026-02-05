import { Check, ArrowRight, Zap, ShieldCheck, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    subtitle: 'Up to 100 Candidates',
    description: 'Perfect for startups and early-stage teams.',
    features: [
      'Up to 100 candidate submissions',
      'AI CV analysis & scoring',
      'Job-based evaluation',
      'Ranked candidate list',
      'Admin dashboard',
      'Secure data storage',
    ],
    cta: 'Get Started',
    color: 'from-blue-400 to-blue-600',
    icon: Zap,
    popular: false,
  },
  {
    name: 'Growth',
    subtitle: 'Pay-As-You-Go',
    description: 'For growing companies and agencies.',
    features: [
      'Unlimited forms & candidates',
      'Everything in Standard',
      'Faster AI processing',
      'Advanced filtering',
      'Export results (CSV / PDF)',
      'Candidate comparison tools',
    ],
    cta: 'Scale Now',
    color: 'from-cyan-500 to-blue-600',
    icon: Crown,
    popular: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'Custom Solutions',
    description: 'Built for large-scale hiring needs.',
    features: [
      'Custom AI scoring models',
      'ATS & API Integration',
      'Private infrastructure',
      'Dedicated support',
      'Compliance & data control',
      'SLA guarantees',
    ],
    cta: 'Contact Sales',
    color: 'from-slate-800 to-slate-900',
    icon: ShieldCheck,
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32 bg-white overflow-hidden">
      {/* Liquid Background Decorations */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-cyan-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Pricing & Plans
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
            Simple, <span className="text-slate-400">Transparent.</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Scale your hiring without scaling your budget. Choose the tier that fits your volume.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-end">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={index}
                className={`relative group flex flex-col h-full bg-white/40 backdrop-blur-xl border border-slate-200/60 rounded-[3rem] p-10 transition-all duration-500 hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.08)] hover:-translate-y-2 ${
                  plan.popular ? 'lg:scale-105 bg-white shadow-2xl z-10 border-blue-100' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-10">
                  <div className={`w-14 h-14 bg-linear-to-br ${plan.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-blue-600 tracking-tight">{plan.subtitle}</span>
                  </div>
                </div>

                <p className="text-slate-500 font-medium leading-relaxed mb-8">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="flex-1 space-y-4 mb-10">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-50 rounded-full p-0.5">
                        <Check className="w-3.5 h-3.5 text-blue-600" strokeWidth={4} />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a href="#contact-form" >

                <button className={`w-full cursor-pointer group relative py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
                  plan.popular 
                  ? 'bg-slate-900 text-white hover:bg-blue-600' 
                  : 'bg-white border-2 border-slate-100 text-slate-900 hover:border-blue-200 hover:bg-slate-50'
                }`}>
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                </a>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Note */}
        <div className="mt-16 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                Custom billing available for high-volume recruitment agencies
            </p>
        </div>
      </div>
    </section>
  );
}