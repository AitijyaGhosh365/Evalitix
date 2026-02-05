import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CandidateView from "../CandidateView";
import { Loader2, AlertCircle, Lock } from "lucide-react";

type FormResponse = {
  uuid: string;
  title: string;
  description: string;
  status: "active" | "inactive" | "expired";
  jsonSchema: any;
};

export default function FormFill() {
  const { uuid } = useParams<{ uuid: string }>();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uuid) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/public/form/${uuid}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          setError("Form not found");
        } else {
          setForm(data.form);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load form");
        setLoading(false);
      });
  }, [uuid]);

  /* =========================
      LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        <p className="mt-4 text-slate-500 font-medium">Fetching application form...</p>
      </div>
    );
  }

  /* =========================
      ERROR STATE
  ========================= */
  if (error || !form) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-200 text-center max-w-sm w-full">
          <div className="bg-red-50 w-16 h-16 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Access Error</h2>
          <p className="text-slate-500 mt-2">{error || "The form you are looking for does not exist."}</p>
        </div>
      </div>
    );
  }

  /* =========================
      INACTIVE / GATE BY STATUS
  ========================= */
  if (form.status !== "active") {
    return (
      <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-200 text-center max-w-sm w-full">
          <div className="bg-amber-50 w-16 h-16 rounded-3xl flex items-center justify-center text-amber-500 mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Form Unavailable</h2>
          <p className="text-slate-500 mt-2">
            This application is currently <span className="text-amber-600 font-bold uppercase text-xs">{form.status}</span>. 
            Please contact the recruiter for a valid link.
          </p>
        </div>
      </div>
    );
  }

  /* =========================
      ACTIVE → RENDER VIEW
  ========================= */
  return <CandidateView title={form.title} description={form.description} schema={form.jsonSchema} formId={form.uuid} />;
}