import { useState, useEffect } from "react";
import CandidateForm from "../components/CandidateForm";
import CVpreviewer from "../components/CVpreviewer";
import standardSchema from "../types/standardForm";
import { Edit3, Eye } from "lucide-react";

export default function CandidateView({
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
  schema = standardSchema;

  // Logic for mobile switching
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
  document.title = title;
}, []);

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex justify-center items-center font-sans relative">
      {/* PC Container: Limits width and centers cards */}
      <div className="w-full max-w-400 flex flex-col lg:flex-row gap-6 px-4 py-4 lg:px-8 lg:py-8 h-full">
        
        {/* MOBILE BOTTOM NAVBAR */}
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex bg-slate-900/90 backdrop-blur-md text-white p-1.5 rounded-2xl shadow-2xl border border-slate-700">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "edit" ? "bg-blue-600 shadow-lg" : "text-slate-400"
            }`}
          >
            <Edit3 size={18} /> Edit
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === "preview" ? "bg-blue-600 shadow-lg" : "text-slate-400"
            }`}
          >
            <Eye size={18} /> Preview
          </button>
        </div>

        {/* LEFT: FORM - 45% width on PC */}
        <div className={`w-full lg:w-[45%] shrink-0 ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>
          <CandidateForm title={title} description={description} schema={schema} formId={formId} />
        </div>

        {/* RIGHT: PREVIEW - 55% width on PC */}
        <div className={`w-full lg:w-[55%] grow ${activeTab === "edit" ? "hidden lg:block" : "block"}`}>
          <CVpreviewer />
        </div>

      </div>
    </div>
  );
}