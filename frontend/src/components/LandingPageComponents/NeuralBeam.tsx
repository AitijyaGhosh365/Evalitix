import { motion } from 'framer-motion';
import { User, Cpu, Database } from 'lucide-react';

const NeuralBeam = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 flex items-center justify-between px-12 mb-20">
      {/* Central AI Hub */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative group">
          <div className="absolute -inset-8 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center shadow-2xl border border-blue-400/30">
            <Cpu className="w-10 h-10 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Source: Candidates */}
      <div className="flex flex-col items-center gap-4 z-10">
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
          <User className="w-6 h-6 text-slate-400" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Applications</span>
      </div>

      {/* Destination: Your Dashboard */}
      <div className="flex flex-col items-center gap-4 z-10">
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg">
          <Database className="w-6 h-6 text-slate-400" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Shortlist</span>
      </div>

      {/* Animated SVG Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        {/* Connection Line 1 */}
        <path d="M 120 128 L 448 128" stroke="url(#gradient1)" strokeWidth="2" fill="none" className="opacity-20" />
        
        {/* Animated Pulse 1 */}
        <motion.path
          d="M 120 128 L 448 128"
          stroke="url(#gradient1)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="20, 100"
          initial={{ strokeDashoffset: 120 }}
          animate={{ strokeDashoffset: -120 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};