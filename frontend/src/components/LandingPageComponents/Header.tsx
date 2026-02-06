import { Menu, X, LayoutDashboard, UserPlus } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto">
        <div className="backdrop-blur-xl bg-white/40 border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] px-6 py-3 transition-all hover:bg-white/50">

          {/* DESKTOP LAYOUT (Hidden on mobile) */}
          <div className="hidden md:grid grid-cols-3 items-center w-full">

            {/* LEFT: LOGO */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group cursor-pointer justify-self-start"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <img
                  src="favicon.png"
                  alt="Evalitix Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <span className="text-xl font-black text-slate-800 tracking-tighter">Evalitix</span>
            </div>

            {/* CENTER: NAV LINKS */}
            <div className="flex items-center justify-center gap-8">
              <a href="#how-it-works" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-500 transition-colors whitespace-nowrap">How It Works</a>
              <a href="#features" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-500 transition-colors whitespace-nowrap">Features</a>
              <a href="#pricing" className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-500 transition-colors whitespace-nowrap">Pricing</a>
            </div>

            {/* RIGHT: ACTIONS */}
            <div className="flex items-center gap-3 justify-self-end">
              <a href="/dashboard" className="text-[11px] font-black uppercase tracking-widest text-slate-700 hover:text-blue-600 transition-colors">
                Dashboard
              </a>
              <a href="/login" className="px-4 py-2 border border-slate-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-white transition-all">
                Sign Up
              </a>
              <a href="#contact-form">
                <button className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-cyan-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200">
                  Book Demo
                </button>
              </a>
            </div>
          </div>

          {/* MOBILE LAYOUT (Hidden on desktop) */}
          <div className="flex md:hidden items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                <img
                  src="favicon.png"
                  alt="Evalitix Logo"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <span className="text-lg font-black text-slate-800">Evalitix</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-white/40 rounded-xl transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* MOBILE MENU DROPDOWN */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="h-px bg-slate-200/50 w-full mb-4" />

              <div className="grid grid-cols-1 gap-1 text-center">
                <a href="#how-it-works" onClick={closeMenu} className="block text-slate-600 hover:text-cyan-500 font-bold py-2 px-4 rounded-xl hover:bg-white/30 transition-all">How It Works</a>
                <a href="#features" onClick={closeMenu} className="block text-slate-600 hover:text-cyan-500 font-bold py-2 px-4 rounded-xl hover:bg-white/30 transition-all">Features</a>
                <a href="#pricing" onClick={closeMenu} className="block text-slate-600 hover:text-cyan-500 font-bold py-2 px-4 rounded-xl hover:bg-white/30 transition-all">Pricing</a>
              </div>

              <div className="h-px bg-slate-200/50 w-full my-4" />

              <div className="space-y-3 px-2">
                <a href="/dashboard" className="flex items-center gap-3 text-slate-800 font-bold py-2 px-2">
                  <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard
                </a>
                <a href="/login" className="flex items-center gap-3 text-slate-800 font-bold py-2 px-2">
                  <UserPlus className="w-4 h-4 text-cyan-500" /> Sign Up
                </a>
                <a href="#contact-form" onClick={closeMenu} className="block">
                  <button className="w-full bg-slate-900 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[11px] mt-2 shadow-lg shadow-slate-200">
                    Book Demo
                  </button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}