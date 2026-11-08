"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit3,
  FiPlus,
  FiTrash2,
  FiDownload,
  FiRotateCcw,
  FiCheck,
  FiArrowLeft,
  FiFolder,
  FiUser,
  FiCheckCircle,
  FiCode,
  FiLock,
  FiUnlock,
  FiShield,
  FiKey,
  FiEye,
  FiEyeOff,
  FiLogOut,
  FiAlertCircle,
  FiAward,
  FiUsers,
  FiFileText,
  FiExternalLink,
  FiImage,
  FiLayers,
  FiMapPin,
  FiCalendar,
  FiLink,
  FiX,
} from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";
import {
  Project,
  CertificationItem,
  VolunteerExperience,
  VolunteerImage,
  AchievementItem,
} from "@/data/portfolioData";

type AdminTab = "projects" | "certifications" | "volunteer" | "achievements" | "profile";

const AVAILABLE_PDFS = [
  { label: "Deloitte Data Analytics Simulation", path: "/certifications/forage_simulation.pdf" },
  { label: "Tata Data Visualization", path: "/certifications/data_visualization.pdf" },
  { label: "Udemy Generative AI Masterclass", path: "/certifications/udemy_certificate.pdf" },
];

const AVAILABLE_IMAGES = [
  { label: "Aira Chatbot", path: "/images/aira_chatbot.png" },
  { label: "RazorPulse Agent", path: "/images/razorpulse.jpg" },
  { label: "Tejaswini Avatar", path: "/images/tej.jpeg" },
  { label: "CrowdBridge Lead", path: "/images/volunteer/crowdbridge_lead.jpeg" },
  { label: "CrowdBridge Audience", path: "/images/volunteer/crowdbridge_audience.jpeg" },
  { label: "Buildathon Mentorship", path: "/images/volunteer/buildathon_team.jpeg" },
  { label: "Buildathon Presentation", path: "/images/volunteer/buildathon_presentation.jpeg" },
  { label: "SIH Hackathon Top 20", path: "/images/volunteer/sih_hackathon.jpeg" },
];

