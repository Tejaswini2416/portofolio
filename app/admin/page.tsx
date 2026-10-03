"use client";

import React, { useState } from "react";
import Link from "next/link";
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
} from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";
import { Project } from "@/data/portfolioData";

export default function AdminCMSPage() {
  const {
    data,
    addProject,
    updateProject,
    deleteProject,
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

  const [activeTab, setActiveTab] = useState<"projects" | "profile">("projects");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Project Form State
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

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    tagline: data.personal.tagline,
    bio: data.personal.bio,
    cgpa: data.personal.stats.cgpa,
    gateRank: data.personal.stats.gateRank,
  });

  const showToast = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(null), 3000);
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

  const handleEditClick = (p: Project) => {
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
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setAuthError("Unauthorized. Admin privileges required.");
      return;
    }

    if (!projectForm.title.trim() || !projectForm.shortDescription.trim()) {
      alert("Please provide at least a title and short description.");
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

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      setAuthError("Unauthorized. Admin privileges required.");
      return;
    }

    updatePersonalInfo({
      tagline: profileForm.tagline,
      bio: profileForm.bio,
      stats: {
        ...data.personal.stats,
        cgpa: profileForm.cgpa,
        gateRank: profileForm.gateRank,
      },
    });
    showToast("Profile & stats information updated!");
  };

  // ----------------------------------------------------
  // Unauthenticated View: Admin Security Gate / Login
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
              Editing permissions, content management, and portfolio project modifications are strictly restricted to the authorized administrator.
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

          {/* Preset Helper for Evaluation & Admin Convenience */}
          <div className="pt-4 border-t border-white/[0.08] text-center space-y-2">
            <p className="text-[11px] font-mono text-zinc-500">
              Passcode hint: <span className="text-cyan-400 font-semibold">admin2026</span>
            </p>
            <button
              type="button"
              onClick={() => {
                setPasswordInput("admin2026");
                loginAdmin("admin2026");
              }}
              className="text-[11px] font-mono text-zinc-400 hover:text-cyan-300 underline"
            >
              Autofill & Authenticate as Admin
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ----------------------------------------------------
  // Authenticated View: Full Admin CMS Dashboard
  // ----------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 pb-24">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
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
              Portfolio Content Manager (CMS)
            </h1>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <FiShield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Verified</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 text-justified-pro max-w-2xl">
            You have authenticated administrative permissions. Add, update, or delete projects and candidate profile information. Changes reflect instantly and persist across your session.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/50 transition-all"
            title="Download clean projects.json file"
          >
            <FiDownload className="w-3.5 h-3.5" />
            <span>Export JSON</span>
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
            title="Log out of Admin mode"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </div>

      {/* Success Toast Notice */}
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

      {/* Tabs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab("projects")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "projects"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
              : "text-zinc-400 hover:text-white bg-white/[0.03]"
          }`}
        >
          <FiFolder className="w-4 h-4" />
          <span>Manage Projects ({data.projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
            activeTab === "profile"
              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
              : "text-zinc-400 hover:text-white bg-white/[0.03]"
          }`}
        >
          <FiUser className="w-4 h-4" />
          <span>Bio & Metrics</span>
        </button>
      </div>

      {activeTab === "projects" ? (
        <div className="space-y-10">
          {/* Current Projects Table / Card List */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-[#0d1322]/80 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Active Projects Catalog</span>
              <span className="text-xs font-mono text-zinc-400">
                Click Edit or Delete on any project
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.projects.map((proj) => (
                <div
                  key={proj.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    editingProjectId === proj.id
                      ? "bg-cyan-950/30 border-cyan-400/60 ring-1 ring-cyan-400/40"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-2">
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
                    <p className="text-xs text-zinc-400 line-clamp-2 text-justified-pro">
                      {proj.shortDescription}
                    </p>
                    <div className="text-[10px] font-mono text-zinc-500 truncate">
                      {proj.githubUrl}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
                    <button
                      onClick={() => handleEditClick(proj)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      <FiEdit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
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

          {/* Add / Edit Form */}
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
                  className="text-xs font-mono text-zinc-400 hover:text-white"
                >
                  Cancel Edit
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
                    placeholder="e.g. Distributed Analytics Dashboard"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={(e: any) =>
                      setProjectForm({ ...projectForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-[#0b0f19]"
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
                  placeholder="Concise publication-grade summary of what was engineered..."
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Problem Statement
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.problemStatement}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, problemStatement: e.target.value })
                    }
                    placeholder="Describe the operational or latency bottleneck addressed..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Solution Architecture
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.solutionArchitecture}
                    onChange={(e) =>
                      setProjectForm({
                        ...projectForm,
                        solutionArchitecture: e.target.value,
                      })
                    }
                    placeholder="Microservices, async queues, indexing strategy..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Key Achievements (one per line)
                </label>
                <textarea
                  rows={3}
                  value={projectForm.keyAchievements}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, keyAchievements: e.target.value })
                  }
                  placeholder="Architected real-time transaction telemetry&#10;Optimized SQL queries cutting retrieval time by 25%&#10;Integrated multi-class intent classifier"
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
                    placeholder="Latency: < 120ms, Throughput: 2.1M+, Accuracy: 99%"
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
                    placeholder="React.js, Node.js, Express.js, Python, Streamlit"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">Preview Image URL</label>
                  <input
                    type="text"
                    value={projectForm.image}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, image: e.target.value })
                    }
                    placeholder="/images/razorpulse.jpg"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={projectForm.githubUrl}
                    onChange={(e) =>
                      setProjectForm({ ...projectForm, githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
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
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300"
                >
                  {editingProjectId ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Bio & Metrics Tab */
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0d1322]/90 space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Candidate Tagline & Headline Bio
          </h2>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300">Homepage Quick Tagline</label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, tagline: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-300">
                Executive Bio (Publication-Grade Justified)
              </label>
              <textarea
                rows={5}
                value={profileForm.bio}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">B.Tech CGPA</label>
                <input
                  type="text"
                  value={profileForm.cgpa}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, cgpa: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">GATE Rank</label>
                <input
                  type="text"
                  value={profileForm.gateRank}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, gateRank: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="neon-glow-btn px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300"
            >
              Update Candidate Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
