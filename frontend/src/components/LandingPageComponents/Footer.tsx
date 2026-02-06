import { Mail, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-white pt-24 pb-12 overflow-hidden">
      {/* Subtle Divider Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          {/* BRAND SECTION */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
                            <div className="w-1- h-10 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
  <img
    src="favicon.png"
    alt="Evalitix Logo"
    className="w-full h-full object-contain rounded-xl"
  />
</div>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">
                Evalitix
              </span>
            </div>
            
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm mb-8">
              Redefining recruitment with neural evaluation. We help modern teams shortlist 10x faster without the manual grind.
            </p>

            <div className="flex gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* LINKS SECTION 1 */}
          <div className="md:col-span-2 md:col-start-7">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Product</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Demo', 'Documentation'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LINKS SECTION 2 */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Company</h3>
            <ul className="space-y-4">
              {['About', 'Blog', 'Careers', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT SECTION */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6">Support</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <Mail size={16} className="text-blue-500" />
                <span>suport@evalitix.ig</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                <MapPin size={16} className="text-blue-500" />
                <span>Kolkata, WB</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              System Status: All systems operational
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              © 2026 Evalitix. Made for the future of work.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}