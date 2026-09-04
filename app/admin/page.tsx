"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
  } = usePortfolio();

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
    techStack: "React, Node.js, Express, Python",
    image: "/images/razorpulse.jpg",
    githubUrl: "https://github.com/Tejaswini2416",
    liveDemoUrl: "https://demo.vercel.app",
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
      techStack: "React, Node.js, Express, Python",
      image: "/images/razorpulse.jpg",
      githubUrl: "https://github.com/Tejaswini2416",
      liveDemoUrl: "https://demo.vercel.app",
      featured: true,
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Portfolio Content Manager (CMS)
            </h1>
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
              Live Client Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 text-justified-pro">
            Add, update, or delete projects without touching the codebase. Changes reflect instantly and persist in your browser. You can also export the structured JSON at any time.
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
            <span>Export projects.json</span>
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
              <span>Reset Defaults</span>
            </button>
          )}
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
                      techStack: "React, Node.js, Express, Python",
                      image: "/images/razorpulse.jpg",
                      githubUrl: "https://github.com/Tejaswini2416",
                      liveDemoUrl: "https://demo.vercel.app",
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
                    placeholder="React.js, Node.js, Express, Python, Pandas"
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
