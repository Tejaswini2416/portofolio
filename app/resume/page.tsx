"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiCheckCircle,
  FiExternalLink,
  FiAward,
  FiArrowLeft,
} from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";

export default function ResumePage() {
  const { data } = usePortfolio();
  const { personal, education, skills, projects, certifications, achievements } = data;


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 pb-24">
      {/* Action Header - Hidden during print */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel border border-white/10 bg-[#0c1222]/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono">
            <FiFileText className="w-4 h-4" />
            <span>Official Curriculum Vitae</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Tejaswini Kummari — Verified Resume
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/Tejaswini_Kummari_Resume.pdf"
            download="Tejaswini_Kummari_Resume.pdf"
            className="neon-glow-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider text-cyan-300 uppercase shadow-lg shadow-cyan-500/20"
            id="download-resume-btn"
          >
            <FiDownload className="w-4 h-4" />
            <span>Download PDF</span>
          </a>


          <Link
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            <span>Back Home</span>
          </Link>
        </div>
      </div>

      {/* Resume Document Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 space-y-8 print:p-0 print:border-none print:bg-white print:text-black"
        id="resume-document"
      >
        {/* Document Header */}
        <div className="border-b border-white/10 pb-6 print:border-black/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight print:text-black">
                {personal.name.toUpperCase()}
              </h2>
              <p className="text-sm sm:text-base font-medium text-cyan-400 font-mono mt-1 print:text-cyan-800">
                {personal.subheadline}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono w-fit print:border-black/20 print:bg-transparent print:text-black">
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>GATE 2026 Qualified (AIR 10,000)</span>
            </div>
          </div>

          {/* Quick Contact Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-4 text-xs font-mono text-zinc-300 print:text-black">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <FiMail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{personal.email}</span>
            </a>
            <a
              href={`tel:${personal.phone}`}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <FiPhone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{personal.phone}</span>
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors truncate"
            >
              <FiLinkedin className="w-3.5 h-3.5 text-cyan-400" />
              <span>linkedin.com/in/tejaswini-kummari...</span>
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <FiGithub className="w-3.5 h-3.5 text-cyan-400" />
              <span>github.com/Tejaswini2416</span>
            </a>
          </div>
        </div>

        {/* 1. Education Section */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-cyan-500/20 pb-1.5 flex items-center gap-2 print:text-black print:border-black">
            <span>01. Education & Academic Milestones</span>
          </h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <span className="font-bold text-white print:text-black">
                    {edu.degree}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 print:text-black font-semibold">
                    {edu.grade} • {edu.period}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 print:text-black">
                  {edu.institution}, {edu.location}
                </p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="list-disc list-inside text-xs text-zinc-300 print:text-black space-y-0.5 pt-1">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Key Engineering Projects */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-cyan-500/20 pb-1.5 flex items-center gap-2 print:text-black print:border-black">
            <span>02. Key Engineering Projects</span>
          </h3>
          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                  <span className="font-bold text-white print:text-black flex items-center gap-2">
                    {proj.title}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-cyan-400 print:text-black">
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <FiGithub className="w-3 h-3" />
                        <span>Source</span>
                      </a>
                    )}
                    {proj.liveDemoUrl && (
                      <a
                        href={proj.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <FiExternalLink className="w-3 h-3" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="text-xs text-zinc-400 font-mono print:text-black">
                  <span className="text-zinc-500">Tech Stack:</span> {proj.techStack.join(", ")}
                </div>

                <p className="text-xs text-zinc-300 print:text-black leading-relaxed">
                  {proj.shortDescription}
                </p>

                {proj.keyAchievements && (
                  <ul className="list-disc list-inside text-xs text-zinc-400 print:text-black space-y-0.5 pt-0.5">
                    {proj.keyAchievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Technical Skills */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-cyan-500/20 pb-1.5 flex items-center gap-2 print:text-black print:border-black">
            <span>03. Technical Skills & Tools</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 print:border-none print:p-0">
                <span className="font-bold text-white print:text-black block mb-1">
                  {skillGroup.category}:
                </span>
                <span className="text-zinc-400 print:text-black">
                  {skillGroup.items.map((it) => it.name).join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Certifications & Accreditations */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-cyan-500/20 pb-1.5 flex items-center gap-2 print:text-black print:border-black">
            <span>04. Professional Certifications & Simulations</span>
          </h3>
          <div className="space-y-2.5">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <div>
                  <span className="font-semibold text-white print:text-black">
                    {cert.title}
                  </span>
                  <span className="text-zinc-500 print:text-black"> — {cert.issuer}</span>
                </div>
                <span className="font-mono text-zinc-400 print:text-black flex-shrink-0">
                  {cert.date} ({cert.badgeType})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Honors & Achievements */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold border-b border-cyan-500/20 pb-1.5 flex items-center gap-2 print:text-black print:border-black">
            <span>05. Honors & Competitions</span>
          </h3>
          <div className="space-y-2">
            {achievements.map((ach) => (
              <div key={ach.id} className="text-xs space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white print:text-black">
                    {ach.title}
                  </span>
                  <span className="font-mono text-zinc-400 print:text-black">{ach.year}</span>
                </div>
                <p className="text-zinc-400 print:text-black">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
