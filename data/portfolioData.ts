export interface Project {
  id: string;
  title: string;
  slug: string;
  category: "Full-Stack" | "AI/ML" | "Python & Data Science";
  shortDescription: string;
  problemStatement: string;
  solutionArchitecture: string;
  keyAchievements: string[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  image: string;
  githubUrl: string;
  liveDemoUrl: string;
  featured: boolean;
}

export interface SkillItem {
  name: string;
  iconName: string;
  level: "Advanced" | "Intermediate" | "Proficient";
  category: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field?: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  gradeType: "CGPA" | "GPA" | "Percentage";
  summary: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badgeType: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
  pdfUrl?: string;
  verified: boolean;
}

export interface VolunteerImage {
  url: string;
  caption: string;
  category: string;
}

export interface VolunteerExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
  images: VolunteerImage[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  type: "Competition" | "Exam" | "Hackathon";
  image?: string;
  badge?: string;
  stats?: { label: string; value: string }[];
  highlights?: string[];
}

export interface PortfolioData {
  personal: {
    name: string;
    headline: string;
    subheadline: string;
    tagline: string;
    bio: string;
    location: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    avatar: string;
    stats: {
      cgpa: string;
      gateRank: string;
      projectsCompleted: string;
      certificationsCount: string;
    };
  };
  education: EducationItem[];
  achievements: AchievementItem[];
  skills: {
    category: string;
    description: string;
    items: SkillItem[];
  }[];
  projects: Project[];
  certifications: CertificationItem[];
  volunteer?: VolunteerExperience[];
}

export const initialPortfolioData: PortfolioData = {
  personal: {
    name: "Tejaswini Kummari",
    headline: "Hi, I'm Tejaswini Kummari",
    subheadline: "Computer Science Engineer | AI/ML & Full-Stack Developer",
    tagline: "Building RazorPulse, Smart Analytics Engines, and NLP Chatbots.",
    bio: "Passionate Computer Science & Engineering graduate with a strong foundation in modern software architecture, Artificial Intelligence, and scalable web engineering. Driven by deep analytical problem-solving and clean code principles, I bridge the gap between intelligent machine learning pipelines and intuitive, high-performance web applications. Dedicated to building reliable, data-driven solutions with rigorous precision and engineering excellence.",
    location: "Telangana, India",
    email: "tejaswinikummari17@gmail.com",
    phone: "+91 8919912916",
    github: "https://github.com/Tejaswini2416",
    linkedin: "https://www.linkedin.com/in/tejaswini-kummari-192425313/",
    avatar: "/images/tej.jpeg",
    stats: {
      cgpa: "8.77",
      gateRank: "AIR 10,000",
      projectsCompleted: "10+",
      certificationsCount: "4+",
    },
  },
  education: [
    {
      id: "btech",
      degree: "B.Tech in Computer Science Engineering (CSE)",
      field: "Computer Science & Engineering",
      institution: "Vignana Bharathi Institute of Technology",
      location: "Ghatkesar, Telangana",
      period: "2023 – 2027",
      grade: "8.77 CGPA",
      gradeType: "CGPA",
      summary: "Pursuing in-depth coursework in Data Structures, Algorithms, Artificial Intelligence, Operating Systems, Database Management Systems, and Cloud Computing with academic excellence and hands-on system architecture projects.",
      highlights: [
        "Core focus on AI/ML algorithms, advanced data structures, and distributed databases",
        "Consistent academic excellence with an aggregate CGPA of 8.77",
        "Active member of Technical Clubs and Competitive Coding Chapters"
      ],
    },
    {
      id: "inter",
      degree: "Intermediate (MPC)",
      field: "Mathematics, Physics, Chemistry",
      institution: "Vision Junior College",
      location: "Boduppal, Telangana",
      period: "2021 – 2023",
      grade: "9.8 CGPA",
      gradeType: "CGPA",
      summary: "Completed higher secondary education specializing in Mathematics, Physics, and Chemistry, cultivating strong analytical, quantitative, and logical reasoning capabilities fundamental to advanced computational engineering.",
      highlights: [
        "Secured outstanding academic grade of 9.8 CGPA",
        "Strong foundation in differential calculus, linear algebra, and coordinate geometry"
      ],
    },
    {
      id: "ssc",
      degree: "Secondary School Certificate (SSC)",
      field: "General Academics & Sciences",
      institution: "Vijay Ratna High School",
      location: "Boduppal, Telangana",
      period: "2020 – 2021",
      grade: "10.0 CGPA",
      gradeType: "CGPA",
      summary: "Graduated secondary education with a perfect 10 CGPA score, demonstrating exemplary discipline, scholastic leadership, and early aptitude for science and technology.",
      highlights: [
        "Achieved maximum possible score: 10/10 CGPA",
        "Merit recipient in Mathematics and Science Competitions"
      ],
    },
  ],
  achievements: [
    {
      id: "gate-2026",
      title: "GATE 2026 Qualified (Data Science & AI)",
      organization: "National Coordination Board - GATE",
      year: "2026",
      description: "Secured All India Rank (AIR) ~10,000 in Graduate Aptitude Test in Engineering for Data Science & Artificial Intelligence, testing deep conceptual mastery across linear algebra, calculus, probability, ML algorithms, and data structures.",
      type: "Exam",
      badge: "AIR ~10,000 Nationwide",
      stats: [
        { label: "Examination", value: "GATE 2026" },
        { label: "Paper", value: "Data Science & AI (DA)" },
        { label: "National Standing", value: "AIR ~10,000" }
      ],
      highlights: [
        "Qualified the national benchmark examination in Data Science & Artificial Intelligence.",
        "Demonstrated rigorous proficiency across linear algebra, probability, machine learning, and algorithm design."
      ]
    },
    {
      id: "google-student-ambassador",
      title: "Google Student Ambassador — Team Gemini Lead",
      organization: "Google & Gemini Student Ambassador Program",
      year: "2026",
      description: "Appointed as Google Student Ambassador leading the Gemini initiative campus-wide for 2026. Championing generative AI literacy, orchestrating developer workshops, and driving multimodal AI adoption.",
      type: "Competition",
      badge: "Team Gemini Lead 2026",
      stats: [
        { label: "Program", value: "Google Ambassador" },
        { label: "Role", value: "Team Gemini Lead" },
        { label: "Year", value: "2026" }
      ],
      highlights: [
        "Selected as Google Student Ambassador leading Gemini AI initiatives across campus.",
        "Spearheading multimodal AI workshops, hands-on hackathons, and student developer cohorts."
      ]
    },
    {
      id: "sih-hackathon",
      title: "Smart India Hackathon (SIH) Finalist",
      organization: "Smart India Hackathon • Vignana Bharathi Institute of Technology (VBIT)",
      year: "2026",
      description: "Ranked among the Top 50 finalist teams campus-wide at VBIT out of 200+ competing engineering teams in the Smart India Hackathon internal round, recognized for innovative software architecture, rapid prototyping, and real-world utility.",
      type: "Hackathon",
      badge: "Top Teams Finalist • VBIT",
      stats: [
        { label: "Competing Teams", value: "200+" },
        { label: "Standing", value: "Top Finalist" },
        { label: "Campus Venue", value: "VBIT Hyderabad" }
      ],
      highlights: [
        "Earned selection among the top finalist engineering teams out of over 200 competing squads.",
        "Engineered and presented a fully functional software prototype under rigorous hackathon time constraints.",
        "Recognized for system feasibility, live prototype walkthroughs, and real-time execution."
      ]
    },
    {
      id: "hmel-energy",
      title: "National Finalist – HMEL Energy Quest",
      organization: "HPCL-Mittal Energy Limited (HMEL)",
      year: "2026",
      description: "Advanced to the national finals in premier engineering competition tackling industrial energy analytics, operational efficiency, and sustainable computational resource allocation.",
      type: "Competition",
      badge: "National Finalist",
      stats: [
        { label: "Competition", value: "HMEL Energy Quest" },
        { label: "Stage", value: "National Finals" },
        { label: "Focus", value: "Energy Analytics" }
      ],
      highlights: [
        "Shortlisted for national finals among competitors from top engineering institutions across India.",
        "Formulated data-driven models for industrial energy optimization and predictive operational metrics."
      ]
    },
    {
      id: "ignis-hackathon",
      title: "Participant – IGNIS-XR-AI Hackathon",
      organization: "Data Vedhi Club",
      year: "2025",
      description: "Collaborated in an intensive hackathon challenge developing intelligent solutions integrating machine learning models with immersive extended reality interfaces.",
      type: "Hackathon",
      badge: "AI/XR Hackathon",
      stats: [
        { label: "Host", value: "Data Vedhi Club" },
        { label: "Focus", value: "AI + Extended Reality" }
      ],
      highlights: [
        "Rapidly prototyped assistive AI workflows integrated with spatial computing interfaces.",
        "Coordinated model inference pipelines with frontend interactivity under tight sprint windows."
      ]
    },
  ],
  skills: [
    {
      category: "Frontend Development",
      description: "Crafting modern, responsive, and accessible user interfaces with dynamic interactivity.",
      items: [
        { name: "HTML5", iconName: "SiHtml5", level: "Advanced", category: "Frontend" },
        { name: "CSS3", iconName: "SiCss3", level: "Advanced", category: "Frontend" },
        { name: "React.js", iconName: "SiReact", level: "Advanced", category: "Frontend" },
        { name: "Tailwind CSS", iconName: "SiTailwindcss", level: "Advanced", category: "Frontend" },
        { name: "JavaScript (ES6+)", iconName: "SiJavascript", level: "Advanced", category: "Frontend" },
      ],
    },
    {
      category: "Backend & Frameworks",
      description: "Building resilient RESTful architectures, API gateways, and asynchronous microservices.",
      items: [
        { name: "Node.js", iconName: "SiNodedotjs", level: "Intermediate", category: "Backend" },
        { name: "Express.js", iconName: "SiExpress", level: "Intermediate", category: "Backend" },
        { name: "Python", iconName: "SiPython", level: "Advanced", category: "Backend" },
        { name: "Flask", iconName: "SiFlask", level: "Intermediate", category: "Backend" },
        { name: "REST APIs", iconName: "SiFastapi", level: "Advanced", category: "Backend" },
      ],
    },
    {
      category: "Databases & Data Management",
      description: "Designing optimized relational schemas, indexing strategies, and data access layers.",
      items: [
        { name: "SQLite", iconName: "SiSqlite", level: "Advanced", category: "Databases" },
        { name: "Microsoft SQL Server", iconName: "SiMicrosoftsqlserver", level: "Intermediate", category: "Databases" },
        { name: "SQL Query Optimization", iconName: "SiPostgresql", level: "Advanced", category: "Databases" },
      ],
    },
    {
      category: "AI/ML & Data Science",
      description: "Implementing statistical learning models, predictive pipelines, and natural language agents.",
      items: [
        { name: "Data Analytics", iconName: "SiGooglecloud", level: "Advanced", category: "AI/ML" },
        { name: "NLP (Natural Language Processing)", iconName: "SiPytorch", level: "Intermediate", category: "AI/ML" },
        { name: "NumPy", iconName: "SiNumpy", level: "Advanced", category: "AI/ML" },
        { name: "Pandas", iconName: "SiPandas", level: "Advanced", category: "AI/ML" },
        { name: "Anomaly Detection", iconName: "SiScikitlearn", level: "Intermediate", category: "AI/ML" },
      ],
    },
    {
      category: "Programming Languages & Core",
      description: "Rigorous computational problem solving, data structure optimization, and OOP design.",
      items: [
        { name: "Java", iconName: "SiOpenjdk", level: "Advanced", category: "Core" },
        { name: "C Programming", iconName: "SiC", level: "Intermediate", category: "Core" },
        { name: "Data Structures & Algorithms", iconName: "SiLeetcode", level: "Advanced", category: "Core" },
        { name: "Object-Oriented Programming (OOP)", iconName: "SiCplusplus", level: "Advanced", category: "Core" },
      ],
    },
    {
      category: "DevOps, Tools & Platforms",
      description: "Version control workflows, cloud containers, enterprise automation, and design systems.",
      items: [
        { name: "Git & GitHub", iconName: "SiGit", level: "Advanced", category: "DevOps" },
        { name: "Docker Basics", iconName: "SiDocker", level: "Intermediate", category: "DevOps" },
        { name: "ServiceNow", iconName: "SiServicenow", level: "Advanced", category: "DevOps" },
        { name: "UI/UX Design & Prototyping", iconName: "SiFigma", level: "Intermediate", category: "DevOps" },
      ],
    },
  ],
  projects: [
    {
      id: "aira-chatbot",
      title: "Aira — Personalized Multi-Provider AI Chatbot",
      slug: "aira-chatbot",
      category: "Full-Stack",
      shortDescription: "Full-Stack Engineer & AI Developer | Multi-LLM orchestration engine (Groq, OpenAI, Gemini, Claude) with high-throughput SSE token streaming, persistent context memory (PostgreSQL + Prisma), interactive voice mode, and glassmorphic UI.",
      problemStatement: "Modern AI chat platforms frequently depend on a single model provider, making them vulnerable to API rate limits, provider outages, and vendor lock-in, while lacking cross-session personalization facts and real-time bidirectional audio docks.",
      solutionArchitecture: "Engineered with React 18, Vite, and Tailwind CSS on the frontend and Node.js/Express with PostgreSQL and Prisma ORM on the backend. Implemented an adaptive multi-LLM dispatcher with startup health key detection (/api/health), SSE streaming pipeline, persistent memory management (/api/v1/memory), and interactive voice modes via Web Speech and OpenAI audio APIs.",
      keyAchievements: [
        "Multi-Provider AI Architecture: Engineered a resilient, multi-LLM orchestration engine supporting Groq, OpenAI, Google Gemini, and Anthropic Claude with dynamic startup key detection (/api/health) and fallback routing.",
        "Real-Time Streaming & Interaction: Built a high-throughput SSE (Server-Sent Events) streaming pipeline for token-by-token rendering, featuring chat branching, dynamic message regeneration, and custom TTS synthesis.",
        "Long-Term Context Memory: Designed a persistent memory management system using PostgreSQL and Prisma ORM to extract, store, and manage user preferences and cross-session facts (/api/v1/memory).",
        "Interactive Voice & Glassmorphic UI: Developed a glassmorphic interface with Framer Motion visualizers, live audio waveform docks, and interactive voice mode using Web Speech & OpenAI audio APIs.",
        "Security & Scalability: Secured application endpoints with JWT authentication, bcryptjs password hashing, express-rate-limit, and CORS policies to handle concurrent streaming workloads safely."
      ],
      metrics: [
        { label: "AI Orchestration", value: "Groq, OpenAI, Gemini, Claude" },
        { label: "Streaming Pipeline", value: "SSE Token-by-Token" },
        { label: "Memory Layer", value: "PostgreSQL + Prisma ORM" },
        { label: "Voice & Audio", value: "Web Speech & OpenAI Audio" },
      ],
      techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Vite", "Tailwind CSS", "Framer Motion", "JWT", "Server-Sent Events"],
      image: "/images/aira_chatbot.png",
      githubUrl: "https://github.com/Tejaswini2416/aira_chatbot",
      liveDemoUrl: "https://aira-chatbot.vercel.app/",
      featured: true,
    },
    {
      id: "nexusevents",
      title: "NexusEvents — Student Event Discovery Platform",
      slug: "nexusevents",
      category: "Full-Stack",
      shortDescription: "High-performance event discovery engine for college students to search and register for hackathons, tech summits, MNC campus events (Google, Microsoft, Meta, NVIDIA) with real-time QR gate scanning and organizer analytics.",
      problemStatement: "College students lack a unified, real-time platform to discover and register for campus hackathons, tech summits, and MNC recruitment events — existing solutions have stale data, no lifecycle awareness, and zero fraud prevention at gate entry.",
      solutionArchitecture: "Built with Next.js 16 App Router and React 19 for SSR performance. Uses Supabase Realtime subscriptions + client-side interval tickers as a finite-state event lifecycle engine. QR gate scanner built with webcam viewfinder, real-time Supabase-backed duplicate detection, and qrcode.react digital pass generation.",
      keyAchievements: [
        "Engineered a Dynamic Event Lifecycle Engine using Supabase Realtime subscriptions and client-side tickers to auto-compute event statuses (UPCOMING, LIVE, REGISTRATION CLOSED, COMPLETED) with sub-second UI sync",
        "Eliminated gate fraud to zero by building a webcam QR scanner with animated laser beam UI, multi-gate routing, and real-time Supabase-backed duplicate entry detection",
        "Delivered a full organizer analytics dashboard (/organizer) with revenue vs. profit bar charts, ticket availability donut charts, and mini agenda calendar via aggregated Supabase PostgreSQL queries",
        "Implemented student-first utilities including LocalStorage bookmarking, Google/Apple Calendar .ics exports, and live deadline countdown timers for hackathon registration deadlines"
      ],
      metrics: [
        { label: "Duplicate Gate Entries", value: "Zero" },
        { label: "Event Lifecycle States", value: "4 Auto-Computed" },
        { label: "MNC Campus Tracks", value: "Google, Microsoft, Meta, NVIDIA" },
        { label: "Real-time Sync", value: "Supabase Realtime" },
      ],
      techStack: ["Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS v4", "Supabase", "PostgreSQL", "qrcode.react"],
      image: "/images/nexusevents.png",
      githubUrl: "https://github.com/Tejaswini2416/event_discovery",
      liveDemoUrl: "https://eventorganizer-beta.vercel.app/",
      featured: true,
    },
    {
      id: "healthcare-companion",
      title: "Healthcare Companion: AI-Powered Cancer Care Platform",
      slug: "healthcare-companion",
      category: "AI/ML",
      shortDescription: "Clinical-grade digital twin platform for glioblastoma patients integrating 3D MRI segmentation, NLP report parsing, biophysical PDE simulation, and WebGL role-based clinician workstations.",
      problemStatement: "Glioblastoma care suffers from fragmented workflows — radiologists produce complex reports patients cannot understand, clinicians lack counterfactual treatment simulation tools, and there is no unified platform integrating imaging AI, biophysics, and NLP for end-to-end patient care.",
      solutionArchitecture: "Built on Python/Streamlit with PyTorch and MONAI for volumetric deep learning, a Fisher-Kolmogorov PDE solver for tumor simulation, Bio_ClinicalBERT NLP for report translation, GraphRAG safety guardrails, and Three.js WebGL for 3D volume rendering in role-based clinician dashboards backed by Supabase PostgreSQL.",
      keyAchievements: [
        "Implemented MONAI 3D SegResNet for multi-sequence MRI segmentation (NCR, ED, ET) with 100% sensitivity and 89.47% accuracy, with fine-tuned ResNet-18 + Grad-CAM saliency maps",
        "Developed Fisher-Kolmogorov reaction-diffusion PDE solver simulating 30–180 day counterfactual tumor volume and KPS trajectories across treatment regimens",
        "Created Bio_ClinicalBERT NLP pipeline translating radiology reports to 6th-grade reading level summaries, backed by RANO 2.0 triage engine and GraphRAG safety guardrails",
        "Designed Three.js WebGL 3D volume rendering workstations with interactive patient dashboards and automated red-flag alert escalations"
      ],
      metrics: [
        { label: "Sensitivity (0 False Negatives)", value: "100%" },
        { label: "Segmentation Accuracy", value: "89.47%" },
        { label: "Tumor Simulation Horizon", value: "30–180 Days" },
        { label: "Report Reading Level", value: "Grade 6" },
      ],
      techStack: ["PyTorch", "MONAI", "Bio_ClinicalBERT", "Python", "Streamlit", "Supabase PostgreSQL", "Three.js", "WebGL", "GraphRAG"],
      image: "/images/healthcare_companion.png",
      githubUrl: "https://github.com/Tejaswini2416/healthcare_companion_for_neurology",
      liveDemoUrl: "https://healthcarecompanionforneurology-cbmmgjk4kaxhwefnsdw2pt.streamlit.app/",
      featured: true,
    },
    {
      id: "apex-career-coach",
      title: "Apex — AI Career Coach & Strategic Advisor",
      slug: "apex-career-coach",
      category: "Full-Stack",
      shortDescription: "Executive-grade AI career coaching platform with a Mock Interview Studio, ATS Document Engine, Compensation & Tax Lab, skill gap radar charts, and an application tracking Kanban pipeline.",
      problemStatement: "Job seekers lack a unified, intelligent platform that combines interview preparation with real-time speech coaching, ATS-optimized resume scoring, equity compensation modeling, and market intelligence — forcing them to juggle multiple disconnected tools.",
      solutionArchitecture: "Built with Next.js 14 and TypeScript on the frontend, powered by Vercel AI SDK streaming OpenAI responses in real-time. Features Web Speech API for voice recognition/synthesis, PDF export, a local offline simulation mode, and Kanban pipeline with local persistence.",
      keyAchievements: [
        "Created Mock Interview Studio with STAR framework real-time scoring, speech recognition, voice synthesis, and telemetry tracking (eye-contact, WPM, filler-word detection)",
        "Built ATS Engine scoring resume match percentages against live job postings (95%+ match) and generating targeted cover letters and LinkedIn pitches with PDF export",
        "Engineered Compensation & Tax Lab modeling 4-year equity vesting schedules (standard/backloaded), multi-currency tax arbitrage, and AI-driven counter-offer negotiation trees",
        "Implemented market intelligence job RAG, skill gap radar charts, and application tracking Kanban pipeline with local persistence"
      ],
      metrics: [
        { label: "ATS Resume Match Score", value: "95%+" },
        { label: "Interview Coaching Metrics", value: "WPM, Eye-Contact, Filler" },
        { label: "Equity Vesting Horizon", value: "4-Year Schedules" },
        { label: "Deployment", value: "Vercel + OpenAI Streaming" },
      ],
      techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel AI SDK", "OpenAI API", "Web Speech API"],
      image: "/images/apex_career.png",
      githubUrl: "https://github.com/Tejaswini2416/career_chatbot",
      liveDemoUrl: "https://career-chatbot-neon.vercel.app/",
      featured: true,
    },
    {
      id: "razorpulse-agent",
      title: "RazorPulse Agent — Merchant Intelligence & Product Recommendation System",
      slug: "razorpulse-agent",
      category: "Full-Stack",
      shortDescription: "Autonomous merchant intelligence platform converting website URLs into structured merchant profiles, zero-form KYC data, risk classifications, and optimal payment stack recommendations with explainability vectors.",
      problemStatement: "Payment processors and fintech platforms spend significant manual effort on merchant KYC, risk scoring, and product-fit assessment. Existing approaches are form-heavy, slow, and lack intelligent payment stack recommendation with explainability.",
      solutionArchitecture: "Engineered with a FastAPI backend streaming execution steps via Server-Sent Events (SSE) to a Next.js 15 frontend. Integrates Groq LPU (Llama 3.3 70B) with deterministic heuristic fallback engines, a web/social signal scraper, Async SQLAlchemy for audit logging, and a product matchmaking engine.",
      keyAchievements: [
        "Integrated Groq LPU (Llama 3.3 70B) with deterministic heuristic fallback for automated business model cohorting, risk scoring, legal name/GSTIN synthesis, and compliance checks",
        "Built web and social signal scraper extracting e-commerce metadata, cart platforms (Shopify, WooCommerce, custom builds), brand assets, and estimated AOV",
        "Created product matchmaking engine recommending optimal payment stack configurations with explainability vectors, projected ROI, and estimated annual revenue savings",
        "Architected real-time FastAPI backend streaming execution steps to Next.js 15 via SSE with complete transactional audit logging in Async SQLAlchemy"
      ],
      metrics: [
        { label: "LLM Backend", value: "Llama 3.3 70B (Groq LPU)" },
        { label: "Streaming Protocol", value: "SSE (Real-time)" },
        { label: "KYC Form Fields", value: "Zero-Form" },
        { label: "Audit Logging", value: "Full Transactional" },
      ],
      techStack: ["Groq LPU", "Llama 3.3 70B", "FastAPI", "Next.js 15", "Async SQLAlchemy", "Server-Sent Events", "Tailwind CSS", "SQLite", "PostgreSQL"],
      image: "/images/razorpulse_agent.png",
      githubUrl: "https://github.com/Tejaswini2416/razorpulse_agent",
      liveDemoUrl: "https://razorpulse-agent.vercel.app/",
      featured: true,
    },
  ],
  certifications: [
    {
      id: "deloitte-simulation",
      title: "Data Analytics Job Simulation",
      issuer: "Deloitte Australia (Forage)",
      date: "May 2026",
      badgeType: "Virtual Job Simulation",
      description: "Practical engineering simulation conducting data analysis and forensic technology evaluations on enterprise datasets. Analyzed operational metrics and synthesized executive findings.",
      skills: ["Data Analysis", "Forensic Technology", "Data Interpretation", "Enterprise Consulting"],
      credentialUrl: "https://www.theforage.com/simulations/deloitte-au/data-analytics-ey3x",
      pdfUrl: "/certifications/forage_simulation.pdf",
      verified: true,
    },
    {
      id: "tata-visualization",
      title: "Data Visualisation: Empowering Business with Effective Insights",
      issuer: "Tata (Forage)",
      date: "May 2026",
      badgeType: "Virtual Experience",
      description: "Executive simulation mastering business scenario framing, strategic chart selection, high-impact dashboard design, and effective data storytelling.",
      skills: ["Data Visualization", "Business Analytics", "Executive Dashboards", "Data Storytelling"],
      credentialUrl: "https://www.theforage.com/simulations/tata/data-visualisation-p5xo",
      pdfUrl: "/certifications/data_visualization.pdf",
      verified: true,
    },
    {
      id: "udemy-genai",
      title: "Generative AI & ChatGPT Technical Masterclass",
      issuer: "Udemy",
      date: "Aug 2026",
      badgeType: "Technical Course Credential",
      description: "22.5 hours of verified technical coursework on Generative AI architectures, prompt engineering, multi-modal workflows, and applied LLM automation.",
      skills: ["Generative AI", "Prompt Engineering", "LLM Workflows", "AI Automation"],
      credentialUrl: "https://ude.my/UC-8961b8be-2b66-4a83-aea5-adef2c0c5df5",
      pdfUrl: "/certifications/udemy_certificate.pdf",
      verified: true,
    },
    {
      id: "servicenow-csa",
      title: "ServiceNow Certified System Administrator (CSA)",
      issuer: "ServiceNow",
      date: "2025",
      badgeType: "Official Certification",
      description: "Validates comprehensive competence in configuring, administering, and customizing the ServiceNow platform, including User Administration, UI Policies, Business Rules, Workflow Orchestration, and Service Catalog Management.",
      skills: ["ServiceNow Platform", "ITSM", "Workflow Automation", "System Administration", "Business Rules"],
      credentialUrl: "https://www.servicenow.com",
      verified: true,
    },
  ],
  volunteer: [
    {
      id: "crowdbridge-lead",
      role: "Technical Lead — CrowdBridge",
      organization: "Google Crowdsource",
      period: "Sept 2026",
      location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
      description: "Led technical execution for the CrowdBridge initiative under Google Crowdsource, guiding students to contribute quality dataset annotations and mentoring attendees on open data contribution and machine learning data labeling workflows.",
      highlights: [
        "Led technical execution for the CrowdBridge initiative, guiding students to contribute quality dataset annotations for Google Crowdsource.",
        "Mentored attendees on open data contribution practices and machine learning data labeling workflows.",
        "Conducted stage sessions and live demonstrations on computer vision and natural language crowdsourcing.",
        "Facilitated active student participation across multiple academic departments at VBIT."
      ],
      skills: ["Google Crowdsource", "Technical Leadership", "ML Data Labeling", "Open Data Contribution", "Public Speaking"],
      images: [
        {
          url: "/images/volunteer/crowdbridge_lead.jpeg",
          caption: "Technical Lead — Delivering the CrowdBridge initiative presentation on stage at VBIT",
          category: "CrowdBridge"
        },
        {
          url: "/images/volunteer/crowdbridge_audience.jpeg",
          caption: "Mentoring attendees and guiding students through Google Crowdsource data labeling",
          category: "CrowdBridge"
        }
      ]
    },
    {
      id: "buildathon-crew",
      role: "Technical Mentor & Crew — Buildathon 2k26",
      organization: "24-Hour Hackathon",
      period: "Jan 2026",
      location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
      description: "Provided technical guidance and real-time debugging support for hackathon participants over a 24-hour build cycle. Resolved integration bugs across APIs, web frameworks, and database setups for competing teams.",
      highlights: [
        "Provided technical guidance and real-time debugging support for hackathon participants over a 24-hour build cycle.",
        "Resolved integration bugs across APIs, web frameworks, and database setups for competing teams.",
        "Assisted teams with REST API orchestration, system architecture, and prototype validation.",
        "Served as technical crew evaluating final stage project demonstrations."
      ],
      skills: ["Technical Mentorship", "Real-Time Debugging", "API Integration", "Web Frameworks", "Hackathon Organization"],
      images: [
        {
          url: "/images/volunteer/buildathon_team.jpeg",
          caption: "Guiding and debugging alongside hackathon teams during the 24-hour build cycle",
          category: "Buildathon 2k26"
        },
        {
          url: "/images/volunteer/buildathon_presentation.jpeg",
          caption: "Evaluating stage presentations and prototype demos at Buildathon 2k26",
          category: "Buildathon 2k26"
        }
      ]
    }
  ],
};
