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
  verified: boolean;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  type: "Competition" | "Exam" | "Hackathon";
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
      certificationsCount: "5+",
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
      description: "Secured All India Rank AIR 10,000 in Graduate Aptitude Test in Engineering for Data Science & Artificial Intelligence, testing deep conceptual mastery across linear algebra, calculus, probability, ML algorithms, and data structures.",
      type: "Exam",
    },
    {
      id: "ignis-hackathon",
      title: "Participant – IGNIS-XR-AI Hackathon",
      organization: "Data Vedhi Club",
      year: "2025",
      description: "Collaborated in an intensive hackathon challenge developing intelligent solutions integrating machine learning models with immersive extended reality interfaces.",
      type: "Hackathon",
    },
    {
      id: "hmel-energy",
      title: "Participant – HMEL Energy Quest",
      organization: "HPCL-Mittal Energy Limited (HMEL)",
      year: "2026",
      description: "Participated in national level engineering case competition tackling energy analytics, industrial data optimization, and sustainable computational resource allocation.",
      type: "Competition",
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
      id: "razorpulse",
      title: "RazorPulse – High-Performance Transaction Monitoring Platform",
      slug: "razorpulse",
      category: "Full-Stack",
      shortDescription: "Engineered a high-performance web platform for real-time transaction monitoring, telemetry data visualization, and automated alert processing to maximize operational efficiency.",
      problemStatement: "Modern fintech systems and payment gateways encounter massive transaction volumes requiring sub-second anomaly detection, instant status telemetry, and fail-safe automated workflow notifications to prevent latency bottlenecks and operational downtime.",
      solutionArchitecture: "Built with a modular React frontend communicating with Node.js/Express REST micro-services. Employs structured state management for live metric streaming, real-time alert filters, and optimized batch API endpoints with low overhead.",
      keyAchievements: [
        "Architected real-time transaction stream displaying live telemetry data with minimal DOM repaints",
        "Implemented intelligent alert processing engine filtering high-velocity payment events",
        "Integrated dynamic data rendering dashboards providing instant operational visibility",
        "Designed responsive dark-mode glassmorphic interface optimizing operator monitoring speed"
      ],
      metrics: [
        { label: "Throughput Capacity", value: "2.1M+ Txns" },
        { label: "Dashboard Refresh Latency", value: "< 120ms" },
        { label: "Operational Efficiency", value: "+38%" },
        { label: "Success Rate Monitored", value: "99.6%" },
      ],
      techStack: ["React.js", "Node.js", "Express.js", "REST APIs", "Tailwind CSS", "Chart.js"],
      image: "/images/razorpulse.jpg",
      githubUrl: "https://github.com/Tejaswini2416/razorpulse",
      liveDemoUrl: "https://razorpulse.vercel.app",
      featured: true,
    },
    {
      id: "smart-data-analysis",
      title: "Smart Data Analysis App – Pipeline & Anomaly Detection Engine",
      slug: "smart-data-analysis",
      category: "Python & Data Science",
      shortDescription: "Processed structured identity datasets using Python and Pandas to detect duplicate and inconsistent records, optimizing SQL aggregation queries to reduce processing time by 25%.",
      problemStatement: "Large-scale organizational identity databases frequently suffer from multi-source duplicates, missing values, and inconsistent schemas, leading to degradation in report precision and computational slowdowns in query engines.",
      solutionArchitecture: "Developed an automated Python and Pandas data ingestion pipeline leveraging vectorized filtering, statistical distribution validation, and automated anomaly flagging. Integrated with optimized SQL views and index-aware aggregation scripts.",
      keyAchievements: [
        "Cleaned and standardized multi-thousand row identity records with automated imputation algorithms",
        "Devised anomaly detection rules for outlier identification and duplicate key resolution",
        "Refactored relational SQL aggregation scripts, slashing database retrieval latency by 25%",
        "Generated insightful visual analytics summarizing record health, distribution curves, and error clusters"
      ],
      metrics: [
        { label: "Processing Time Reduction", value: "25% Faster" },
        { label: "Duplicate Detection Accuracy", value: "99.2%" },
        { label: "Outliers Handled", value: "480+ Records" },
        { label: "Data Quality Score", value: "94%" },
      ],
      techStack: ["Python", "Pandas", "NumPy", "SQL Server", "Statistical Modeling", "Data Cleaning"],
      image: "/images/smart_data.jpg",
      githubUrl: "https://github.com/Tejaswini2416/smart-data-analysis",
      liveDemoUrl: "https://smart-data-app.vercel.app",
      featured: true,
    },
    {
      id: "nlp-ai-chatbot",
      title: "NLP-Powered AI Conversational Chatbot",
      slug: "nlp-ai-chatbot",
      category: "AI/ML",
      shortDescription: "Developed a Flask-based NLP chatbot integrated with REST APIs for real-time conversational processing, optimizing request handling to minimize latency and boost reliability.",
      problemStatement: "Traditional rule-based FAQ systems cannot interpret contextual user queries, grammatical variations, or ambiguous phrasing, leading to high drop-off rates in user assistance portals.",
      solutionArchitecture: "Constructed an intelligent microservice featuring tokenization, intent classification, entity extraction, and sentiment scoring pipelines. Exposes high-speed REST endpoints consumed by an interactive web client with smooth chat streaming.",
      keyAchievements: [
        "Engineered end-to-end NLP query preprocessing including lemmatization, stop-word reduction, and vectorization",
        "Integrated multi-class intent classifier mapping user inputs to dynamic operational actions",
        "Streamlined Flask request processing pipeline, reducing average query-response roundtrip latency",
        "Implemented real-time sentiment analysis gauge assessing user sentiment positivity during dialogue"
      ],
      metrics: [
        { label: "Response Latency", value: "< 180ms" },
        { label: "Intent Recognition Accuracy", value: "93.8%" },
        { label: "Positive Sentiment Score", value: "88/100" },
        { label: "API Reliability", value: "99.9%" },
      ],
      techStack: ["Python", "Flask", "NLP", "REST APIs", "NLTK", "Scikit-Learn", "JavaScript"],
      image: "/images/nlp_chatbot.jpg",
      githubUrl: "https://github.com/Tejaswini2416/nlp-ai-chatbot",
      liveDemoUrl: "https://nlp-chatbot.vercel.app",
      featured: true,
    },
  ],
  certifications: [
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
    {
      id: "infosys-dsa-python",
      title: "Data Structures and Algorithms using Python (Part 1 & 2)",
      issuer: "Infosys Springboard",
      date: "2024",
      badgeType: "Course Credential",
      description: "Comprehensive multi-part mastery covering fundamental to advanced data structures (Linked Lists, Stacks, Queues, Binary Trees, Graphs) and algorithmic paradigms (Dynamic Programming, Greedy Algorithms, Graph Traversals).",
      skills: ["Python", "Algorithms", "Data Structures", "Big-O Analysis", "Graph Theory"],
      credentialUrl: "https://infyspringboard.onwingspan.com",
      verified: true,
    },
    {
      id: "genai-analytics",
      title: "GenAI Powered Data Analytics",
      issuer: "Industry Accredited Program",
      date: "2025",
      badgeType: "Specialization",
      description: "Advanced training in leveraging Large Language Models, prompt engineering, and generative analytical tools to extract actionable insights, automate exploratory data analysis, and synthesize data narratives.",
      skills: ["Generative AI", "Data Analytics", "Prompt Engineering", "Predictive Insights", "Python"],
      credentialUrl: "#",
      verified: true,
    },
    {
      id: "deloitte-simulation",
      title: "Technology Consulting Job Simulation",
      issuer: "Deloitte Australia (Forage)",
      date: "2024",
      badgeType: "Virtual Experience",
      description: "Simulated enterprise client advisory engagement focusing on technology architecture assessment, cloud feasibility evaluation, and technical requirements synthesis.",
      skills: ["Cloud Architecture", "Technology Consulting", "System Feasibility", "Client Advisory"],
      credentialUrl: "https://www.theforage.com",
      verified: true,
    },
    {
      id: "jpmorgan-simulation",
      title: "Software Engineering Job Simulation",
      issuer: "JPMorgan Chase & Co. (Forage)",
      date: "2024",
      badgeType: "Virtual Experience",
      description: "Practical engineering simulation interfacing with financial market data feeds, optimizing perspective visualizer modules, and resolving stock price telemetry integration issues.",
      skills: ["Financial Engineering", "Perspective Data Visualizer", "Python", "Git", "Interface Debugging"],
      credentialUrl: "https://www.theforage.com",
      verified: true,
    },
  ],
};
