"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowRight,
  FiDownload,
  FiAward,
  FiLayers,
  FiCheckCircle,
  FiTrendingUp,
  FiStar,
} from "react-icons/fi";
import { SiPython, SiReact, SiPytorch } from "react-icons/si";
import { usePortfolio } from "@/context/PortfolioContext";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/data/portfolioData";
import SkillIcon from "@/components/SkillIcon";

export default function HomePage() {
  const { data } = usePortfolio();
  const { personal, achievements, projects } = data;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headings, Bio, CTAs, Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Available for 2026/2027 Engineering Roles</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I&apos;m{" "}
                <span className="gradient-text-cyan-indigo">Tejaswini Kummari</span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-cyan-200/90 tracking-wide font-mono">
                {personal.subheadline}
              </p>
            </div>

            {/* Quick Tagline */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-2xl">
              <p className="text-sm sm:text-base text-zinc-300 text-justified-pro leading-relaxed">
                {personal.tagline}{" "}
                <span className="text-zinc-400">
                  Engineering robust software platforms with data intelligence, sub-second telemetry dashboards, and cloud-native reliability.
                </span>
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/projects"
                className="neon-glow-btn flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold tracking-wider text-cyan-300 uppercase shadow-lg shadow-cyan-500/20"
              >
                <span>View Projects</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="/Tejaswini_Kummari_Resume.pdf"
                download="Tejaswini_Kummari_Resume.pdf"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all uppercase tracking-wider group"
                id="hero-download-resume"
                title="Download Tejaswini Kummari's Verified PDF Resume"
              >
                <FiDownload className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-indigo-300 hover:text-indigo-200 bg-indigo-950/40 hover:bg-indigo-900/50 border border-indigo-500/30 transition-all uppercase tracking-wider"
              >
                <FiMail className="w-4 h-4" />
                <span>Contact Me</span>
              </Link>
            </div>

            {/* Social Media Quick Links */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                Direct Channels:
              </span>
              <a
                href="https://github.com/Tejaswini2416"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0d1322] border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-md hover:scale-110"
                aria-label="GitHub Profile"
              >
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tejaswini-kummari-192425313/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-[#0d1322] border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-md hover:scale-110"
                aria-label="LinkedIn Profile"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:tejaswinikummari17@gmail.com"
                className="p-2.5 rounded-xl bg-[#0d1322] border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all shadow-md hover:scale-110"
                aria-label="Direct Email"
              >
                <FiMail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Headshot with Animated Gradient Ring & Floating Tech Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            {/* Ambient Background Glow */}
            <div className="absolute w-72 sm:w-80 h-72 sm:h-80 bg-cyan-500/20 rounded-full blur-3xl -z-10" />

            {/* Portrait Container with Animated Gradient Ring */}
            <div className="relative p-1.5 rounded-3xl group">
              {/* Rotating Border */}
              <div className="absolute -inset-1 rounded-3xl animated-gradient-ring opacity-80 blur-sm group-hover:opacity-100 transition-opacity" />

              {/* Inner Frame */}
              <div className="relative w-64 sm:w-72 h-64 sm:h-72 rounded-3xl overflow-hidden bg-[#0a0e1a] border border-white/20 shadow-2xl">
                <Image
                  src={personal.avatar}
                  alt={personal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 260px, 320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080e]/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Floating Tech Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-6 px-3 py-2 rounded-2xl bg-[#0c1222]/90 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-950/60 flex items-center gap-2"
              >
                <SiPython className="w-5 h-5 text-[#38bdf8]" />
                <span className="text-xs font-mono font-bold text-white">Python / Pandas</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-8 px-3 py-2 rounded-2xl bg-[#0c1222]/90 border border-indigo-500/40 backdrop-blur-md shadow-lg shadow-indigo-950/60 flex items-center gap-2"
              >
                <SiReact className="w-5 h-5 text-[#61dafb]" />
                <span className="text-xs font-mono font-bold text-white">React Full-Stack</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-2xl bg-[#0c1222]/90 border border-purple-500/40 backdrop-blur-md shadow-lg shadow-purple-950/60 flex items-center gap-2"
              >
                <SiPytorch className="w-5 h-5 text-[#f43f5e]" />
                <span className="text-xs font-mono font-bold text-white">AI/ML & NLP</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED HIGHLIGHTS STATS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: B.Tech CGPA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-cyan-500/20 bg-[#0d1322]/70 space-y-2 text-center sm:text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 mx-auto sm:mx-0">
              <FiAward className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              {personal.stats.cgpa}
            </div>
            <h4 className="text-sm font-bold text-white">B.Tech CGPA (CSE-DS)</h4>
            <p className="text-xs text-zinc-400 text-justified-pro">
              VBIT Hyderabad. Exemplary academic consistency in Data Structures, AI, and Systems.
            </p>
          </motion.div>

          {/* Card 2: GATE 2026 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-indigo-500/20 bg-[#0d1322]/70 space-y-2 text-center sm:text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 mx-auto sm:mx-0">
              <FiTrendingUp className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400">
              {personal.stats.gateRank}
            </div>
            <h4 className="text-sm font-bold text-white">GATE 2026 Qualified</h4>
            <p className="text-xs text-zinc-400 text-justified-pro">
              Data Science & AI stream. Validated mastery in linear algebra, machine learning, and probability.
            </p>
          </motion.div>

          {/* Card 3: Key Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-purple-500/20 bg-[#0d1322]/70 space-y-2 text-center sm:text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 mx-auto sm:mx-0">
              <FiLayers className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
              {personal.stats.certificationsCount}
            </div>
            <h4 className="text-sm font-bold text-white">Key Certifications</h4>
            <p className="text-xs text-zinc-400 text-justified-pro">
              ServiceNow CSA, Data Visualization, Forage Simulations & Modern Web Technologies.
            </p>
          </motion.div>

          {/* Card 4: Architecture & Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl border border-teal-500/20 bg-[#0d1322]/70 space-y-2 text-center sm:text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-3 mx-auto sm:mx-0">
              <FiCheckCircle className="w-5 h-5" />
            </div>
            <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-300">
              {personal.stats.projectsCompleted}
            </div>
            <h4 className="text-sm font-bold text-white">Full-Stack & ML Projects</h4>
            <p className="text-xs text-zinc-400 text-justified-pro">
              High-throughput streaming chatbots, data anomaly copilots, and computer vision systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <span>Featured Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Flagship Project Case Studies
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl text-justified-pro">
              Click any project card to open interactive architectural breakdowns, problem statements, and real-time telemetry metrics.
            </p>
          </div>

          <Link
            href="/projects"
            className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Explore All Projects</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. ACHIEVEMENTS & MILESTONES SHOWCASE */}
      <section id="achievements" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
                <span>Honors & Competitive Milestones</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Verified Achievements & Badges
              </h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-2xl text-justified-pro">
                National competitive standing, prestigious university leadership appointments, and hackathon finalist rankings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0d1322]/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{item.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono text-indigo-300 flex items-center gap-1.5">
                    <FiStar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.organization}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 text-justified-pro leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Metrics Stats Pills */}
                {item.stats && item.stats.length > 0 && (
                  <div className="pt-3 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {item.stats.map((st, sIdx) => (
                      <div key={sIdx} className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
                        <span className="text-[10px] font-mono text-zinc-500 block">{st.label}</span>
                        <span className="text-xs font-mono font-bold text-white block mt-0.5 truncate">
                          {st.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VOLUNTEER & COMMUNITY SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0d1322]/80 to-cyan-950/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(99,102,241,0.1)]">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <span>Google Crowdsource Community • VBIT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Technical Lead & Community Innovator
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl text-justified-pro leading-relaxed">
              Spearheaded flagship initiatives including CrowdBridge, mentored student developers in Build-a-thon 2k26, and advanced open-source AI data literacy for 500+ students across campus.
            </p>
          </div>
          <Link
            href="/volunteer"
            className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex-shrink-0"
          >
            Explore Volunteer Experience →
          </Link>
        </div>
      </section>

      {/* 6. SKILLS PREVIEW MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0a0f1c]/90">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase font-semibold">
              Core Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Engineered Across Full-Stack & Artificial Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 text-justified-pro mt-2 leading-relaxed">
              Equipped with deep practical expertise spanning relational SQL optimization, machine learning modeling with NumPy and Pandas, modern React frontend component trees, and enterprise automation with ServiceNow.
            </p>
          </div>

          {/* Icon highlights row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: "React.js", icon: "SiReact", label: "Frontend Architecture" },
              { name: "Python", icon: "SiPython", label: "Data Science & NLP" },
              { name: "Node.js", icon: "SiNodedotjs", label: "REST APIs" },
              { name: "Pandas", icon: "SiPandas", label: "Vectorized Analytics" },
              { name: "Java", icon: "SiOpenjdk", label: "OOP & DSA" },
              { name: "ServiceNow", icon: "SiServicenow", label: "CSA Certified" },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col items-center text-center space-y-2 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all group"
              >
                <SkillIcon name={s.icon} className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white">{s.name}</span>
                <span className="text-[10px] font-mono text-zinc-400">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">
              Want to see the comprehensive 6-category skills breakdown?
            </span>
            <Link
              href="/skills"
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              View Full Skills Matrix →
            </Link>
          </div>
        </div>
      </section>

      {/* 7. QUICK CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0e172a] to-[#070b14] relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to collaborate on innovative engineering?
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto text-justified-pro leading-relaxed">
              Whether you are hiring for AI/ML engineering, full-stack development, or exploring collaborative technical initiatives, let&apos;s connect.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="neon-glow-btn px-6 py-3 rounded-xl text-sm font-bold text-cyan-300 uppercase tracking-wider"
              >
                Send Direct Message
              </Link>
              <a
                href="mailto:tejaswinikummari17@gmail.com"
                className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase tracking-wider"
              >
                tejaswinikummari17@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
