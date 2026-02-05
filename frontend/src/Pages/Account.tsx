import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { 
  User, 
  Mail, 
  Key, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Loader2,
  AlertCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";

type Account = {
  uid: string;
  email: string;
  name: string;
  createdAt?: string;
  formsCount: number;
};

export default function AccountPage() {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/user/account")
      .then(res => res.json())
      .then(data => {
        setAccount(data.account);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const resetPassword = async () => {
    if (!account) return;
    const ok = confirm("Send password reset email to " + account.email + "?");
    if (!ok) return;

    try {
      await sendPasswordResetEmail(auth, account.email);
      alert("Success! Check your inbox and spam folder for the reset link.");
    } catch (err: any) {
      alert(err.message || "Failed to send reset email");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-500">
        <AlertCircle size={48} className="text-red-400 mb-4" />
        <p className="text-lg font-bold">Failed to load account</p>
      </div>
    );
  }

  return (
        <>
        <Navbar />
    <div className="min-h-screen bg-[#F1F5F9] py-10 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 font-medium">Manage your profile and security preferences.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          
          {/* MAIN PROFILE CARD */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            <div className="p-8 lg:p-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-blue-100">
                  <span className="text-3xl font-black uppercase">
                    {account.name?.charAt(0) || "U"}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">{account.name}</h2>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mt-1">
                    <ShieldCheck size={14} />
                    Verified Account
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <AccountRow 
                  icon={<User size={18} />} 
                  label="Full Name" 
                  value={account.name} 
                />
                <AccountRow 
                  icon={<Mail size={18} />} 
                  label="Email Address" 
                  value={account.email} 
                />
                <AccountRow 
                  icon={<Key size={18} />} 
                  label="User ID" 
                  value={account.uid} 
                  isMono 
                />
                <AccountRow 
                  icon={<Calendar size={18} />} 
                  label="Joined On" 
                  value={account.createdAt ? new Date(account.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"} 
                />
              </div>
            </div>

            {/* QUICK STATS BAR */}
            <div className="bg-slate-50 border-t border-slate-100 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Forms Created</p>
                  <p className="text-xl font-black text-slate-800">{account.formsCount}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Plan</p>
                <p className="text-sm font-black text-blue-600 uppercase">Free Developer</p>
              </div>
            </div>
          </div>

          {/* SECURITY SECTION */}
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-50 text-red-500 rounded-2xl">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800">Security</h3>
                <p className="text-sm text-slate-500 font-medium">Update your password or account access.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={resetPassword}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                Reset Password via Email
              </button>
              <p className="text-xs text-slate-400 font-medium px-2">
                We'll send a secure link to {account.email}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>

    </>
  );
}

function AccountRow({ icon, label, value, isMono }: { icon: React.ReactNode; label: string; value: string; isMono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 group">
      <div className="flex items-center gap-4 text-slate-400 group-hover:text-blue-500 transition-colors">
        {icon}
        <span className="text-sm font-bold text-slate-500">{label}</span>
      </div>
      <span className={`text-sm font-black text-slate-800 ${isMono ? "font-mono text-xs bg-slate-50 px-2 py-1 rounded" : ""}`}>
        {value}
      </span>
    </div>
  );
}