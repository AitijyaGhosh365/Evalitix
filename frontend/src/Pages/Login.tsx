import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, Sparkles, X, Send, CheckCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Contact Modal States
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const token = await cred.user.getIdToken();
      localStorage.setItem("authToken", token);
      navigate("/dashboard");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4 font-sans relative overflow-hidden">
      
      {/* --- CONTACT MODAL OVERLAY --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white/90 backdrop-blur-2xl w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white p-8 relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => { setIsContactOpen(false); setContactSent(false); }}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            {!contactSent ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Get in Touch</h2>
                  <p className="text-slate-500 text-sm font-medium">We'll get back to you within 24 hours.</p>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1">Business Email</label>
                    <input required type="email" placeholder="john@company.com" className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-1">Drop a Message</label>
                    <textarea required rows={3} placeholder="Tell us about your needs..." className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold resize-none" />
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white font-black uppercase tracking-widest text-[11px] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-blue-100">
                    Send Message <Send size={14} />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-black text-slate-800">Sent Successfully!</h2>
                <p className="text-slate-500 font-medium px-4">Our team has received your message. Keep an eye on your inbox!</p>
                <button onClick={() => setIsContactOpen(false)} className="text-blue-600 font-bold hover:underline pt-4">Return to Login</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- EXISTING LOGIN CARD --- */}
      <div className="flex bg-white rounded-4xl shadow-2xl overflow-hidden max-w-5xl w-full h-150 relative z-10">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-4 h-4 bg-blue-500 rounded-full inline-block"></span>
              Log In
            </h1>
            <p className="text-gray-400 mt-2">Welcome back! Please enter your details.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full border-gray-200 border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-gray-200 border px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            <div className="text-right">
              <button className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                Forgot password?
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg cursor-pointer transition shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              {/* --- UPDATED BUTTON TRIGGER --- */}
              <button 
                onClick={() => setIsContactOpen(true)}
                className="text-blue-600 font-bold cursor-pointer hover:underline"
              >
                Contact us!
              </button>
            </p>
          </div>
        </div>

        {/* Right Side: Decorative AI Dashboard Visual (Same as before) */}
{/* Right Side: Decorative AI Dashboard Visual */}
<div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden group">
  
  {/* 1. Animated Background Mesh */}
  <div className="absolute top-0 -right-20 w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] animate-pulse mix-blend-screen"></div>
  <div className="absolute bottom-0 -left-20 w-125 h-125 bg-cyan-500/10 rounded-full blur-[120px] animate-bounce duration-[10s] opacity-50"></div>

  {/* 2. The "Floating" UI Elements */}
  <div className="relative w-full z-10 space-y-6">
    
    {/* Card 1: Main Stats - Drifts Up/Down */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform transition-all duration-700 hover:scale-105 animate-[float_6s_ease-in-out_infinite]">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40 relative overflow-hidden">
          <Sparkles className="text-white w-6 h-6" />
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        </div>
        <div>
          <p className="text-blue-300 text-[10px] font-black uppercase tracking-widest">AI Matching Engine</p>
          <h3 className="text-white font-bold text-lg tracking-tight">Top Candidates Found</h3>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500 w-[85%] animate-[loading_3s_ease-in-out_infinite] bg-size-[200%_100%]"></div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-slate-400 text-[10px] font-medium uppercase tracking-tight">85% Match Rate • Senior Engineer</p>
          <span className="text-cyan-400 text-[10px] font-black">LIVE</span>
        </div>
      </div>
    </div>

    {/* Card 2: Floating Candidate Info - Drifts Side-to-Side */}
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl w-3/4 ml-auto transform transition-all duration-700 hover:translate-x-2.5 animate-[float_8s_ease-in-out_infinite_1s]">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-slate-700 to-slate-800 border border-slate-500/50 flex items-center justify-center text-white text-[10px] font-bold overflow-hidden">
            JD
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-900 animate-pulse"></div>
        </div>
        <div>
          <p className="text-white text-sm font-bold tracking-tight">Jane Doe</p>
          <p className="text-slate-500 text-[10px] font-medium">Verified Fullstack Dev</p>
        </div>
        <div className="ml-auto bg-emerald-500/20 text-emerald-400 text-[10px] px-3 py-1 rounded-full font-black">92%</div>
      </div>
    </div>

    {/* Card 3: System Message - Tilts on Hover */}
    <div className="bg-linear-to-br from-blue-600 via-blue-700 to-cyan-600 p-6 rounded-[2rem] shadow-2xl w-4/5 transform -rotate-2 hover:rotate-0 transition-all duration-500 animate-[float_7s_ease-in-out_infinite_0.5s]">
      <div className="flex items-start justify-between">
        <h4 className="text-white font-black text-xl leading-[1.1] tracking-tighter">
          Automation is <br /> Ready to Scale.
        </h4>
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md">
          <Send className="text-white w-4 h-4" />
        </div>
      </div>
      <p className="text-blue-100/70 text-[11px] mt-4 font-medium leading-relaxed">
        Your AI agent processed <span className="text-white font-bold">142 resumes</span> in the last 10 minutes for the <span className="text-white font-bold">Product Designer</span> role.
      </p>
    </div>

  </div>

  {/* Branding Tag */}
  <div className="absolute bottom-8 left-12 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
      <Sparkles className="w-4 h-4 text-blue-400" />
    </div>
    <span className="text-white font-black tracking-tighter text-lg opacity-80 uppercase italic">JobThingIG</span>
  </div>
</div>
      </div>
    </div>
  );
}