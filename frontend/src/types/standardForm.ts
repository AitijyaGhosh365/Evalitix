const standardSchema = {
  title: "Candidate Application",
  type: "object",
  required: ["fullName", "dob", "email", "phone", "gender"],
  properties: {
    /* =====================
       BASIC INFO
    ====================== */
    fullName: {
      type: "string",
      title: "Full Name",
    },

    dob: {
      type: "string",
      title: "Date of Birth",
      format: "date", // yyyy-mm-dd
    },

    email: {
      type: "string",
      title: "Email",
      format: "email",
    },

    phone: {
      type: "string",
      title: "Phone Number",
      pattern: "^[6-9]\\d{9}$",
      description: "10-digit Indian mobile number",
    },

    gender: {
      type: "string",
      title: "Gender",
      enum: ["Male", "Female", "Other", "Prefer not to say"],
    },

    otherLinks: {
  type: "array",
  title: "Links",
  items: {
    type: "object",
    required: ["label", "url"],
    properties: {
      label: {
        type: "string",
        title: "Link Description",
        description: "e.g. GitHub, Portfolio, LinkedIn",
      },
      url: {
        type: "string",
        title: "URL",
        format: "uri",
      },
    },
  },
},



    education: {
  type: "array",
  title: "Education",
  items: {
    type: "object",
    required: ["title", "institute", "from"],
    properties: {
      
      institute: {
        type: "string",
        title: "Institute / University",
      },
      title: {
        type: "string",
        title: "Degree / Course",
      },
      grade: {
        type: "string",
        title: "Grade / Score",
      },
      from: {
        type: "string",
        title: "From (MM/YYYY)",
        pattern: "^(0[1-9]|1[0-2])\\/\\d{4}$",
      },
      to: {
        type: "string",
        title: "To (MM/YYYY)",
        pattern: "^(0[1-9]|1[0-2])\\/\\d{4}$",
      },
    },
  },
},


    /* =====================
       PROJECTS (ARRAY)
    ====================== */
    projects: {
      type: "array",
      title: "Projects",
      items: {
        type: "object",
        required: ["title", "date"],
        properties: {
          title: {
            type: "string",
            title: "Project Title",
          },
          date: {
            type: "string",
            title: "Date (MM/YYYY)",
            pattern: "^(0[1-9]|1[0-2])\\/\\d{4}$",
          },
          description: {
            type: "string",
            title: "Description",
          },
        },
      },
    },

    /* =====================
       EXPERIENCE (ARRAY)
    ====================== */
    experience: {
      type: "array",
      title: "Experience",
      items: {
        type: "object",
        required: ["role", "company", "from"],
        properties: {
          role: {
            type: "string",
            title: "Role / Position",
          },
          company: {
            type: "string",
            title: "Company / Organization",
          },
          from: {
            type: "string",
            title: "From (MM/YYYY)",
            pattern: "^(0[1-9]|1[0-2])\\/\\d{4}$",
          },
          to: {
            type: "string",
            title: "To (MM/YYYY)",
            pattern: "^(0[1-9]|1[0-2])\\/\\d{4}$",
          },
          description: {
            type: "string",
            title: "Description",
          },
        },
      },
    },

    /* =====================
       TECHNICAL SKILLS & INTERESTS
    ====================== */
    skillsAndInterests: {
      type: "object",
      title: "Technical Skills & Interests",
      properties: {
        languages: {
          type: "string",
          title: "Languages",

        },
        devFrameworks: {
          type: "string",
          title: "Dev Frameworks / Libraries",

        },
        softSkills: {
          type: "string",
          title: "Soft Skills",

        },
        areasOfInterest: {
          type: "string",
          title: "Areas of Interest",

        },
      },
    },

    /* =====================
       ACHIEVEMENTS (ARRAY)
    ====================== */
    achievements: {
      type: "array",
      title: "Achievements",
      items: {
        type: "object",
        required: ["title"],
        properties: {
          title: {
            type: "string",
            title: "Achievement Title",
          },
          year: {
            type: "string",
            title: "Year",
            pattern: "^\\d{4}$",
          },
          description: {
            type: "string",
            title: "Description",
          },
        },
      },
    },
  },
};

export default standardSchema;
