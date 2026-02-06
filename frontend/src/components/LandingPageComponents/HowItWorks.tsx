import React, { useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Share2, Upload, Brain, 
  BarChart3, CheckCircle, Database, User2, ListCheck
} from 'lucide-react';

// --- ANIMATED BEAM COMPONENT ---
interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  curvature?: number;
  duration?: number;
  delay?: number;
  color?: string;
  trackColor?: string;
  reverse?: boolean;
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 3,
  delay = 0,
  color = "#3b82f6",
  trackColor = "#c7c5c5",
  reverse = false,
}: AnimatedBeamProps) => {
  const [path, setPath] = useState("");
  const id = useId();

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const x1 = rectA.left - containerRect.left + rectA.width / 2;
        const y1 = rectA.top - containerRect.top + rectA.height / 2;
        const x2 = rectB.left - containerRect.left + rectB.width / 2;
        const y2 = rectB.top - containerRect.top + rectB.height / 2;

        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2 + curvature;
        setPath(`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`);
      }
    };

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();
    window.addEventListener('resize', updatePath);
    return () => {
        resizeObserver.disconnect();
        window.removeEventListener('resize', updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 100% 100%">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop stopColor={color} stopOpacity="0" />
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path 
        d={path} 
        stroke={trackColor} 
        strokeWidth="2" 
        fill="none" 
        strokeOpacity="0.1" 
      />
      <motion.path
        d={path}
        stroke={`url(#${id})`}
        strokeWidth="3"
        fill="none"
        initial={{ pathLength: 0.15, pathOffset: reverse ? 1 : -0.15 }}
        animate={{ pathOffset: reverse ? [-0.15, 1] : [1, -0.15] }}
        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
};

const steps = [
  { icon: FileText, title: 'Create a hiring form', description: 'Define your job requirements and evaluation criteria.', color: 'from-blue-400 to-blue-600' },
  { icon: Share2, title: 'Share the link', description: 'Send a simple link to candidates - no login required.', color: 'from-cyan-400 to-cyan-600' },
  { icon: Upload, title: 'candidate fills the form', description: 'Easy submission process for all applicants.', color: 'from-teal-400 to-teal-600' },
  { icon: Brain, title: 'AI Evaluation', description: 'Our engine scores and ranks every candidate accurately.', color: 'from-indigo-400 to-indigo-600' },
  { icon: BarChart3, title: 'Live Dashboard', description: 'Access a real-time leaderboard of best-fit talent.', color: 'from-violet-400 to-violet-600' },
  { icon: CheckCircle, title: 'Hire the Best', description: 'Interview the top 1% without manual screening.', color: 'from-emerald-400 to-emerald-600' },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const refTop = useRef<HTMLDivElement>(null);  
  const refBottom = useRef<HTMLDivElement>(null);
  const refL1 = useRef<HTMLDivElement>(null); 
  const refL2 = useRef<HTMLDivElement>(null); 
  const refL3 = useRef<HTMLDivElement>(null);
  const refR2 = useRef<HTMLDivElement>(null); 
  const refCentral = useRef<HTMLDivElement>(null);

  return (
    <section id="process" className="py-12 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Engine Workflow</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Intelligent <span className="text-slate-400">Shortlisting.</span>
          </h2>
        </div>

        {/* COMPACT BEAM VISUALIZATION - Hidden on very small screens, scaled on tablets */}
        <div className="hidden sm:block overflow-x-hidden mb-20 md:mb-20">
            <div ref={containerRef} className="relative flex items-center justify-between w-full max-w-4xl mx-auto h-100 md:h-125 px-4 md:px-8">
                
                {/* Top Node */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                    <div ref={refTop} className="h-12 md:h-16 min-w-16 px-4 bg-white rounded-xl shadow-md flex items-center justify-center border border-slate-100 transition-all hover:border-red-200">
                        <div className='flex flex-row items-center gap-2'>
                            <User2 className="size-5 md:size-8 text-red-500 shrink-0" />
                            <div className="flex flex-col items-start leading-none">
                                <p className='text-[8px] md:text-[10px] font-bold uppercase text-slate-400'>Client</p>
                                <p className='text-xs font-black text-slate-900'>Enterprise</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Left Inputs (Candidates) */}
                <div className="flex flex-col justify-between h-[60%] md:h-full py-8 z-20">
                    {[refL1, refL2, refL3].map((ref, i) => (
                        <div key={i} ref={ref} className="h-10 md:h-12 min-w-24 md:min-w-32 px-3 bg-white rounded-xl shadow-md flex items-center border border-slate-100 transition-all hover:border-cyan-400">
                            <div className="flex flex-row items-center gap-2">
                                <User2 className="size-4 md:size-5 text-cyan-500 shrink-0" />
                                <p className="text-[9px] md:text-[10px] font-black text-slate-500 whitespace-nowrap">Candidate #{i + 1}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Center Brain */}
                <div className="z-20">
                    <div ref={refCentral} className="size-20 md:size-24 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center border-2 border-blue-500/10 relative transition-all hover:border-blue-200">
                        <div className="absolute inset-0 bg-blue-400/5 blur-2xl rounded-full animate-pulse" />
                        <Brain className="size-8 md:size-10 text-blue-600 relative z-10" />
                        <p className="text-[8px] md:text-[10px] font-black text-blue-600 mt-1 relative z-10">AI CORE</p>
                    </div>
                </div>

                {/* Right Outputs */}
                <div className="flex flex-col justify-center h-full py-8 z-20">
                    <div ref={refR2} className="h-10 md:h-12 min-w-24 md:min-w-32 px-3 bg-white rounded-xl shadow-md flex items-center border border-slate-100  transition-all hover:border-green-300">
                        <div className="flex flex-row items-center gap-2">
                            <ListCheck className="size-4 md:size-5 text-green-500 shrink-0" />
                            <p className="text-[9px] md:text-[10px] font-black text-slate-500">Requirements</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Node */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20">
                    <div ref={refBottom} className="h-12 md:h-14 min-w-28 md:min-w-32 px-4 bg-white rounded-xl shadow-md flex items-center justify-center border border-slate-100  transition-all hover:border-purple-300">
                        <div className='flex flex-row items-center gap-2 md:gap-3'>
                            <Database className="size-5 md:size-6 text-purple-500 shrink-0" />
                            <p className='text-[10px] md:text-xs font-black text-slate-900'>Candidate Pool</p>
                        </div>
                    </div>
                </div>

                {/* Beams */}
                <AnimatedBeam containerRef={containerRef} fromRef={refTop} toRef={refCentral} curvature={0} color="#820707" duration={2} />
                <AnimatedBeam containerRef={containerRef} fromRef={refCentral} toRef={refL1} curvature={-40} color="#06b6d4" duration={3.2} />
                <AnimatedBeam containerRef={containerRef} fromRef={refCentral} toRef={refL2} curvature={0} color="#06b6d4" duration={2.8} />
                <AnimatedBeam containerRef={containerRef} fromRef={refCentral} toRef={refL3} curvature={40} color="#06b6d4" duration={3.5} />
                <AnimatedBeam containerRef={containerRef} fromRef={refCentral} toRef={refR2} curvature={0} color="#078220" duration={2.5} />
                <AnimatedBeam containerRef={containerRef} fromRef={refCentral} toRef={refBottom} curvature={0} color="#4C0246" duration={2.5} />
            </div>
        </div>

        {/* STEP-BY-STEP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-slate-100">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative p-6 md:p-10 bg-white transition-all duration-500 hover:bg-slate-50 border-r border-b border-slate-100">
                <div className="relative z-10">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white mb-6 md:mb-8 shadow-lg`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-black text-blue-600 opacity-40 uppercase">Step 0{index + 1}</span>
                    <h3 className="text-base md:text-lg font-black text-slate-900 uppercase tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">{step.description}</p>
                </div>
                {/* Desktop hover effect */}
                <div className="hidden md:block absolute bottom-0 left-0 h-0.5 w-0 bg-blue-600 transition-all duration-700 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}