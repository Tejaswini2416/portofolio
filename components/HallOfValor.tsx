"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Zap,
  Target,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
  Flame,
} from "lucide-react";
import { soundFX } from "@/lib/soundEffects";

interface TrophyPedestal {
  id: string;
  title: string;
  rankBadge: string;
  institution: string;
  category: "National Exam" | "Google Leadership" | "National Hackathon" | "National Finals";
  glowColor: string;
  borderColor: string;
  icon: typeof Trophy;
  iconColor: string;
  summary: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
}

const TROPHY_PEDESTALS: TrophyPedestal[] = [
  {
    id: "gate-da",
    title: "GATE 2026 Qualified — Data Science & AI",
    rankBadge: "AIR ~10,000 NATIONWIDE",
    institution: "National Coordination Board — GATE",
    category: "National Exam",
    glowColor: "rgba(6, 182, 212, 0.3)",
    borderColor: "border-cyan-500/50 hover:border-cyan-400",
    icon: Medal,
    iconColor: "text-cyan-400",
    summary:
      "Secured All India Rank (AIR) ~10,000 nationwide in Graduate Aptitude Test in Engineering for Data Science & Artificial Intelligence (DA).",
    metrics: [
      { label: "Examination", value: "GATE 2026" },
      { label: "Paper", value: "Data Science & AI (DA)" },
      { label: "Rank", value: "AIR ~10,000" },
      { label: "Discipline", value: "Theoretical & Applied AI" },
    ],
    highlights: [
      "Tested across linear algebra, multivariate calculus, probability distributions, algorithms, and deep neural networks.",
      "Demonstrated rigorous conceptual mastery in computational theory and predictive optimization.",
    ],
  },
  {
    id: "google-ambassador",
    title: "Google Student Ambassador — Team Gemini Lead",
    rankBadge: "TEAM GEMINI LEAD 2026",
    institution: "Google Student Ambassador Program",
    category: "Google Leadership",
    glowColor: "rgba(99, 102, 241, 0.35)",
    borderColor: "border-indigo-500/50 hover:border-indigo-400",
    icon: Star,
    iconColor: "text-indigo-400",
    summary:
      "Appointed as Google Student Ambassador leading the Gemini initiative campus-wide for 2026, driving student generative AI literacy, multimodal hackathons, and developer adoption.",
    metrics: [
      { label: "Organization", value: "Google" },
      { label: "Initiative", value: "Gemini AI Lead" },
      { label: "Year", value: "2026" },
      { label: "Impact", value: "Campus Developer Community" },
    ],
    highlights: [
      "Spearheading campus-wide workshops on Gemini multimodal APIs, Agentic workflows, and prompt architecture.",
      "Mentoring student developers on building production-grade generative AI applications.",
    ],
  },
  {
    id: "sih-hackathon",
    title: "Smart India Hackathon (SIH) Finalist",
    rankBadge: "TOP 50 FINALIST • VBIT CAMPUS",
    institution: "Smart India Hackathon • VBIT Campus Round",
    category: "National Hackathon",
    glowColor: "rgba(245, 158, 11, 0.35)",
    borderColor: "border-amber-500/50 hover:border-amber-400",
    icon: Zap,
    iconColor: "text-amber-400",
    summary:
      "Ranked among the Top 50 finalist teams campus-wide at VBIT out of 200+ competing engineering squads in the Smart India Hackathon internal round.",
    metrics: [
      { label: "Teams Competing", value: "200+ Engineering Squads" },
      { label: "Selection", value: "Top Finalist Standing" },
      { label: "Venue", value: "VBIT Hyderabad" },
      { label: "Track", value: "Software Edition Prelims" },
    ],
    highlights: [
      "Engineered and presented a fully functional working software prototype under strict 24-hour sprint constraints.",
      "Recognized by faculty evaluators and industry jury for system innovation, full-stack velocity, and operational feasibility.",
    ],
  },
  {
    id: "hmel-energy",
    title: "National Finalist — HMEL Energy Quest",
    rankBadge: "NATIONAL FINALIST 2026",
    institution: "HPCL-Mittal Energy Limited (HMEL)",
    category: "National Finals",
    glowColor: "rgba(168, 85, 247, 0.3)",
    borderColor: "border-purple-500/50 hover:border-purple-400",
    icon: Trophy,
    iconColor: "text-purple-400",
    summary:
      "Advanced to the national finals in premier engineering competition tackling industrial energy analytics, operational efficiency, and sustainable computational resource allocation.",
    metrics: [
      { label: "Host", value: "HMEL Energy Ltd" },
      { label: "Stage", value: "National Finals" },
      { label: "Focus", value: "Industrial Data Analytics" },
      { label: "Scale", value: "Pan-India Competitors" },
    ],
    highlights: [
      "Shortlisted for national finals among competitors from top engineering universities across India.",
      "Formulated predictive machine learning models for industrial energy optimization and asset telemetry.",
    ],
  },
];

