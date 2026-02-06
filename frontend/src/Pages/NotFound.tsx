import { Link } from "react-router-dom";
import { FileQuestion, ChevronLeft } from "lucide-react";
import { useEffect } from "react";

export default function NotFound() {

  useEffect(() => {
  document.title = "404 Not Found";
}, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9] font-sans px-6">
      <div className="text-center bg-white p-10 lg:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 w-full max-w-md relative overflow-hidden">
        
        {/* Decorative Background Icon */}
        <div className="absolute -top-6 -right-6 text-slate-50 opacity-50">
           <FileQuestion size={160} />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 text-blue-600 rounded-4xl mb-6">
            <FileQuestion size={40} />
          </div>

          <h1 className="text-6xl font-black text-slate-800 tracking-tighter mb-2">
            404
          </h1>

          <p className="text-xl font-bold text-slate-700 mb-2">
            Page not found
          </p>

          <p className="text-sm text-slate-500 mb-10 leading-relaxed max-w-60 mx-auto font-medium">
            The page you’re looking for doesn’t exist or has been moved to a new home.
          </p>

          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-widest text-xs"
          >
            <ChevronLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}