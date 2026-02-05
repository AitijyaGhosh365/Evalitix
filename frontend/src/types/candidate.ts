export interface Education {
  institute: string;
  title: string;
  from: string;
  to?: string;
}

export interface Experience {
  company: string;
  role: string;
  from: string;
  to?: string;
  description?: string;
}

export interface Project {
  title: string;
  date: string;
  description?: string;
}

export interface CandidateFormData {
  fullName: string;
  email: string;
  phone: string;
  otherLinks?: { label: string; url: string }[];
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skillsAndInterests: {
    languages?: string;
    devFrameworks?: string;
    softSkills?: string;
    areasOfInterest?: string;
  };
  achievements: { title: string; year?: string }[];
}