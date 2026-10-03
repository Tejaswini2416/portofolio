"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiFolder, FiSearch, FiPlusCircle, FiSliders, FiLock, FiShield } from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/data/portfolioData";

export default function ProjectsPage() {
  const { data, isAdmin } = usePortfolio();
  const { projects } = data;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["All", "Full-Stack", "AI/ML", "Python & Data Science"];

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <FiFolder className="w-3.5 h-3.5" />
            <span>Engineering Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects & System Builds
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 text-justified-pro leading-relaxed">
            Exploration of production-ready web architectures, machine learning analysis engines, and low-latency NLP microservices. Each project card features full architectural telemetry and performance metrics.
          </p>
        </div>

        {/* CMS Quick Link */}
        <Link
          href="/admin"
          className={`self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all hover:scale-105 border ${
            isAdmin
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50"
              : "bg-cyan-950/40 border-cyan-500/30 text-cyan-300 hover:bg-cyan-900/40"
          }`}
          title={isAdmin ? "Manage projects in CMS (Admin Unlocked)" : "Admin Authentication Required to Edit"}
        >
          {isAdmin ? (
            <>
              <FiShield className="w-4 h-4 text-emerald-400" />
              <span>CMS (Admin Active)</span>
            </>
          ) : (
            <>
              <FiLock className="w-4 h-4 text-cyan-400" />
              <span>Admin CMS (Locked)</span>
            </>
          )}
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-[#0c1222]/80 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-mono text-zinc-500 mr-1 hidden sm:inline flex items-center gap-1">
            <FiSliders className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-white bg-white/[0.03] border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tech, title, or metric..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl border border-white/10 text-zinc-400 space-y-3">
          <p className="text-lg font-bold text-white">No projects found.</p>
          <p className="text-sm">
            Try adjusting your search query or select another category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="neon-glow-btn px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 uppercase mt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onSelect={(proj) => setActiveProject(proj)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Project Detailed View Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
