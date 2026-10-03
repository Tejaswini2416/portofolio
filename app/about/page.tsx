"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiDownload, FiMail, FiCheck, FiMapPin, FiCompass, FiCode } from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";
import EducationTimeline from "@/components/EducationTimeline";

export default function AboutPage() {
  const { data } = usePortfolio();
  const { personal, education, achievements } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20 pb-20">
      {/* 1. Header & Executive Bio Section */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <FiCompass className="w-3.5 h-3.5" />
            <span>Candidate Profile & Background</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About & Academic Journey
          </h1>
          <p className="text-sm sm:text-base text-zinc-400">
            A closer look at my engineering principles, academic milestones, and technical mindset.
          </p>
        </div>

        {/* Bio Card with Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-[#0c1222]/90 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait with Glowing Gradient Frame */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-1.5 rounded-3xl group">
                <div className="absolute -inset-1 rounded-3xl animated-gradient-ring opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="relative w-56 sm:w-64 h-56 sm:h-64 rounded-3xl overflow-hidden bg-[#070b14] border border-white/20">
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 220px, 260px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Bio Content (Justified Text) */}
            <div className="lg:col-span-8 space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                  Engineering Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Bridging Intelligent Algorithms & High-Reliability Systems
                </h2>
              </div>

              <div className="space-y-3 text-zinc-300 text-sm sm:text-base text-justified-pro leading-relaxed">
                <p>
                  I am a Computer Science & Engineering graduate driven by an analytical mindset, a passion for high-performance software, and a dedication to solving real-world challenges with scalable code. With an academic background maintaining an 8.77 CGPA and an All India Rank of 10,000 in GATE 2026 for Data Science & AI, I combine deep theoretical foundations with practical engineering rigor.
                </p>
                <p>
                  My focus centers on constructing resilient full-stack systems and data pipelines — ranging from the <strong>RazorPulse</strong> transaction monitoring platform handling sub-second metrics to Python/Pandas anomaly detection architectures that cut data retrieval latency by 25%. I thrive on crafting intuitive user experiences underpinned by rock-solid backend microservices.
                </p>
                <p>
                  As a ServiceNow Certified System Administrator (CSA) with virtual simulation credentials from Deloitte Australia and JPMorgan Chase, I hold a deep appreciation for enterprise standards, automated workflows, and DevOps velocity.
                </p>
              </div>

              {/* Quick Info Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-zinc-300">
                  <FiMapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Telangana, India</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-zinc-300">
                  <FiCode className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Full-Stack & AI/ML</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-2 text-zinc-300 col-span-2 sm:col-span-1">
                  <FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Open to Relocate</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="neon-glow-btn px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider text-cyan-300 uppercase"
                >
                  Initiate Discussion
                </Link>
                <a
                  href="/Tejaswini_Kummari_Resume.pdf"
                  download="Tejaswini_Kummari_Resume.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase tracking-wider"
                >
                  <FiDownload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download Resume</span>
                </a>
                <Link
                  href="/projects"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors uppercase tracking-wider"
                >
                  Inspect Projects
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Education Timeline Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
            Chronological Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Academic Pedigree
          </h2>
          <p className="text-sm text-zinc-400 text-justified-pro leading-relaxed">
            Consistently recognized for scholastic distinction across university, intermediate, and secondary board examinations.
          </p>
        </div>

        <EducationTimeline education={education} achievements={achievements} />
      </section>
    </div>
  );
}
