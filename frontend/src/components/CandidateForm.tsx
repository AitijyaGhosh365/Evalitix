import { useEffect, useRef, useState } from "react";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useDispatch } from "react-redux";
import { setFormData } from "../store/candidateFormSlice";
import standardSchema from "../types/standardForm";
import { apiFetch } from "../lib/api";
import { Mail, ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";

const STORAGE_KEY = "candidate_standard_form_draft";

export default function CandidateForm({
  title,
  description,
  schema,
  formId,
}: {
  title: string;
  description: string;
  schema: any;
  formId: string;
}) {
  const dispatch = useDispatch();

  const SEND_OTP_URL = `${import.meta.env.VITE_API_BASE_URL}/public/form/${formId}/send-otp`;
  const SUBMIT_FORM_URL = `${import.meta.env.VITE_API_BASE_URL}/public/form/${formId}/verify-otp-and-submit`;

  /* =====================
      STATE (Unchanged)
  ====================== */
  const [formData, setFormDataState] = useState<any>({});
  const [step, setStep] = useState<"form" | "otp" | "success">("form");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasErrors, setHasErrors] = useState(false);
  const isHydrated = useRef(false);

  /* =====================
      LOGIC (Unchanged)
  ====================== */
  useEffect(() => {
    if (schema === standardSchema) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormDataState(parsed);
        dispatch(setFormData(parsed));
      }
      isHydrated.current = true;
    }
  }, [schema, dispatch]);

  const handleChange = ({ formData }: any) => {
    setFormDataState(formData);
    dispatch(setFormData(formData));
    if (!isHydrated.current) return;
    if (schema?.title === "Candidate Application") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  };

  const handleSubmit = async ({ formData }: any) => {
    const email = formData?.email;
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(SEND_OTP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setStep("otp");
    } catch (e: any) {
      setError(e.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtpAndSubmit = async () => {
    if (!otp) {
      setError("OTP is required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const otpRes = await fetch(SUBMIT_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, formData }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok) throw new Error(otpData.error || "Invalid OTP");

      const res = await apiFetch(`/form/${formId}/submit`, {
        method: "POST",
        body: JSON.stringify({ candidateResponse: formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Submission failed");

      // localStorage.removeItem(STORAGE_KEY);
      setStep("success");
    } catch (e: any) {
      setError(e.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const goBackToForm = () => {
    setStep("form");
    setOtp("");
    setError("");
    setLoading(false);
  };

  /* =====================
      UI COMPONENTS
  ====================== */
  function LoadingSubmitButton({ loading }: { loading: boolean }) {
    return (
      <button
        type="submit"
        disabled={loading}
        className={`w-full mt-6 py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg 
          ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"}`}
      >
        {loading ? "Processing..." : "Submit Application"}
      </button>
    );
  }

  return (
    <div className={`w-full h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto bg-white px-6 py-8 lg:px-8 lg:py-10 rounded-3xl lg:rounded-4xl shadow-xl border scrollbar-hide relative transition-all ${hasErrors ? "border-red-200 shadow-red-50" : "border-slate-100 shadow-slate-200/50"}`}>
      {/* HEADER SECTION */}
      {step !== "success" && (
        <div className="mb-8">
          <h2 className="text-2xl font-black text-blue-500 uppercase tracking-tight">{title}</h2>
          <p className="text-slate-500 text-sm mt-1">{description}</p>
        </div>
      )}

      {/* FORM STEP */}
      {step === "form" && (
        <>
          <Form
            schema={schema}
            validator={validator}
            formData={formData}
            onChange={(e) => {
              handleChange(e);
              if (hasErrors) setHasErrors(false);
            }}
            onSubmit={handleSubmit}
            onError={() => setHasErrors(true)}
            templates={{
              ButtonTemplates: {
                SubmitButton: () => <LoadingSubmitButton loading={loading} />,
              },
            }}
          />
          {hasErrors && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              <AlertCircle size={16} />
              <p className="text-xs font-semibold text-red-700">Please complete all required fields.</p>
            </div>
          )}
        </>
      )}

      {/* OTP STEP */}
      {step === "otp" && (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="bg-blue-50 p-4 rounded-3xl text-blue-600 mb-2">
            <Mail size={40} />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Email Verification</h2>
            <p className="text-slate-500 text-sm mt-2 px-4">
              We sent a 6-digit code to <br />
              <span className="text-blue-600 font-bold">{formData.email}</span>
            </p>
          </div>

          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="000 000"
            className="w-full max-w-60 text-center text-4xl font-mono tracking-[0.2em] border-b-4 border-blue-100 py-3 outline-none focus:border-blue-600 transition-colors"
          />

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <button
              onClick={verifyOtpAndSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Confirm & Submit"}
            </button>
            <button
              type="button"
              onClick={goBackToForm}
              className="flex items-center justify-center gap-2 text-slate-400 font-bold py-2 hover:text-slate-600 transition-colors"
            >
              <ChevronLeft size={18} /> Edit Details
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS STEP */}
      {step === "success" && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="bg-green-100 text-green-600 p-6 rounded-full">
            <CheckCircle2 size={60} />
          </div>
          <h2 className="text-3xl font-black text-slate-800">Submitted!</h2>
          <p className="text-slate-500 max-w-60">
            Your application was successfully processed and sent.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}
    </div>
  );
}