export default function AdminCMSPage() {
  const {
    data,
    addProject,
    updateProject,
    deleteProject,
    addCertification,
    updateCertification,
    deleteCertification,
    addVolunteerExperience,
    updateVolunteerExperience,
    deleteVolunteerExperience,
    addVolunteerImage,
    deleteVolunteerImage,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    updatePersonalInfo,
    resetToDefaults,
    exportJSON,
    hasCustomEdits,
    isAdmin,
    loginAdmin,
    logoutAdmin,
  } = usePortfolio();

  // Authentication Form State
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // ---------------- PROJECTS STATE ----------------
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    category: "Full-Stack" as "Full-Stack" | "AI/ML" | "Python & Data Science",
    shortDescription: "",
    problemStatement: "",
    solutionArchitecture: "",
    keyAchievements: "",
    metricsStr: "Latency: < 150ms, Accuracy: 98%",
    techStack: "React.js, Node.js, Express.js, Python",
    image: "/images/razorpulse.jpg",
    githubUrl: "https://github.com/Tejaswini2416/razorpulse_agent",
    liveDemoUrl: "https://razorpulse.vercel.app",
    featured: true,
  });

  // ---------------- CERTIFICATIONS STATE ----------------
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [certForm, setCertForm] = useState({
    title: "",
    issuer: "Amazon Web Services (AWS)",
    date: "2024",
    badgeType: "Cloud Architecture",
    description: "",
    skills: "Cloud Architecture, AWS, IAM, S3",
    credentialUrl: "https://www.credly.com",
    pdfUrl: "/certifications/aws_cloud_foundations.pdf",
    verified: true,
  });

  // ---------------- VOLUNTEER STATE ----------------
  const [editingVolunteerId, setEditingVolunteerId] = useState<string | null>(null);
  const [volunteerForm, setVolunteerForm] = useState({
    role: "",
    organization: "",
    period: "Sept 2026",
    location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
    description: "",
    highlights: "",
    skills: "Technical Leadership, Mentorship, Google Crowdsource",
  });
  // New Image addition form inside Volunteer tab
  const [newVolImageForm, setNewVolImageForm] = useState({
    url: "/images/volunteer/crowdbridge_lead.jpeg",
    caption: "",
    category: "CrowdBridge",
  });

  // ---------------- ACHIEVEMENTS STATE ----------------
  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [achForm, setAchForm] = useState({
    title: "",
    organization: "SIH Internal College Hackathon",
    year: "2026",
    type: "Hackathon" as "Competition" | "Exam" | "Hackathon",
    description: "",
  });

  // ---------------- PROFILE STATE ----------------
  const [profileForm, setProfileForm] = useState({
    name: data.personal.name,
    headline: data.personal.headline,
    subheadline: data.personal.subheadline,
    tagline: data.personal.tagline,
    bio: data.personal.bio,
    email: data.personal.email,
    phone: data.personal.phone,
    location: data.personal.location,
    avatar: data.personal.avatar,
    github: data.personal.github,
    linkedin: data.personal.linkedin,
    cgpa: data.personal.stats.cgpa,
    gateRank: data.personal.stats.gateRank,
    projectsCompleted: data.personal.stats.projectsCompleted,
    certificationsCount: data.personal.stats.certificationsCount,
  });

  const showToast = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError("Please enter the administrator passcode.");
      return;
    }

    const success = loginAdmin(passwordInput);
    if (success) {
      setAuthError(null);
      setPasswordInput("");
      showToast("Admin access authenticated successfully!");
    } else {
      setAuthError("Invalid administrative passcode. Please verify and try again.");
    }
  };

  // ---------------- PROJECT HANDLERS ----------------
  const handleEditProjectClick = (p: Project) => {
    setEditingProjectId(p.id);
    setProjectForm({
      title: p.title,
      category: p.category,
      shortDescription: p.shortDescription,
      problemStatement: p.problemStatement,
      solutionArchitecture: p.solutionArchitecture,
      keyAchievements: p.keyAchievements.join("\n"),
      metricsStr: p.metrics.map((m) => `${m.label}: ${m.value}`).join(", "),
      techStack: p.techStack.join(", "),
      image: p.image,
      githubUrl: p.githubUrl,
      liveDemoUrl: p.liveDemoUrl,
      featured: p.featured,
    });
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setAuthError("Unauthorized. Admin privileges required.");
      return;
    }

    if (!projectForm.title.trim() || !projectForm.shortDescription.trim()) {
      alert("Please provide at least a project title and short description.");
      return;
    }

    const techArray = projectForm.techStack
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const achievementsArray = projectForm.keyAchievements
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const metricsArray = projectForm.metricsStr
      .split(",")
      .map((item) => {
        const [label, val] = item.split(":");
        return {
          label: label ? label.trim() : "Metric",
          value: val ? val.trim() : "Value",
        };
      })
      .filter((m) => m.label && m.value);

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: projectForm.title,
        category: projectForm.category,
        shortDescription: projectForm.shortDescription,
        problemStatement: projectForm.problemStatement,
        solutionArchitecture: projectForm.solutionArchitecture,
        keyAchievements:
          achievementsArray.length > 0
            ? achievementsArray
            : ["Engineered optimized computational modules."],
        metrics:
          metricsArray.length > 0
            ? metricsArray
            : [{ label: "Efficiency", value: "+25%" }],
        techStack: techArray.length > 0 ? techArray : ["React", "Python"],
        image: projectForm.image,
        githubUrl: projectForm.githubUrl,
        liveDemoUrl: projectForm.liveDemoUrl,
        featured: projectForm.featured,
      });
      showToast(`Updated project "${projectForm.title}" successfully!`);
      setEditingProjectId(null);
    } else {
      addProject({
        title: projectForm.title,
        category: projectForm.category,
        shortDescription: projectForm.shortDescription,
        problemStatement: projectForm.problemStatement,
        solutionArchitecture: projectForm.solutionArchitecture,
        keyAchievements:
          achievementsArray.length > 0
            ? achievementsArray
            : ["Engineered innovative computational architecture."],
        metrics:
          metricsArray.length > 0
            ? metricsArray
            : [{ label: "Efficiency", value: "+30%" }],
        techStack: techArray.length > 0 ? techArray : ["React", "Node.js"],
        image: projectForm.image || "/images/razorpulse.jpg",
        githubUrl: projectForm.githubUrl,
        liveDemoUrl: projectForm.liveDemoUrl,
        featured: projectForm.featured,
      });
      showToast(`Created project "${projectForm.title}"!`);
    }

    // Reset Form
    setProjectForm({
      title: "",
      category: "Full-Stack",
      shortDescription: "",
      problemStatement: "",
      solutionArchitecture: "",
      keyAchievements: "",
      metricsStr: "Latency: < 150ms, Accuracy: 98%",
      techStack: "React.js, Node.js, Express.js, Python",
      image: "/images/razorpulse.jpg",
      githubUrl: "https://github.com/Tejaswini2416/razorpulse_agent",
      liveDemoUrl: "https://razorpulse.vercel.app",
      featured: true,
    });
  };

  // ---------------- CERTIFICATION HANDLERS ----------------
  const handleEditCertClick = (c: CertificationItem) => {
    setEditingCertId(c.id);
    setCertForm({
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      badgeType: c.badgeType,
      description: c.description,
      skills: c.skills.join(", "),
      credentialUrl: c.credentialUrl || "",
      pdfUrl: c.pdfUrl || "",
      verified: c.verified,
    });
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!certForm.title.trim() || !certForm.issuer.trim()) {
      alert("Please provide at least a certificate title and issuing body.");
      return;
    }

    const skillsArray = certForm.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingCertId) {
      updateCertification(editingCertId, {
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        badgeType: certForm.badgeType,
        description: certForm.description,
        skills: skillsArray,
        credentialUrl: certForm.credentialUrl || undefined,
        pdfUrl: certForm.pdfUrl || undefined,
        verified: certForm.verified,
      });
      showToast(`Updated certification "${certForm.title}"!`);
      setEditingCertId(null);
    } else {
      addCertification({
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        badgeType: certForm.badgeType,
        description: certForm.description,
        skills: skillsArray,
        credentialUrl: certForm.credentialUrl || undefined,
        pdfUrl: certForm.pdfUrl || undefined,
        verified: certForm.verified,
      });
      showToast(`Created certification "${certForm.title}"!`);
    }

    setCertForm({
      title: "",
      issuer: "Amazon Web Services (AWS)",
      date: "2024",
      badgeType: "Cloud Architecture",
      description: "",
      skills: "Cloud Architecture, AWS, IAM, S3",
      credentialUrl: "https://www.credly.com",
      pdfUrl: "/certifications/aws_cloud_foundations.pdf",
      verified: true,
    });
  };

  // ---------------- VOLUNTEER HANDLERS ----------------
  const handleEditVolunteerClick = (v: VolunteerExperience) => {
    setEditingVolunteerId(v.id);
    setVolunteerForm({
      role: v.role,
      organization: v.organization,
      period: v.period,
      location: v.location,
      description: v.description,
      highlights: v.highlights.join("\n"),
      skills: v.skills.join(", "),
    });
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!volunteerForm.role.trim() || !volunteerForm.organization.trim()) {
      alert("Please provide at least a volunteer role title and organization.");
      return;
    }

    const highlightsArray = volunteerForm.highlights
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const skillsArray = volunteerForm.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingVolunteerId) {
      updateVolunteerExperience(editingVolunteerId, {
        role: volunteerForm.role,
        organization: volunteerForm.organization,
        period: volunteerForm.period,
        location: volunteerForm.location,
        description: volunteerForm.description,
        highlights: highlightsArray,
        skills: skillsArray,
      });
      showToast(`Updated volunteer role "${volunteerForm.role}"!`);
      setEditingVolunteerId(null);
    } else {
      addVolunteerExperience({
        role: volunteerForm.role,
        organization: volunteerForm.organization,
        period: volunteerForm.period,
        location: volunteerForm.location,
        description: volunteerForm.description,
        highlights: highlightsArray,
        skills: skillsArray,
        images: [],
      });
      showToast(`Added volunteer role "${volunteerForm.role}"!`);
    }

    setVolunteerForm({
      role: "",
      organization: "",
      period: "Sept 2026",
      location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
      description: "",
      highlights: "",
      skills: "Technical Leadership, Mentorship, Google Crowdsource",
    });
  };

  const handleAddVolunteerPhoto = (volId: string) => {
    if (!newVolImageForm.url.trim()) {
      alert("Please enter a valid image URL.");
      return;
    }
    const newImg: VolunteerImage = {
      url: newVolImageForm.url.trim(),
      caption: newVolImageForm.caption.trim() || "Event Photo",
      category: newVolImageForm.category.trim() || "Gallery",
    };
    addVolunteerImage(volId, newImg);
    showToast("Added photo to volunteer gallery!");
    setNewVolImageForm({
      url: "/images/volunteer/crowdbridge_lead.jpeg",
      caption: "",
      category: "CrowdBridge",
    });
  };

  // ---------------- ACHIEVEMENTS HANDLERS ----------------
  const handleEditAchievementClick = (a: AchievementItem) => {
    setEditingAchId(a.id);
    setAchForm({
      title: a.title,
      organization: a.organization,
      year: a.year,
      type: a.type,
      description: a.description,
    });
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  const handleAchievementSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!achForm.title.trim()) {
      alert("Please provide an achievement title.");
      return;
    }

    if (editingAchId) {
      updateAchievement(editingAchId, {
        title: achForm.title,
        organization: achForm.organization,
        year: achForm.year,
        type: achForm.type,
        description: achForm.description,
      });
      showToast(`Updated achievement "${achForm.title}"!`);
      setEditingAchId(null);
    } else {
      addAchievement({
        title: achForm.title,
        organization: achForm.organization,
        year: achForm.year,
        type: achForm.type,
        description: achForm.description,
      });
      showToast(`Added achievement "${achForm.title}"!`);
    }

    setAchForm({
      title: "",
      organization: "SIH Internal College Hackathon",
      year: "2026",
      type: "Hackathon",
      description: "",
    });
  };

  // ---------------- PROFILE HANDLER ----------------
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    updatePersonalInfo({
      name: profileForm.name,
      headline: profileForm.headline,
      subheadline: profileForm.subheadline,
      tagline: profileForm.tagline,
      bio: profileForm.bio,
      email: profileForm.email,
      phone: profileForm.phone,
      location: profileForm.location,
      avatar: profileForm.avatar,
      github: profileForm.github,
      linkedin: profileForm.linkedin,
      stats: {
        cgpa: profileForm.cgpa,
        gateRank: profileForm.gateRank,
        projectsCompleted: profileForm.projectsCompleted,
        certificationsCount: profileForm.certificationsCount,
      },
    });
    showToast("Profile & candidate information updated successfully!");
  };

  // ----------------------------------------------------
  // Unauthenticated View: Security Lock Gate
  // ----------------------------------------------------
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 sm:py-24 space-y-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-[#0b0f19]/95 shadow-[0_0_50px_rgba(0,242,254,0.15)] space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
              <FiLock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                Restricted System Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Admin Authentication Gate
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Administrative permissions, site-wide content management, and portfolio project modifications are strictly restricted.
            </p>
          </div>

          {authError && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2"
            >
              <FiAlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{authError}</span>
            </motion.div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-300 flex items-center justify-between">
                <span>Enter Admin Passcode</span>
                <span className="text-[10px] text-zinc-500">Security Encrypted</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(null);
                  }}
                  placeholder="Enter administrator passcode..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl glass-input text-sm text-white placeholder:text-zinc-600 focus:border-cyan-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Toggle Passcode Visibility"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full neon-glow-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              id="admin-auth-submit"
            >
              <FiKey className="w-4 h-4" />
              <span>Unlock Admin Controls</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Authenticated View: Full Site-Wide Admin CMS Dashboard
  // ----------------------------------------------------
  const volunteerList = data.volunteer || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <Link
            href="/"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 mb-2"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Site-Wide Admin Content Manager
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <FiShield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Verified</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
            Full editing access across all portfolio pages: modify projects, certifications, volunteer experiences, achievements, photos, links, and credentials.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/50 transition-all"
            title="Download complete JSON backup"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>

          {hasCustomEdits && (
            <button
              onClick={() => {
                if (confirm("Reset all customizations back to factory defaults?")) {
                  resetToDefaults();
                  showToast("Portfolio data restored to defaults.");
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-rose-400 bg-rose-950/30 border border-rose-500/30 hover:bg-rose-900/40 transition-all"
            >
              <FiRotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={() => {
              logoutAdmin();
              showToast("Admin logged out.");
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40 transition-all"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Success Notice Toast */}
      {saveSuccessNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-mono flex items-center gap-2 shadow-lg"
        >
          <FiCheckCircle className="w-4 h-4 flex-shrink-0" />
          <span>{saveSuccessNotice}</span>
        </motion.div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.08] pb-3">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "projects"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md shadow-cyan-500/10"
              : "text-zinc-400 hover:text-white bg-white/[0.02]"
          }`}
        >
          <FiFolder className="w-4 h-4" />
          <span>Projects ({data.projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certifications")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "certifications"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md shadow-cyan-500/10"
              : "text-zinc-400 hover:text-white bg-white/[0.02]"
          }`}
        >
          <FiAward className="w-4 h-4" />
          <span>Certifications & PDFs ({data.certifications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("volunteer")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "volunteer"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md shadow-cyan-500/10"
              : "text-zinc-400 hover:text-white bg-white/[0.02]"
          }`}
        >
          <FiUsers className="w-4 h-4" />
          <span>Volunteer & Leadership ({volunteerList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("achievements")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "achievements"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md shadow-cyan-500/10"
              : "text-zinc-400 hover:text-white bg-white/[0.02]"
          }`}
        >
          <FiCheckCircle className="w-4 h-4" />
          <span>Achievements ({data.achievements.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "profile"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-md shadow-cyan-500/10"
              : "text-zinc-400 hover:text-white bg-white/[0.02]"
          }`}
        >
          <FiUser className="w-4 h-4" />
          <span>Profile & Links</span>
        </button>
      </div>

      {/* ========================================================
          1. PROJECTS MANAGEMENT TAB
          ======================================================== */}
      {activeTab === "projects" && (
        <div className="space-y-8">
          {/* Active Projects Grid */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0d1322]/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiFolder className="w-5 h-5 text-cyan-400" />
                <span>Active Projects Catalog ({data.projects.length})</span>
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                Click Edit to adjust URLs, image, or metrics
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    editingProjectId === proj.id
                      ? "bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="text-[10px] font-mono text-indigo-300">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>

                    <div className="space-y-1 text-[11px] font-mono text-zinc-400 border-t border-white/[0.06] pt-2">
                      <div className="truncate text-cyan-400">
                        <strong>Demo:</strong> {proj.liveDemoUrl || "None"}
                      </div>
                      <div className="truncate text-zinc-400">
                        <strong>GitHub:</strong> {proj.githubUrl}
                      </div>
                      <div className="truncate text-zinc-500">
                        <strong>Image:</strong> {proj.image}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleEditProjectClick(proj)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <FiEdit3 className="w-3.5 h-3.5" />
                      <span>Edit Project</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${proj.title}"?`)) {
                          deleteProject(proj.id);
                          showToast(`Removed "${proj.title}".`);
                        }
                      }}
                      className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit Project Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0d1322]/90 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FiPlus className="w-5 h-5 text-cyan-400" />
                <span>
                  {editingProjectId ? "Edit Project Details" : "Add New Project"}
                </span>
              </h2>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setProjectForm({
                      title: "",
                      category: "Full-Stack",
                      shortDescription: "",
                      problemStatement: "",
                      solutionArchitecture: "",
                      keyAchievements: "",
                      metricsStr: "Latency: < 150ms, Accuracy: 98%",
                      techStack: "React.js, Node.js, Express.js, Python",
                      image: "/images/razorpulse.jpg",
                      githubUrl: "https://github.com/Tejaswini2416/razorpulse_agent",
                      liveDemoUrl: "https://razorpulse.vercel.app",
                      featured: true,
                    });
                  }}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <FiX className="w-3.5 h-3.5" />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Project Title</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, title: e.target.value })
                    }
                    placeholder="e.g. Aira — Personalized Multi-Provider AI Chatbot"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e: any) =>
                      setProjectForm({ ...projectForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs bg-[#0b0f19]"
                  >
                    <option value="Full-Stack">Full-Stack</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Python & Data Science">Python & Data Science</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.shortDescription}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, shortDescription: e.target.value })
                  }
                  placeholder="Engineered a resilient, multi-LLM orchestration engine supporting Groq, OpenAI, Gemini..."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Problem Statement</label>
                  <textarea
                    rows={3}
                    value={projectForm.problemStatement}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, problemStatement: e.target.value })
                    }
                    placeholder="Describe operational bottlenecks or multi-model routing hurdles..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Solution Architecture</label>
                  <textarea
                    rows={3}
                    value={projectForm.solutionArchitecture}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        solutionArchitecture: e.target.value,
                      })
                    }
                    placeholder="High-throughput SSE streaming pipeline, token-by-token rendering, PostgreSQL session memory..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Key Achievements (one per line)
                </label>
                <textarea
                  rows={4}
                  value={projectForm.keyAchievements}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, keyAchievements: e.target.value })
                  }
                  placeholder="Multi-Provider AI Architecture: Engineered resilient multi-LLM orchestration...&#10;Real-Time Streaming & Interaction: Built high-throughput SSE pipeline...&#10;Long-Term Context Memory: Persistent PostgreSQL and Prisma memory..."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Metrics (comma-separated Label: Value)
                  </label>
                  <input
                    type="text"
                    value={projectForm.metricsStr}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, metricsStr: e.target.value })
                    }
                    placeholder="Latency: < 120ms, Memory Hits: 99.4%, Providers: 4"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Tech Stack (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.techStack}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, techStack: e.target.value })
                    }
                    placeholder="React 18, TypeScript, Node.js, Express, PostgreSQL, Prisma, Vite, Tailwind CSS"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300">Image URL</label>
                <input
                  type="text"
                  value={projectForm.image}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, image: e.target.value })
                  }
                  placeholder="/images/aira_chatbot.png"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-zinc-500">Quick Pick:</span>
                  {AVAILABLE_IMAGES.map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => setProjectForm({ ...projectForm, image: img.path })}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-cyan-950/60 hover:text-cyan-300 border border-white/10 transition-colors"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/Tejaswini2416/aira_chatbot"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Live Demo URL</label>
                  <input
                    type="text"
                    value={projectForm.liveDemoUrl}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, liveDemoUrl: e.target.value })
                    }
                    placeholder="https://aira-chatbot.vercel.app/"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={projectForm.featured}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, featured: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-mono text-zinc-300 cursor-pointer">
                  Feature this project on the homepage
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-md shadow-cyan-500/20"
                >
                  {editingProjectId ? "Save Project Changes" : "Create New Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          2. CERTIFICATIONS & PDFS TAB
          ======================================================== */}
      {activeTab === "certifications" && (
        <div className="space-y-8">
          {/* Active Certifications Catalog */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0d1322]/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiAward className="w-5 h-5 text-cyan-400" />
                <span>Certifications & PDF Documents ({data.certifications.length})</span>
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                Manage credentials and linked PDF certificates
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    editingCertId === cert.id
                      ? "bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                        {cert.badgeType}
                      </span>
                      {cert.verified && (
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <FiCheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-1">
                      {cert.title}
                    </h3>
                    <div className="text-[11px] font-mono text-cyan-400">
                      {cert.issuer} • {cert.date}
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>

                    {cert.pdfUrl && (
                      <div className="text-[10px] font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded flex items-center justify-between">
                        <span className="truncate">PDF: {cert.pdfUrl}</span>
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white ml-1 flex-shrink-0"
                          title="Open PDF"
                        >
                          <FiExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleEditCertClick(cert)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <FiEdit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete certification "${cert.title}"?`)) {
                          deleteCertification(cert.id);
                          showToast(`Deleted certification "${cert.title}".`);
                        }
                      }}
                      className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit Certification Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0d1322]/90 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FiPlus className="w-5 h-5 text-cyan-400" />
                <span>
                  {editingCertId ? "Edit Certification Details" : "Add New Certification"}
                </span>
              </h2>
              {editingCertId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingCertId(null);
                    setCertForm({
                      title: "",
                      issuer: "Amazon Web Services (AWS)",
                      date: "2024",
                      badgeType: "Cloud Architecture",
                      description: "",
                      skills: "Cloud Architecture, AWS, IAM, S3",
                      credentialUrl: "https://www.credly.com",
                      pdfUrl: "/certifications/aws_cloud_foundations.pdf",
                      verified: true,
                    });
                  }}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <FiX className="w-3.5 h-3.5" />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleCertSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Certificate Title</label>
                  <input
                    type="text"
                    required
                    value={certForm.title}
                    onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                    placeholder="AWS Academy Graduate — Cloud Foundations"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Issuing Body / Authority</label>
                  <input
                    type="text"
                    required
                    value={certForm.issuer}
                    onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                    placeholder="Amazon Web Services (AWS), Infosys Springboard, HackerRank"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Badge / Specialization Type</label>
                  <input
                    type="text"
                    value={certForm.badgeType}
                    onChange={(e) => setCertForm({ ...certForm, badgeType: e.target.value })}
                    placeholder="Cloud Architecture, Data Engineering, System Administrator"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Issue Date / Year</label>
                  <input
                    type="text"
                    value={certForm.date}
                    onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                    placeholder="Aug 2026 or 2024"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Description</label>
                <textarea
                  rows={2}
                  value={certForm.description}
                  onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                  placeholder="Comprehensive training in AWS Cloud fundamentals, VPC, IAM, EC2, S3, RDS..."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={certForm.skills}
                  onChange={(e) => setCertForm({ ...certForm, skills: e.target.value })}
                  placeholder="Cloud Architecture, AWS IAM, S3, Cloud Security"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-300">PDF Certificate Path</label>
                <input
                  type="text"
                  value={certForm.pdfUrl}
                  onChange={(e) => setCertForm({ ...certForm, pdfUrl: e.target.value })}
                  placeholder="/certifications/aws_cloud_foundations.pdf"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-zinc-500">Pick Uploaded PDF:</span>
                  {AVAILABLE_PDFS.map((pdf) => (
                    <button
                      key={pdf.path}
                      type="button"
                      onClick={() => setCertForm({ ...certForm, pdfUrl: pdf.path })}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-cyan-950/60 hover:text-cyan-300 border border-white/10 transition-colors"
                    >
                      {pdf.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Credential Verification Link</label>
                  <input
                    type="text"
                    value={certForm.credentialUrl}
                    onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                    placeholder="https://www.credly.com/..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="cert-verified-check"
                    checked={certForm.verified}
                    onChange={(e) => setCertForm({ ...certForm, verified: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400"
                  />
                  <label htmlFor="cert-verified-check" className="text-xs font-mono text-zinc-300 cursor-pointer">
                    Display Verified Accreditation Badge
                  </label>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-md shadow-cyan-500/20"
                >
                  {editingCertId ? "Save Certification" : "Create Certification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          3. VOLUNTEER & LEADERSHIP TAB
          ======================================================== */}
      {activeTab === "volunteer" && (
        <div className="space-y-8">
          {/* Active Volunteer Catalog */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0d1322]/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiUsers className="w-5 h-5 text-cyan-400" />
                <span>Volunteer & Leadership Catalog ({volunteerList.length})</span>
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                Google Crowdsource, Buildathon 2k26 & event galleries
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {volunteerList.map((vol) => (
                <div
                  key={vol.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    editingVolunteerId === vol.id
                      ? "bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        {vol.organization}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                        {vol.period}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">
                      {vol.role}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {vol.description}
                    </p>

                    {vol.highlights && vol.highlights.length > 0 && (
                      <ul className="text-xs text-zinc-300 space-y-1">
                        {vol.highlights.slice(0, 2).map((h, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <FiCheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Attached Photos */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span>Attached Photos ({vol.images ? vol.images.length : 0}):</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(vol.images || []).map((img, iIdx) => (
                          <div
                            key={iIdx}
                            className="relative group w-16 h-12 rounded-lg overflow-hidden border border-white/10"
                          >
                            <Image
                              src={img.url}
                              alt={img.caption || "Volunteer"}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm("Remove this photo from role?")) {
                                  deleteVolunteerImage(vol.id, img.url);
                                  showToast("Photo removed from role.");
                                }
                              }}
                              className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-rose-300 transition-opacity"
                              title="Delete photo"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleEditVolunteerClick(vol)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <FiEdit3 className="w-3.5 h-3.5" />
                      <span>Edit Role</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete volunteer entry "${vol.role}"?`)) {
                          deleteVolunteerExperience(vol.id);
                          showToast(`Deleted "${vol.role}".`);
                        }
                      }}
                      className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit Volunteer Experience Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0d1322]/90 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FiPlus className="w-5 h-5 text-cyan-400" />
                <span>
                  {editingVolunteerId ? "Edit Volunteer Role" : "Add New Volunteer Role"}
                </span>
              </h2>
              {editingVolunteerId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingVolunteerId(null);
                    setVolunteerForm({
                      role: "",
                      organization: "",
                      period: "Sept 2026",
                      location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
                      description: "",
                      highlights: "",
                      skills: "Technical Leadership, Mentorship, Google Crowdsource",
                    });
                  }}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <FiX className="w-3.5 h-3.5" />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Role Title</label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.role}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, role: e.target.value })}
                    placeholder="Technical Lead — CrowdBridge"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Organization / Initiative</label>
                  <input
                    type="text"
                    required
                    value={volunteerForm.organization}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, organization: e.target.value })}
                    placeholder="Google Crowdsource, 24-Hour Hackathon"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Period / Dates</label>
                  <input
                    type="text"
                    value={volunteerForm.period}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, period: e.target.value })}
                    placeholder="Sept 2026 or Jan 2026"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Location</label>
                  <input
                    type="text"
                    value={volunteerForm.location}
                    onChange={(e) => setVolunteerForm({ ...volunteerForm, location: e.target.value })}
                    placeholder="Vignana Bharathi Institute of Technology (VBIT), Hyderabad"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Short Summary Description</label>
                <textarea
                  rows={2}
                  value={volunteerForm.description}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, description: e.target.value })}
                  placeholder="Led technical execution for the CrowdBridge initiative under Google Crowdsource..."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Key Highlights / Bullets (one per line)
                </label>
                <textarea
                  rows={4}
                  value={volunteerForm.highlights}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, highlights: e.target.value })}
                  placeholder="Led technical execution for the CrowdBridge initiative, guiding students to contribute quality dataset annotations for Google Crowdsource.&#10;Mentored attendees on open data contribution practices and machine learning data labeling workflows."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Skills & Tags (comma-separated)</label>
                <input
                  type="text"
                  value={volunteerForm.skills}
                  onChange={(e) => setVolunteerForm({ ...volunteerForm, skills: e.target.value })}
                  placeholder="Google Crowdsource, Technical Leadership, ML Data Labeling, Mentorship"
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-md shadow-cyan-500/20"
                >
                  {editingVolunteerId ? "Save Volunteer Role" : "Create Volunteer Role"}
                </button>
              </div>
            </form>

            {/* Quick Photo Upload & Attachment Section for Editing Role */}
            {editingVolunteerId && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FiImage className="w-4 h-4 text-cyan-400" />
                  <span>Attach Photo to &quot;{volunteerForm.role || "this role"}&quot;</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Photo URL</label>
                    <input
                      type="text"
                      value={newVolImageForm.url}
                      onChange={(e) => setNewVolImageForm({ ...newVolImageForm, url: e.target.value })}
                      placeholder="/images/volunteer/crowdbridge_lead.jpeg"
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Caption</label>
                    <input
                      type="text"
                      value={newVolImageForm.caption}
                      onChange={(e) => setNewVolImageForm({ ...newVolImageForm, caption: e.target.value })}
                      placeholder="e.g. Stage Keynote Presentation"
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-zinc-400">Tag / Category</label>
                    <input
                      type="text"
                      value={newVolImageForm.category}
                      onChange={(e) => setNewVolImageForm({ ...newVolImageForm, category: e.target.value })}
                      placeholder="CrowdBridge, Buildathon 2k26"
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-zinc-500">Quick Pick:</span>
                  {AVAILABLE_IMAGES.filter((img) => img.path.includes("volunteer")).map((img) => (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() =>
                        setNewVolImageForm({
                          ...newVolImageForm,
                          url: img.path,
                          caption: img.label,
                        })
                      }
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] hover:bg-cyan-950/60 hover:text-cyan-300 border border-white/10 transition-colors"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddVolunteerPhoto(editingVolunteerId)}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/70 transition-all flex items-center gap-1.5"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  <span>Add Photo to Role</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          4. ACHIEVEMENTS TAB (Includes SIH Internal College Top 20)
          ======================================================== */}
      {activeTab === "achievements" && (
        <div className="space-y-8">
          {/* Active Achievements Catalog */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0d1322]/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-cyan-400" />
                <span>Honors, Hackathons & Achievements ({data.achievements.length})</span>
              </h2>
              <span className="text-xs font-mono text-zinc-400">
                SIH Top 20 Hackathon, GATE 2026 & competitions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.achievements.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    editingAchId === ach.id
                      ? "bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400/50"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                        {ach.type}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {ach.year}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">
                      {ach.title}
                    </h3>

                    <div className="text-[11px] font-mono text-cyan-400">
                      {ach.organization}
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleEditAchievementClick(ach)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <FiEdit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete achievement "${ach.title}"?`)) {
                          deleteAchievement(ach.id);
                          showToast(`Deleted "${ach.title}".`);
                        }
                      }}
                      className="text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add / Edit Achievement Form */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0d1322]/90 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FiPlus className="w-5 h-5 text-cyan-400" />
                <span>
                  {editingAchId ? "Edit Achievement Details" : "Add New Achievement"}
                </span>
              </h2>
              {editingAchId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAchId(null);
                    setAchForm({
                      title: "",
                      organization: "SIH Internal College Hackathon",
                      year: "2026",
                      type: "Hackathon",
                      description: "",
                    });
                  }}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <FiX className="w-3.5 h-3.5" />
                  <span>Cancel Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleAchievementSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Achievement Title</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  placeholder="Smart India Hackathon (SIH) — Top 20 Finalist Team"
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Host Organization / Context</label>
                  <input
                    type="text"
                    required
                    value={achForm.organization}
                    onChange={(e) => setAchForm({ ...achForm, organization: e.target.value })}
                    placeholder="SIH Internal College Hackathon • VBIT"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Year / Date</label>
                  <input
                    type="text"
                    value={achForm.year}
                    onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Achievement Type</label>
                  <select
                    value={achForm.type}
                    onChange={(e: any) => setAchForm({ ...achForm, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl glass-input text-xs bg-[#0b0f19]"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Competition">Competition</option>
                    <option value="Exam">Exam / National Qualification</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Description & Impact</label>
                <textarea
                  rows={3}
                  value={achForm.description}
                  onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                  placeholder="Selected among top 20 finalist teams out of 200+ competing engineering teams in SIH internal college hackathon round..."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-md shadow-cyan-500/20"
                >
                  {editingAchId ? "Save Achievement" : "Add Achievement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          5. PROFILE, LINKS & METRICS TAB
          ======================================================== */}
      {activeTab === "profile" && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0d1322]/90 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <FiUser className="w-5 h-5 text-cyan-400" />
              <span>Candidate Bio, Contact Details & Metric Scores</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Update personal links, contact information, CGPA, GATE rank, and executive summary.
            </p>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Avatar Image Path</label>
                <input
                  type="text"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  placeholder="/images/tej.jpeg"
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Hero Headline</label>
                <input
                  type="text"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Subheadline (Professional Title)</label>
                <input
                  type="text"
                  value={profileForm.subheadline}
                  onChange={(e) => setProfileForm({ ...profileForm, subheadline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300">Homepage Quick Tagline</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300">
                Executive Bio (Publication-Grade Summary)
              </label>
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Contact Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Location</label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">GitHub Profile Link</label>
                <input
                  type="text"
                  value={profileForm.github}
                  onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">LinkedIn Profile Link</label>
                <input
                  type="text"
                  value={profileForm.linkedin}
                  onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">B.Tech CGPA</label>
                <input
                  type="text"
                  value={profileForm.cgpa}
                  onChange={(e) => setProfileForm({ ...profileForm, cgpa: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">GATE Rank</label>
                <input
                  type="text"
                  value={profileForm.gateRank}
                  onChange={(e) => setProfileForm({ ...profileForm, gateRank: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Projects Count</label>
                <input
                  type="text"
                  value={profileForm.projectsCompleted}
                  onChange={(e) => setProfileForm({ ...profileForm, projectsCompleted: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Certs Count</label>
                <input
                  type="text"
                  value={profileForm.certificationsCount}
                  onChange={(e) => setProfileForm({ ...profileForm, certificationsCount: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-md shadow-cyan-500/20"
              >
                Update Profile Information
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
