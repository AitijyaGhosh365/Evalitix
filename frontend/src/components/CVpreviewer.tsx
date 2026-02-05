import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function CVpreviewer() {
  const data = useSelector((state: RootState) => state.candidateForm.data);

  return (
<div className="w-full h-[calc(100vh-2rem)] lg:h-[calc(100vh-4rem)] overflow-y-auto bg-white px-6 py-8 lg:px-12 lg:py-12 rounded-3xl lg:rounded-4xl shadow-2xl border border-slate-200/50 scrollbar-hide text-[13px] leading-relaxed text-slate-800 font-serif">      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-black text-blue-600 tracking-tighter uppercase mb-2 font-sans">
            {data.fullName || "Your Full Name"}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-500 font-sans font-medium text-xs">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>• {data.phone}</span>}
          </div>
        </div>

        <div className="text-right flex flex-col gap-1">
          {data.otherLinks?.map((link: any, i: number) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 font-bold uppercase text-[10px] tracking-widest hover:underline font-sans"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <Divider />

      {/* EDUCATION */}
      {data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((e: any, i: number) => (
            <Row
              key={i}
              left={
                <div className="mb-2">
                  <div className="font-bold text-slate-900 text-sm">{e.institute}</div>
                  <div className="italic text-blue-600 font-semibold">{e.title}</div>
                </div>
              }
              right={<span className="font-bold text-slate-400 uppercase text-[10px] tracking-tighter">{e.from} – {e.to || "Present"}</span>}
            />
          ))}
        </Section>
      )}

      {/* EXPERIENCE */}
      {data.experience?.length > 0 && (
        <Section title="Professional Experience">
          {data.experience.map((e: any, i: number) => (
            <div key={i} className="mb-5">
              <Row
                left={
                  <div className="font-sans">
                    <span className="font-bold text-slate-900">{e.role}</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="font-semibold text-slate-500">{e.company}</span>
                  </div>
                }
                right={<span className="font-bold text-slate-400 uppercase text-[10px] tracking-tighter">{e.from} – {e.to || "Present"}</span>}
              />
              {e.description && (
                <p className="mt-1 text-slate-600 text-[12px] leading-relaxed pl-4 border-l-2 border-slate-100">{e.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* PROJECTS */}
      {data.projects?.length > 0 && (
        <Section title="Key Projects">
          {data.projects.map((p: any, i: number) => (
            <div key={i} className="mb-4">
              <Row
                left={<span className="font-bold text-slate-900">{p.title}</span>}
                right={<span className="font-bold text-slate-400 uppercase text-[10px] tracking-tighter">{p.date}</span>}
              />
              {p.description && (
                <p className="mt-1 text-slate-600 text-[12px] pl-4 border-l-2 border-slate-100">{p.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* SKILLS */}
      {data.skillsAndInterests && (
        <Section title="Technical Skills">
          <div className="bg-slate-50 p-4 rounded-2xl space-y-1">
            <SkillRow label="Languages" value={data.skillsAndInterests.languages} />
            <SkillRow label="Frameworks" value={data.skillsAndInterests.devFrameworks} />
            <SkillRow label="Soft Skills" value={data.skillsAndInterests.softSkills} />
            <SkillRow label="Interests" value={data.skillsAndInterests.areasOfInterest} />
          </div>
        </Section>
      )}

      {/* ACHIEVEMENTS */}
      {data.achievements?.length > 0 && (
        <Section title="Awards & Achievements">
          <ul className="grid grid-cols-1 gap-2 pl-2">
            {data.achievements.map((a: any, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                <span className="text-slate-700">
                  <span className="font-bold text-slate-900">{a.title}</span>
                  {a.year && <span className="text-slate-400 font-sans text-[11px] ml-2">[{a.year}]</span>}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function Section({ title, children }: any) {
  return (
    <div className="mb-8">
      <h2 className="font-sans font-black uppercase text-[11px] text-blue-600 tracking-[0.2em] flex items-center gap-4 mb-4">
        {title}
        <div className="h-px bg-slate-100 flex-1" />
      </h2>
      <div className="px-1">{children}</div>
    </div>
  );
}

function Row({ left, right }: any) {
  return (
    <div className="flex justify-between items-start gap-4 mb-1">
      <div className="max-w-[80%]">{left}</div>
      <div className="whitespace-nowrap">{right}</div>
    </div>
  );
}

function SkillRow({ label, value }: any) {
  if (!value) return null;
  return (
    <p className="font-sans text-[12px]">
      <span className="font-bold text-slate-800 mr-2">{label}:</span>
      <span className="text-slate-600">{value}</span>
    </p>
  );
}

function Divider() {
  return <div className="h-0.5 bg-slate-100 w-full my-6 rounded-full" />;
}