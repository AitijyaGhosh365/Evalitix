import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { User, Award, ExternalLink, Loader2, Inbox, X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

type Submission = {
  submissionId: string;
  candidateResponse: any;
  aiEvaluation: any;
  score?: number;

};



export default function FormView({ formShare }: { formShare: boolean }) {
  const { uuid } = useParams<{ uuid: string }>();

  // State Management
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cursors, setCursors] = useState<{ [page: number]: string | null }>({ 1: null });
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const itemsPerPage = 50;

  const [formMeta, setFormMeta] = useState<{ title?: string, passkey?: string } | null>(null);
  const [showShare, setShowShare] = useState(false);
  // const [copied, setCopied] = useState(false);
  // Fetch Logic

  useEffect(() => {
  document.title = "View Form";
}, []);


  const fetchSubmissions = (page: number) => {
    setLoading(true);

    const cursor = cursors[page] || null;
    const queryParams = new URLSearchParams({
      limit: String(itemsPerPage),
      ...(cursor && { cursor })
    });



    apiFetch(`/forms/${uuid}/submissions?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data.submissions);

        // Store the cursor for the next page
        if (data.nextCursor) {
          setCursors(prev => ({ ...prev, [page + 1]: data.nextCursor }));
          // If there's a next cursor, we know there's at least one more page
          setTotalPages(Math.max(totalPages, page + 1));
        } else {
          // No more pages after this one
          setTotalPages(page);
        }

        // Auto-select the first one on page load if none selected
        if (data.submissions?.length > 0) {
          setSelected(data.submissions[0]);
        }
      })
      .catch((err) => console.error("Error fetching submissions:", err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (uuid) fetchSubmissions(1);
  }, [uuid]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    fetchSubmissions(newPage);
  };

  const handleSelect = (sub: Submission) => {
    setSelected(sub);
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  useEffect(() => {
    if (uuid) {
      // Existing submission fetch
      fetchSubmissions(1);

      // NEW: Fetch form metadata for the passkey
      apiFetch(`/forms/${uuid}/meta`)
        .then(res => res.json())
        .then(data => setFormMeta(data.form))
        .catch(err => console.error("Meta fetch error:", err));
    }
  }, [uuid]);

  // const handleCopyLink = () => {
  //   const shareUrl = window.location.href.replace('/view', '/share'); // Swapping view for share as requested
  //   navigator.clipboard.writeText(`Link: ${shareUrl}\nPasskey: ${formMeta?.passkey}`);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };




  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (<>
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col lg:flex-row gap-6 p-4 lg:p-6 font-sans">

      {/* ================= LEFT: SUBMISSIONS LIST ================= */}
      <div className="w-full lg:w-1/3 bg-white rounded-3xl lg:rounded-4xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)]">
        <div className="p-5 lg:p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="p-5 lg:p-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex flex-col">
              <h2 className="text-xl font-black text-slate-800 tracking-tight">
                {formMeta?.title || "Submissions"}
              </h2>
              {formShare && <button
                onClick={() => setShowShare(!showShare)}
                className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1 flex items-center gap-1 hover:text-blue-800 transition-colors"
              >
                Share Access <ExternalLink size={10} />
              </button>}
            </div>

            {/* SHARE POPUP */}
            {showShare && (
              <div className="w-100 absolute top-18 left-5 right-5 z-30 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Share Results</span>
                  <button onClick={() => setShowShare(false)} className="text-slate-500 hover:text-white">
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="pb-6">
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Share Candidate Form</p>
                    <code className="bg-slate-800 px-3 py-2 rounded-lg block text-blue-400 font-mono text-[11px] border border-slate-700 break-all">
                      {window.location.href.replace('/view', '/fill')}
                    </code>
                  </div>

                  {/* 1. SHARE LINK */}
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Share View Link</p>
                    <code className="bg-slate-800 px-3 py-2 rounded-lg block text-blue-400 font-mono text-[11px] border border-slate-700 break-all">
                      {window.location.href.replace('/view', '/share')}
                    </code>
                  </div>

                  {/* 2. PASSKEY */}
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Passkey</p>
                    <code className="bg-slate-800 px-3 py-2 rounded-lg block text-emerald-400 font-mono text-sm border border-slate-700">
                      {formMeta?.passkey || "Loading..."}
                    </code>
                  </div>

                  {/* 3. BUTTON */}
                  {/* <button
        onClick={handleCopyLink}
        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
          copied ? "bg-emerald-500" : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {copied ? "Copied Everything!" : "Copy Link & Passkey"}
      </button> */}
                </div>
              </div>
            )}


          </div>
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
            Page {currentPage}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="animate-spin mb-2" />
              <p className="text-sm font-medium">Loading entries...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 text-center">
              <Inbox size={40} className="mb-4 opacity-20 mx-auto" />
              <p className="text-sm font-medium">No submissions yet</p>
            </div>
          ) : (
            <>
              {submissions.map((sub, index) => {
                // Calculate the global rank across pages
                const rank = (currentPage - 1) * itemsPerPage + index + 1;
                // console.log(sub.aiEvaluation.pros);
                // console.log(sub.aiEvaluation.cons);
                // console.log(sub.aiEvaluation.score_json);

                return (
                  <div
                    key={sub.submissionId}
                    onClick={() => handleSelect(sub)}
                    className={`flex items-center justify-between p-4 mb-3 rounded-2xl cursor-pointer transition-all border
        ${selected?.submissionId === sub.submissionId
                        ? "bg-blue-600 border-blue-600 shadow-lg shadow-blue-100"
                        : "bg-white border-slate-100 lg:hover:border-blue-200 lg:hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`relative p-2 rounded-xl ${selected?.submissionId === sub.submissionId ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                        <User size={18} />
                        {/* Small Rank Badge on the icon */}
                        <div className={`absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black border-2 
            ${selected?.submissionId === sub.submissionId
                            ? "bg-white text-blue-600 border-blue-600"
                            : "bg-slate-800 text-white border-white shadow-sm"}`}>
                          {rank}
                        </div>
                      </div>
                      <div className="flex flex-col text-left ml-1">
                        <span className={`text-sm font-bold transition-colors ${selected?.submissionId === sub.submissionId ? "text-white" : "text-slate-700"}`}>
                          {sub.candidateResponse?.fullName || "Unnamed"}
                        </span>
                        <span className={`text-[10px] uppercase font-bold tracking-widest ${selected?.submissionId === sub.submissionId ? "text-blue-100" : "text-slate-400"}`}>
                          Rank #{rank}
                        </span>
                      </div>
                    </div>
                    {sub.score !== undefined && (
                      <div
                        style={{
                          backgroundColor: `hsl(${sub.score * 1.2}, 80%, 45%)`
                        }}

                        className={`px-2 py-1 rounded-lg text-xs font-black text-white`}>
                        {sub.score}%
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* PAGINATION CONTROLS */}
        {!loading && submissions.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex items-center justify-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 transition-all"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                    disabled={page === '...'}
                    className={`min-w-9 h-9 px-3 rounded-xl font-bold text-sm transition-all
                      ${page === currentPage
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                        : page === '...'
                          ? "text-slate-400 cursor-default"
                          : "text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-200"
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-blue-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 transition-all"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= RIGHT: PREVIEW ================= */}
      <div
        className={`
          fixed inset-0 z-50 scrollbar-hide bg-white p-6 overflow-y-auto transition-transform duration-300 lg:relative lg:inset-auto lg:z-0 lg:flex-1 lg:h-[calc(100vh-3rem)] lg:rounded-4xl lg:shadow-xl lg:border lg:border-slate-100 lg:translate-x-0
          ${isMobileModalOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        `}
      >
        <button
          onClick={() => setIsMobileModalOpen(false)}
          className="lg:hidden fixed top-6 right-6 z-60 p-3 bg-slate-900 text-white rounded-2xl"
        >
          <X size={24} />
        </button>

        {!selected ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 mb-6">
              <User size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Select a Candidate</h3>
            <p className="text-slate-400 max-w-60 mt-2 font-medium">Pick an entry to review their professional profile.</p>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
            {/* CV HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between items-start mb-8 gap-4 pt-10 lg:pt-0">
              <div>
                <div className="flex flex-row gap-3 justify-center items-center">

                  <h1 className="text-4xl font-black text-blue-600 tracking-tighter uppercase mb-2 leading-none">
                    {selected.candidateResponse.fullName}
                  </h1>

                  <h1
                    className="text-xs font-black text-white tracking-tighter uppercase leading-none px-2 py-1 rounded-xl inline-block transition-colors duration-500"
                    style={{
                      backgroundColor: `hsl(${(selected.score ?? 0) * 1.2}, 80%, 45%)`
                    }}
                  >
                    {selected.score}%
                  </h1>

                </div>
                <div className="flex flex-col gap-1 text-slate-500 font-semibold text-[13px] tracking-wide">
                  <span>{selected.candidateResponse.email}</span>
                  {selected.candidateResponse.phone && <span>{selected.candidateResponse.phone}</span>}
                </div>
              </div>
              <div className="text-left md:text-right flex flex-col gap-2">
                {selected.candidateResponse.otherLinks?.map((link: any, i: number) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 font-black text-[10px] tracking-widest uppercase hover:underline">
                    {link.label} <ExternalLink size={10} />
                  </a>
                ))}
              </div>
            </div>

            <div className="h-0.5 bg-slate-100 w-full mb-4 rounded-full" />

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* STRENGTHS */}
              <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-3xl flex flex-col h-full relative group">
                <p className="flex items-center gap-2 mb-4 text-emerald-700 font-black text-xs uppercase tracking-widest shrink-0">
                  <CheckCircle2 size={16} /> Strengths
                </p>

                <div className="relative">
                  <ul className="space-y-2 text-[13px] text-slate-700 font-medium overflow-y-auto max-h-40 pr-2 scrollbar-hide">
                    {selected.aiEvaluation.pros?.map((p: string, i: number) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-emerald-500">•</span> {p}
                      </li>
                    ))}
                  </ul>

                  {/* Scroll Indicator Gradient & Arrow */}
                  {selected.aiEvaluation.pros?.length > 4 && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-emerald-50/80 to-transparent pointer-events-none" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-3 animate-bounce opacity-50 group-hover:opacity-100 transition-opacity">
                        <ChevronDown size={14} className="text-emerald-600" />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* GAPS */}
              <div className="bg-rose-50/50 border border-rose-100 p-5 rounded-3xl flex flex-col h-full relative group">
                <p className="flex items-center gap-2 mb-4 text-rose-700 font-black text-xs uppercase tracking-widest shrink-0">
                  <AlertCircle size={16} /> Gaps
                </p>

                <div className="relative">
                  <ul className="space-y-2 text-[13px] text-slate-700 font-medium overflow-y-auto max-h-40 pr-2 scrollbar-hide">
                    {selected.aiEvaluation.cons?.map((c: string, i: number) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-rose-400">•</span> {c}
                      </li>
                    ))}
                  </ul>

                  {/* Scroll Indicator Gradient & Arrow */}
                  {selected.aiEvaluation.cons?.length > 4 && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-rose-50/80 to-transparent pointer-events-none" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-3 animate-bounce transition-opacity duration-300 pointer-events-none">
                        <ChevronDown size={14} className="text-rose-600" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* SECTIONS */}
            {selected.candidateResponse.education?.length > 0 && (
              <Section title="Education">
                {selected.candidateResponse.education.map((e: any, i: number) => (
                  <Row key={i} left={
                    <div className="mb-4">
                      <div className="font-bold text-slate-900 text-[15px]">{e.institute}</div>
                      <div className="italic text-blue-600 font-semibold">{e.title}</div>
                    </div>
                  } right={<span className="font-bold text-slate-400 text-[10px] tracking-widest uppercase">{e.from} – {e.to || "Present"}</span>} />
                ))}
              </Section>
            )}

            {selected.candidateResponse.experience?.length > 0 && (
              <Section title="Professional Experience">
                {selected.candidateResponse.experience.map((e: any, i: number) => (
                  <div key={i} className="mb-6">
                    <Row left={
                      <div className="mb-1">
                        <span className="font-bold text-slate-900">{e.role}</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="font-semibold text-slate-500">{e.company}</span>
                      </div>
                    } right={<span className="font-bold text-slate-400 text-[10px] tracking-widest uppercase">{e.from} – {e.to || "Present"}</span>} />
                    {e.description && <p className="mt-2 text-slate-600 text-[13px] leading-relaxed pl-4 border-l-2 border-slate-100 italic">{e.description}</p>}
                  </div>
                ))}
              </Section>
            )}

            {selected.candidateResponse.projects?.length > 0 && (
              <Section title="Key Projects">
                {selected.candidateResponse.projects.map((p: any, i: number) => (
                  <div key={i} className="mb-6">
                    <Row left={
                      <div className="mb-1">
                        <span className="font-bold text-slate-900">{p.title}</span>
                      </div>
                    } right={<span className="font-bold text-slate-400 text-[10px] tracking-widest uppercase">{p.date}</span>} />
                    {p.description && <p className="mt-2 text-slate-600 text-[13px] leading-relaxed pl-4 border-l-2 border-slate-100 italic">{p.description}</p>}
                  </div>
                ))}
              </Section>
            )}

            {selected.candidateResponse.skillsAndInterests && (
              <Section title="Technical Expertise">
                <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                  <SkillRow label="Stack / Frameworks" value={selected.candidateResponse.skillsAndInterests.devFrameworks} />
                  <SkillRow label="Languages" value={selected.candidateResponse.skillsAndInterests.languages} />
                  <SkillRow label="Soft Skills" value={selected.candidateResponse.skillsAndInterests.softSkills} />
                </div>
              </Section>
            )}

            {selected.candidateResponse.achievements?.length > 0 && (
              <Section title="Honors & Awards">
                <ul className="space-y-3 pl-2">
                  {selected.candidateResponse.achievements.map((a: any, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-blue-50 p-1 rounded-md mt-1">
                        <Award size={14} className="text-blue-500" />
                      </div>
                      <span className="text-slate-700">
                        <span className="font-bold text-slate-900">{a.title}</span>
                        {a.year && <span className="text-slate-400 text-[11px] ml-2">[{a.year}]</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        )}
      </div>
    </div>
  </>
  );
}

/* ================= HELPERS (SAME FILE) ================= */

function Section({ title, children }: any) {
  return (
    <div className="mb-10">
      <h2 className="font-black uppercase text-[11px] text-blue-600 tracking-[0.2em] flex items-center gap-4 mb-4">
        {title}
        <div className="h-px bg-slate-100 flex-1" />
      </h2>
      <div className="px-1">{children}</div>
    </div>
  );
}

function Row({ left, right }: any) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:gap-4">
      <div className="w-full">{left}</div>
      <div className="mt-1 md:mt-0">{right}</div>
    </div>
  );
}

function SkillRow({ label, value }: any) {
  if (!value) return null;
  return (
    <div>
      <div className="font-bold text-slate-800 uppercase tracking-wide text-[9px] mb-1">{label}</div>
      <div className="text-slate-600 leading-snug text-sm">{value}</div>
    </div>
  );
}