"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Swords,
  Shield,
  ExternalLink,
  Zap,
  Flame,
  Star,
  Activity,
  Maximize2,
  X,
  Code2,
  Terminal,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { soundFX } from "@/lib/soundEffects";

interface ProjectRelic {
  id: string;
  title: string;
  codenamed: string;
  tier: "MYTHIC BOSS RELIC" | "LEGENDARY ENTERPRISE" | "ANCIENT TECH RELIC";
  tierColor: string;
  borderColor: string;
  glowColor: string;
  shortDescription: string;
  lore: string;
  stats: { label: string; value: string }[];
  techStack: string[];
  image: string;
  githubUrl: string;
  liveDemoUrl: string;
}

const PROJECT_RELICS: ProjectRelic[] = [
  {
    id: "aira-chatbot",
    title: "AIRA — Multi-Provider AI Chatbot",
    codenamed: "THE ADAPTIVE CORE",
    tier: "MYTHIC BOSS RELIC",
    tierColor: "text-amber-400 bg-amber-950/80 border-amber-500/50",
    borderColor: "border-amber-500/50 hover:border-amber-400",
    glowColor: "rgba(245, 158, 11, 0.3)",
    shortDescription:
      "Resilient multi-LLM orchestration engine supporting Groq, OpenAI, Gemini, and Claude with dynamic key detection, SSE token streaming, and cross-session facts memory.",
    lore: "Forged to eradicate single-provider AI fragility. Uses an adaptive dispatch queue with health checks, WebSocket/SSE token pipelining, and PostgreSQL/Prisma persistent memory.",
    stats: [
      { label: "Providers", value: "Groq, OpenAI, Gemini, Claude" },
      { label: "Streaming", value: "SSE Token-by-Token" },
      { label: "Memory Layer", value: "PostgreSQL + Prisma ORM" },
      { label: "Audio Docks", value: "Web Speech & OpenAI Audio" },
    ],
    techStack: ["React 18", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Vite", "Tailwind CSS"],
    image: "/images/aira_chatbot.png",
    githubUrl: "https://github.com/Tejaswini2416/aira_chatbot",
    liveDemoUrl: "https://aira-chatbot.vercel.app/",
  },
  {
    id: "aegis-analytics",
    title: "AEGIS / RazorPulse — Enterprise AI Copilot",
    codenamed: "THE SENTINEL ENGINE",
    tier: "LEGENDARY ENTERPRISE",
    tierColor: "text-purple-400 bg-purple-950/80 border-purple-500/50",
    borderColor: "border-purple-500/50 hover:border-purple-400",
    glowColor: "rgba(168, 85, 247, 0.3)",
    shortDescription:
      "Enterprise fintech risk telemetry & AI copilot utilizing a multi-agent DAG orchestrator, FastAPI, PyTorch anomaly scoring, and SHAP interpretability.",
    lore: "Engineered to intercept synthetic fraud bursts across high-velocity transaction streams. Delivers sub-50ms latency scoring and automated post-mortem mitigation.",
    stats: [
      { label: "Latency", value: "< 50ms Real-Time" },
      { label: "Orchestration", value: "Multi-Agent DAG" },
      { label: "Explainability", value: "SHAP Feature Attribution" },
      { label: "Framework", value: "FastAPI + PyTorch" },
    ],
    techStack: ["Python", "FastAPI", "PyTorch", "Streamlit", "SHAP", "Scikit-Learn", "Docker"],
    image: "/images/razorpulse.jpg",
    githubUrl: "https://github.com/Tejaswini2416/razorpulse_agent",
    liveDemoUrl: "https://razorpulse-agent.vercel.app/",
  },
  {
    id: "deskmate-rag",
    title: "DeskMate — RAG Student Helpdesk",
    codenamed: "THE KNOWLEDGE COMPASS",
    tier: "ANCIENT TECH RELIC",
    tierColor: "text-cyan-400 bg-cyan-950/80 border-cyan-500/50",
    borderColor: "border-cyan-500/50 hover:border-cyan-400",
    glowColor: "rgba(6, 182, 212, 0.3)",
    shortDescription:
      "Context-aware student academic helpdesk powered by Pinecone vector retrieval, Supabase PostgreSQL, and Gemini 2.0 Flash for instant syllabus & query resolution.",
    lore: "Excavates dense academic catalogs and course syllabi using dense vector embeddings, hybrid semantic re-ranking, and grounded citations.",
    stats: [
      { label: "Vector DB", value: "Pinecone Serverless" },
      { label: "Model", value: "Gemini 2.0 Flash" },
      { label: "Storage", value: "Supabase PostgreSQL" },
      { label: "Retrieval", value: "Hybrid Vector + Keyword" },
    ],
    techStack: ["Gemini 2.0 Flash", "Pinecone", "Supabase", "Python", "FastAPI", "Next.js"],
    image: "/images/nexusevents.png",
    githubUrl: "https://github.com/Tejaswini2416",
    liveDemoUrl: "https://eventorganizer-beta.vercel.app/",
  },
  {
    id: "quantumeye-detection",
    title: "QuantumEye — Quantum Glaucoma Detector",
    codenamed: "THE SPECTRAL LENS",
    tier: "ANCIENT TECH RELIC",
    tierColor: "text-emerald-400 bg-emerald-950/80 border-emerald-500/50",
    borderColor: "border-emerald-500/50 hover:border-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.3)",
    shortDescription:
      "Hybrid Quantum-Classical diagnostic engine combining OpenCV, fine-tuned MobileNetV2, and 4-qubit Qiskit quantum variational circuits for early optic disc classification.",
    lore: "Harnesses quantum Hilbert space transformations to map retinal fundus features, outperforming classical convolutional boundaries in edge-case detection.",
    stats: [
      { label: "Quantum Circuits", value: "4-Qubit Parameterized" },
      { label: "Vision Backbone", value: "MobileNetV2 + OpenCV" },
      { label: "Toolkit", value: "IBM Qiskit + PyTorch" },
      { label: "Accuracy", value: "High Sensitivity" },
    ],
    techStack: ["Qiskit", "Python", "PyTorch", "MobileNetV2", "OpenCV", "Streamlit"],
    image: "/images/aira_chatbot.png",
    githubUrl: "https://github.com/Tejaswini2416",
    liveDemoUrl: "https://aira-chatbot.vercel.app/",
  },
];

export default function CyberCitadel() {
  const [inspectedRelic, setInspectedRelic] = useState<ProjectRelic | null>(null);

  const handleInspect = (relic: ProjectRelic) => {
    soundFX.playRelicInspect();
    setInspectedRelic(relic);
  };

  return (
    <section id="citadel" className="py-20 sm:py-28 relative">
      {/* Zone Heading */}
      <div className="space-y-4 max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-indigo-300 text-xs font-mono shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <Swords className="w-3.5 h-3.5 text-indigo-400" />
          <span>ZONE 02 • THE CYBER CITADEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Project Artifacts & Dungeons
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 text-justified-pro leading-relaxed max-w-2xl mx-auto">
          High-tech arsenal vault. Each project is framed as an interactive RPG loot artifact complete with rarity tiers, combat stats, live repositories, and deployment links.
        </p>
      </div>

      {/* Relics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECT_RELICS.map((relic, idx) => (
          <motion.div
            key={relic.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`group rounded-3xl glass-panel p-6 sm:p-8 border bg-[#07090e]/90 transition-all duration-300 flex flex-col justify-between space-y-6 ${relic.borderColor}`}
            style={{ boxShadow: `0 0 35px ${relic.glowColor}` }}
          >
            {/* Top Header: Tier Badge & Codenamed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border font-extrabold tracking-wider ${relic.tierColor}`}>
                  {relic.tier}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  {relic.codenamed}
                </span>
              </div>

              {/* Title & Preview Banner */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-black group-hover:border-cyan-500/40 transition-colors">
                <Image
                  src={relic.image}
                  alt={relic.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />

                <button
                  type="button"
                  onClick={() => handleInspect(relic)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Inspect Full Relic Telemetry"
                >
                  <Maximize2 className="w-4 h-4 text-cyan-400" />
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                {relic.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 text-justified-pro leading-relaxed">
                {relic.shortDescription}
              </p>
            </div>

            {/* Combat / Efficiency Stats Grid */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {relic.stats.slice(0, 4).map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5"
                  >
                    <span className="text-[9px] text-zinc-500 uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    <span className="text-xs text-white font-bold truncate block">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {relic.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Interactive Actions: GitHub & Live Portal */}
              <div className="flex items-center gap-3 pt-2">
                {relic.liveDemoUrl && (
                  <a
                    href={relic.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playWarp()}
                    className="flex-1 neon-glow-btn py-2.5 rounded-xl text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Enter Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {relic.githubUrl && (
                  <a
                    href={relic.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2 transition-colors"
                  >
                    <FiGithub className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Source</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => handleInspect(relic)}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-mono text-zinc-400 hover:text-white bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all"
                  title="Inspect Relic Architecture"
                >
                  <Activity className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Relic Inspection Modal */}
      <AnimatePresence>
        {inspectedRelic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setInspectedRelic(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#07090e] border border-cyan-500/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#04060a]">
                <div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${inspectedRelic.tierColor}`}>
                    {inspectedRelic.tier}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                    {inspectedRelic.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectedRelic(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 overflow-y-auto">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                  <Image
                    src={inspectedRelic.image}
                    alt={inspectedRelic.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    Architectural Lore & Mechanics
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justified-pro">
                    {inspectedRelic.lore}
                  </p>
                </div>

                {/* Telemetry Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {inspectedRelic.stats.map((s, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="text-[10px] font-mono text-zinc-500 block">{s.label}</span>
                      <span className="text-xs font-mono text-cyan-300 font-bold block mt-0.5 truncate">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                  <a
                    href={inspectedRelic.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 neon-glow-btn py-3 rounded-xl text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Launch Live Artifact</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a
                    href={inspectedRelic.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-2"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

