import { useParams } from "react-router-dom";
import { useState } from "react";
import { apiFetch } from "../../lib/api";
import FormView from "./FormView";
import { Lock, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

export default function FormShare() {
  const { uuid } = useParams<{ uuid: string }>();

  const [passkey, setPasskey] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!uuid) {
    return <div className="p-6 text-red-500 font-bold">Invalid link</div>;
  }

  const verifyPasskey = async () => {
    if (!passkey.trim()) {
      setError("Passkey required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await apiFetch(
        `/public/form/${uuid}/verify-passkey`,
        {
          method: "POST",
          body: JSON.stringify({ passkey }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        setError("Invalid passkey");
      } else {
        setVerified(true);
      }
    } catch {
      setError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      AFTER VERIFY → FORM VIEW
  ========================= */
  if (verified) {
    return <FormView formShare={false}/>;
  }

  /* =========================
      PASSKEY SCREEN
  ========================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">

      <div className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-blue-50 p-4 rounded-3xl text-blue-600">
            <Lock size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Enter Passkey</h1>
        <p className="text-slate-500 text-sm mb-8">Please enter the 8-character passkey to access this form.</p>

        <input
          type="text"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value.toUpperCase())}
          placeholder="8-CHARACTER PASSKEY"
          className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-4 rounded-2xl text-center text-xl font-mono tracking-[0.3em] outline-none focus:border-blue-500 focus:bg-white transition-all mb-4"
        />

        {error && (
          <div className="mb-4 flex items-center justify-center gap-2 text-red-600 bg-red-50 py-3 rounded-xl border border-red-100">
            <AlertCircle size={16} />
            <span className="text-xs font-bold uppercase">{error}</span>
          </div>
        )}

        <button
          onClick={verifyPasskey}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Access Form"}
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Secure Access</span>
        </div>
      </div>
    </div>
  );
}