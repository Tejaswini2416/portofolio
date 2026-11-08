"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Layers,
  Terminal,
  Activity,
  Zap,
  Shield,
  ExternalLink,
  ChevronRight,
  Database,
  Code2,
  Atom,
} from "lucide-react";
import { soundFX } from "@/lib/soundEffects";

interface SkillNode {
  name: string;
  category: "Full-Stack" | "AI/ML" | "Quantum" | "Systems";
  level: "Grandmaster" | "Expert" | "Proficient";
  powerRating: number; // 0 - 100
  lore: string;
  activeRelics: { title: string; link: string }[];
  tags: string[];
}

const CORE_ATTRIBUTES = [
  {
    name: "Full-Stack Engineering",
    rating: 94,
    description: "SSR microservices, Next.js 16 architectures, and high-throughput real-time streaming interfaces.",
    icon: Layers,
    color: "#06b6d4",
  },
  {
    name: "AI/ML Pipelines",
    rating: 96,
    description: "Multi-LLM dispatchers, PyTorch computer vision, RAG vector retrieval, and prompt optimization.",
    icon: Cpu,
    color: "#6366f1",
  },
  {
    name: "Quantum Computing",
    rating: 88,
    description: "4-qubit quantum circuits, Qiskit simulations, and hybrid quantum-classical feature maps.",
    icon: Atom,
    color: "#a855f7",
  },
  {
    name: "System Architecture",
    rating: 92,
    description: "Distributed PostgreSQL, Prisma ORM, Redis caching, and enterprise ServiceNow administration.",
    icon: Database,
    color: "#10b981",
  },
];

const SKILL_NODES: SkillNode[] = [
  {
    name: "Python",
    category: "AI/ML",
    level: "Grandmaster",
    powerRating: 98,
    lore: "Primary programming catalyst for deep learning, automated REST backends, and vectorized matrix calculus.",
    activeRelics: [
      { title: "Aira AI Chatbot", link: "#citadel" },
      { title: "Aegis Analytics Copilot", link: "#citadel" },
    ],
    tags: ["NumPy", "Pandas", "AsyncIO", "OOP"],
  },
  {
    name: "PyTorch & OpenCV",
    category: "AI/ML",
    level: "Grandmaster",
    powerRating: 95,
    lore: "Neural network forward-backward propagation, computer vision classification, and real-time tensor inference.",
    activeRelics: [
      { title: "QuantumEye Medical Classifier", link: "#citadel" },
      { title: "Aegis SHAP Engine", link: "#citadel" },
    ],
    tags: ["Tensors", "CNNs", "Vision AI", "MONAI"],
  },
  {
    name: "React.js & Next.js",
    category: "Full-Stack",
    level: "Grandmaster",
    powerRating: 96,
    lore: "Server Components, dynamic hydration trees, Framer Motion choreography, and high-fidelity glassmorphic HUDs.",
    activeRelics: [
      { title: "Aira Chatbot Client", link: "https://aira-chatbot.vercel.app/" },
      { title: "NexusEvents Platform", link: "https://eventorganizer-beta.vercel.app/" },
    ],
    tags: ["React 19", "App Router", "SSR", "Hooks"],
  },
  {
    name: "FastAPI & Express",
    category: "Full-Stack",
    level: "Expert",
    powerRating: 92,
    lore: "Asynchronous REST endpoints, SSE token-by-token streaming, JWT session gates, and middleware rate-limiters.",
    activeRelics: [
      { title: "Aira Backend Orchestrator", link: "https://github.com/Tejaswini2416/aira_chatbot" },
      { title: "Aegis Inference Microservice", link: "#citadel" },
    ],
    tags: ["SSE", "REST", "Pydantic", "CORS"],
  },
  {
    name: "Qiskit Quantum",
    category: "Quantum",
    level: "Proficient",
    powerRating: 88,
    lore: "Parameterized quantum state preparation, Hadamard gates, and Pauli-Z measurements for hybrid ML circuits.",
    activeRelics: [
      { title: "QuantumEye Glaucoma Engine", link: "#citadel" },
    ],
    tags: ["Qubits", "Quantum Gates", "Statevectors"],
  },
  {
    name: "PostgreSQL & Prisma",
    category: "Systems",
    level: "Grandmaster",
    powerRating: 94,
    lore: "Relational persistence, vector embedding storage, ACID transactions, and zero-leak session facts memory.",
    activeRelics: [
      { title: "Aira Persistent Memory Layer", link: "#citadel" },
      { title: "NexusEvents Supabase DB", link: "#citadel" },
    ],
    tags: ["Indexing", "Foreign Keys", "ORM", "pgvector"],
  },
  {
    name: "C++ & Core Algorithms",
    category: "Systems",
    level: "Expert",
    powerRating: 90,
    lore: "Algorithmic complexity reduction, graph theory, dynamic programming, and low-level memory allocation.",
    activeRelics: [
      { title: "GATE DA Algorithmic Track", link: "#valor" },
    ],
    tags: ["STL", "Data Structures", "Big-O", "Pointers"],
  },
  {
    name: "Tailwind CSS v4",
    category: "Full-Stack",
    level: "Grandmaster",
    powerRating: 97,
    lore: "Cyberpunk neon palettes, glassmorphism, responsive grid layouts, and custom theme tokens.",
    activeRelics: [
      { title: "Game Portfolio HUD", link: "/" },
      { title: "Aira Glassmorphic UI", link: "https://aira-chatbot.vercel.app/" },
    ],
    tags: ["CSS Tokens", "Utility First", "Dark Theme"],
  },
];