export default function HallOfValor() {
  const [selectedPedestal, setSelectedPedestal] = useState<TrophyPedestal>(TROPHY_PEDESTALS[0]);

  return (
    <section id="valor" className="py-20 sm:py-28 relative">
      {/* Zone Heading */}
      <div className="space-y-4 max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>ZONE 03 • THE HALL OF VALOR</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Achievements & Trophy Pedestals
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 text-justified-pro leading-relaxed max-w-2xl mx-auto">
          Grand marble hall adorned with holographic banners and interactive honor pedestals. Review competitive examinations, Google ambassadorship, and national hackathon distinctions.
        </p>
      </div>

      {/* Interactive Pedestals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TROPHY_PEDESTALS.map((pedestal, idx) => {
          const Icon = pedestal.icon;
          const isSelected = selectedPedestal.id === pedestal.id;

          return (
            <motion.div
              key={pedestal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                soundFX.playClick();
                setSelectedPedestal(pedestal);
              }}
              className={`group cursor-pointer rounded-3xl glass-panel p-6 border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                isSelected
                  ? "bg-amber-950/30 border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_35px_rgba(245,158,11,0.3)]"
                  : "bg-[#07090e]/85 border-white/10 hover:border-white/25 hover:bg-[#07090e]/95"
              }`}
            >
              {/* Pedestal Top: Floating Holographic Trophy Icon */}
              <div className="space-y-4">
                <div className="relative flex justify-center py-4">
                  {/* Glowing Pedestal Base */}
                  <div className="absolute bottom-0 w-24 h-2.5 rounded-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent blur-sm" />

                  {/* Holographic floating orb with icon */}
                  <div className="relative w-16 h-16 rounded-2xl bg-[#0b101d] border border-amber-500/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Icon className={`w-8 h-8 ${pedestal.iconColor}`} />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  </div>
                </div>

                {/* Badge Rank */}
                <div className="text-center">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-extrabold tracking-wider inline-block">
                    {pedestal.rankBadge}
                  </span>
                </div>

                <div className="space-y-1 text-center">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                    {pedestal.category}
                  </span>
                  <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {pedestal.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 text-justified-pro line-clamp-3 leading-relaxed">
                  {pedestal.summary}
                </p>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 text-[10px]">{pedestal.institution}</span>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Pedestal Detailed Holographic Console */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPedestal.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="mt-10 glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-[#07090e]/95 shadow-[0_0_50px_rgba(245,158,11,0.15)] space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Selected Pedestal Deep Dive</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedPedestal.title}
              </h3>
            </div>

            <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950 border border-amber-500/50 text-amber-300 font-bold self-start sm:self-auto">
              {selectedPedestal.rankBadge}
            </span>
          </div>

          <p className="text-sm text-zinc-300 text-justified-pro leading-relaxed">
            {selectedPedestal.summary}
          </p>

          {/* Highlights & Verified Outcomes */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block font-semibold">
              Verified Technical Highlights
            </span>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
              {selectedPedestal.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10">
            {selectedPedestal.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{m.label}</span>
                <span className="text-xs font-mono text-amber-300 font-bold block truncate">
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

