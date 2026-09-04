"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiLayers, FiCheckCircle, FiSearch, FiCode, FiCpu, FiDatabase, FiServer, FiTerminal, FiTool } from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";
import SkillIcon from "@/components/SkillIcon";
import TiltCard from "@/components/TiltCard";

export default function SkillsPage() {
  const { data } = usePortfolio();
  const { skills } = data;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skills.map((s) => s.category)];

  const filteredSkills = skills
    .map((cat) => {
      const matchesCategory = selectedCategory === "All" || cat.category === selectedCategory;
      const filteredItems = cat.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...cat,
        items: matchesCategory ? filteredItems : [],
      };
    })
    .filter((cat) => cat.items.length > 0);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend Development":
        return <FiCode className="w-4 h-4 text-cyan-400" />;
      case "Backend & Frameworks":
        return <FiServer className="w-4 h-4 text-indigo-400" />;
      case "Databases & Data Management":
        return <FiDatabase className="w-4 h-4 text-teal-400" />;
      case "AI/ML & Data Science":
        return <FiCpu className="w-4 h-4 text-purple-400" />;
      case "Programming Languages & Core":
        return <FiTerminal className="w-4 h-4 text-amber-400" />;
      case "DevOps, Tools & Platforms":
        return <FiTool className="w-4 h-4 text-emerald-400" />;
      default:
        return <FiLayers className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <FiLayers className="w-3.5 h-3.5" />
          <span>Interactive Competency Matrix</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Technical Skills & Tooling
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto text-justified-pro leading-relaxed">
          Categorized taxonomy of engineering capabilities, software frameworks, algorithms, and industry-grade developer platforms verified through hands-on system builds.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-white/10 bg-[#0c1222]/80">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "text-zinc-400 hover:text-white bg-white/[0.03] border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search skill (e.g., Python)..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="space-y-10">
        {filteredSkills.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl border border-white/10 text-zinc-400 text-sm">
            No technical skills matching &quot;{searchTerm}&quot; found in category &quot;{selectedCategory}&quot;.
          </div>
        ) : (
          filteredSkills.map((categoryGroup, idx) => (
            <motion.div
              key={categoryGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0d1322]/80 space-y-6 shadow-xl"
            >
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {getCategoryIcon(categoryGroup.category)}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {categoryGroup.category}
                    </h2>
                    <p className="text-xs text-zinc-400 text-justified-pro mt-0.5">
                      {categoryGroup.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 self-start sm:self-auto">
                  {categoryGroup.items.length} Techs
                </span>
              </div>

              {/* Skills Card Grid with 3D Tilt */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryGroup.items.map((skill) => (
                  <TiltCard
                    key={skill.name}
                    glowColor="rgba(0, 242, 254, 0.25)"
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-500/40 transition-all flex flex-col items-center text-center space-y-2.5 group"
                  >
                    <div className="p-3 rounded-2xl bg-[#080d1a] border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all">
                      <SkillIcon name={skill.iconName} className="w-7 h-7 group-hover:scale-110 transition-transform" />
                    </div>

                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="inline-block text-[10px] font-mono text-zinc-400">
                        {skill.level}
                      </span>
                    </div>

                    <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden mt-1">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full"
                        style={{
                          width:
                            skill.level === "Advanced"
                              ? "92%"
                              : skill.level === "Proficient"
                              ? "85%"
                              : "78%",
                        }}
                      />
                    </div>
                  </TiltCard>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
