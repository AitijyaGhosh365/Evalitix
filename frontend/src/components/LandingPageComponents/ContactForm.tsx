import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  // 1. ADDED 'message' TO STATE
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes (Updated to handle both input and textarea)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact-form`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setSuccess(true);
      // 2. CLEAR MESSAGE FIELD ON SUCCESS
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while sending your message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact-form" className="relative py-32 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA5MDkxYiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] [mask:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-100/40 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-100/40 rounded-full blur-[100px] -z-10" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
            Let's Connect
          </span>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter mb-6">
            Get Started Today
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Ready to transform your hiring workflow? <br /> 
            Leave your details and we'll reach out shortly.
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="relative bg-white/70 backdrop-blur-2xl border border-white border-b-slate-200 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.05)] rounded-[3rem] p-8 md:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-700"
        >
          <div className="space-y-6">
            {/* NAME INPUT */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-200 transition-all duration-300"
              />
            </div>

            {/* EMAIL INPUT */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Business Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@company.com"
                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-200 transition-all duration-300"
              />
            </div>

            {/* 3. MESSAGE TEXTAREA FIELD */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="How can we help you?"
                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-6 py-4 text-slate-900 font-bold placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-200 transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* FEEDBACK STATES */}
          {error && (
            <div className="flex items-center gap-3 bg-rose-50 border border-rose-100 rounded-2xl p-4 text-rose-600 animate-in slide-in-from-top-2">
              <AlertCircle size={18} className="shrink-0" />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-600 animate-in slide-in-from-top-2">
              <CheckCircle size={18} className="shrink-0" />
              <p className="text-xs font-bold">Thank you! Our team will be in touch soon.</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button type="submit" disabled={isLoading} className="w-full relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative bg-slate-900 hover:bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed">
               {isLoading ? (
                 <span className="flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Processing...
                 </span>
               ) : (
                 <>
                   Send Message 
                   <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </>
               )}
            </div>
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-4">
           <div className="flex items-center justify-center gap-4 opacity-40">
              <div className="h-px w-12 bg-slate-300" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                100% Privacy Guaranteed
              </p>
              <div className="h-px w-12 bg-slate-300" />
           </div>
           <p className="text-xs text-slate-400 text-center px-8">
             By clicking send, you agree to our terms of service and privacy policy. 
             No spam, ever.
           </p>
        </div>
      </div>
    </section>
  );
}