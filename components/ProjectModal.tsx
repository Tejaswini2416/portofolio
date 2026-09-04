"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiExternalLink, FiCheckCircle, FiCpu, FiTrendingUp } from "react-icons/fi";
import { Project } from "@/data/portfolioData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b0f19] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.2)] text-white p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/10"
            aria-label="Close Project Modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-6 pr-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 text-xs font-mono rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/40">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-3 py-0.5 text-xs font-mono rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-500/40">
                  Featured Innovation
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
          </div>

          {/* Media Mockup Container */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 border border-white/10 bg-black/50 group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent opacity-60" />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#111726]/80 border border-cyan-500/20 flex flex-col items-center justify-center text-center"
              >
                <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">
                  {metric.value}
                </span>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-6 text-zinc-300 text-sm">
            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold flex items-center gap-2">
                  <FiCpu className="w-3.5 h-3.5" />
                  Problem Statement
                </h4>
                <p className="text-justified-pro leading-relaxed text-zinc-300">
                  {project.problemStatement}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold flex items-center gap-2">
                  <FiTrendingUp className="w-3.5 h-3.5" />
                  Solution Architecture
                </h4>
                <p className="text-justified-pro leading-relaxed text-zinc-300">
                  {project.solutionArchitecture}
                </p>
              </div>
            </div>

            {/* Key Achievements */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                Key Engineering Achievements
              </h4>
              <ul className="space-y-2">
                {project.keyAchievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-zinc-300">
                    <FiCheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                Technologies & Tools Applied
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-lg bg-cyan-950/30 text-cyan-300 border border-cyan-500/20 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-glow-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-cyan-300 uppercase tracking-wider"
                >
                  <FiExternalLink className="w-4 h-4" />
                  Launch Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase tracking-wider"
                >
                  <FiGithub className="w-4 h-4" />
                  View GitHub Source
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