export default function ArcaneFoundry() {
  const [selectedNode, setSelectedNode] = useState<SkillNode>(SKILL_NODES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredNodes = SKILL_NODES.filter(
    (n) => selectedCategory === "All" || n.category === selectedCategory
  );

  return (
    <section id="foundry" className="py-20 sm:py-28 relative">
      {/* Zone Heading & Biome Tag */}
      <div className="space-y-4 max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ZONE 01 • THE ARCANE FOUNDRY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Skills & Character Attribute Matrix
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 text-justified-pro leading-relaxed max-w-2xl mx-auto">
          Tejaswini&apos;s high-tech laboratory. Explore her technical skill nodes, attribute ratings, and active project relic bindings.
        </p>
      </div>

      {/* Attribute Wheel Stats (Top 4 Core Attributes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CORE_ATTRIBUTES.map((attr, idx) => {
          const Icon = attr.icon;
          return (
            <motion.div
              key={attr.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#07090e]/80 hover:border-cyan-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: `${attr.color}50`,
                    backgroundColor: `${attr.color}15`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: attr.color }} />
                </div>
                <span className="font-mono text-xs font-extrabold" style={{ color: attr.color }}>
                  {attr.rating} / 100 PWR
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{attr.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {attr.description}
                </p>
              </div>

              {/* Stat Bar */}
              <div className="w-full h-1.5 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${attr.rating}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: attr.color }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Interactive Skill Tree Console & Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left (7 Cols): Interactive Skill Nodes Grid with Category Filters */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#07090e]/90 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Attribute Tree Nodes</span>
              </h3>
              <p className="text-xs text-zinc-400">Click any node to inspect telemetry specs</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {["All", "Full-Stack", "AI/ML", "Quantum", "Systems"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg transition-all ${
                    selectedCategory === cat
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold"
                      : "text-zinc-400 hover:text-white bg-white/[0.03] border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.name === node.name;

              return (
                <motion.button
                  key={node.name}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    soundFX.playClick();
                    setSelectedNode(node);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? "bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                        node.level === "Grandmaster"
                          ? "bg-purple-950 text-purple-300 border border-purple-500/30"
                          : node.level === "Expert"
                          ? "bg-cyan-950 text-cyan-300 border border-cyan-500/30"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {node.level}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">{node.powerRating}%</span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{node.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">{node.category}</span>
                  </div>

                  <div className="w-full h-1 rounded-full bg-zinc-900 overflow-hidden">
                    <div
                      className="h-full bg-cyan-400"
                      style={{ width: `${node.powerRating}%` }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right (5 Cols): Selected Node Inspector Terminal */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-[#07090e]/95 shadow-[0_0_40px_rgba(6,182,212,0.15)] space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Node Telemetry Inspector</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
              {selectedNode.powerRating} / 100 PWR
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase">{selectedNode.category}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-indigo-400 font-semibold">{selectedNode.level} Tier</span>
            </div>
            <h3 className="text-2xl font-black text-white">{selectedNode.name}</h3>
          </div>

          {/* Lore / Description */}
          <div className="bg-[#05070c] p-4 rounded-2xl border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Functional Capability
            </span>
            <p className="text-xs text-zinc-300 text-justified-pro leading-relaxed">
              {selectedNode.lore}
            </p>
          </div>

          {/* Sub-Specialization Tags */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Integrated Sub-Specializations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-cyan-300 border border-cyan-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Active Project Relic Bindings */}
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block">
              Active Project Relic Bindings
            </span>
            <div className="space-y-2">
              {selectedNode.activeRelics.map((relic) => (
                <a
                  key={relic.title}
                  href={relic.link}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-cyan-950/40 border border-white/10 hover:border-cyan-500/40 transition-all text-xs font-mono group"
                >
                  <span className="text-zinc-200 group-hover:text-cyan-300 font-semibold">
                    {relic.title}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

