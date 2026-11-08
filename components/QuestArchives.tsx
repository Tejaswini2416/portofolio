"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scroll,
  Users,
  CheckCircle2,
  Calendar,
  MapPin,
  Maximize2,
  X,
  Sparkles,
  Award,
  ChevronRight,
  Code2,
} from "lucide-react";
import { soundFX } from "@/lib/soundEffects";

interface QuestEntry {
  id: string;
  questNumber: string;
  title: string;
  guild: string;
  date: string;
  location: string;
  status: "QUEST COMPLETED" | "ACTIVE INITIATIVE";
  description: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  images: { url: string; caption: string; tag: string }[];
}

const QUEST_LOGS: QuestEntry[] = [
  {
    id: "quest-crowdbridge",
    questNumber: "QUEST 01",
    title: "Technical Lead — CrowdBridge",
    guild: "Google Crowdsource Community",
    date: "Sept 2026",
    location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
    status: "QUEST COMPLETED",
    description:
      "Led technical execution for the CrowdBridge initiative under Google Crowdsource, guiding students to contribute quality dataset annotations and mentoring attendees on open data contribution and machine learning data labeling workflows.",
    highlights: [
      "Led technical execution for the CrowdBridge initiative, guiding 100+ students to contribute quality dataset annotations for Google Crowdsource.",
      "Mentored attendees on open data contribution practices, dataset annotation accuracy, and machine learning data labeling workflows.",
      "Delivered keynote stage demonstrations on natural language and computer vision data categorization.",
      "Championed responsible AI principles and data diversity across academic engineering cohorts.",
    ],
    stats: [
      { label: "Students Guided", value: "100+ Attendees" },
      { label: "Community", value: "Google Crowdsource" },
      { label: "Dataset Impact", value: "High-Quality ML Labels" },
      { label: "Execution", value: "Keynote & Hands-On" },
    ],
    images: [
      {
        url: "/images/volunteer/crowdbridge_lead.jpeg",
        caption: "Technical Lead — Keynote stage presentation explaining ML dataset annotation protocols at VBIT",
        tag: "Stage Keynote",
      },
      {
        url: "/images/volunteer/crowdbridge_audience.jpeg",
        caption: "Mentoring attendees and guiding engineering students through hands-on crowdsourcing workflows",
        tag: "Student Workshop",
      },
    ],
  },
  {
    id: "quest-buildathon",
    questNumber: "QUEST 02",
    title: "Technical Mentor & Crew — Buildathon 2k26",
    guild: "24-Hour Hackathon Guild",
    date: "Jan 2026",
    location: "Vignana Bharathi Institute of Technology (VBIT), Hyderabad",
    status: "QUEST COMPLETED",
    description:
      "Provided technical guidance and real-time debugging support for hackathon participants over a 24-hour build cycle. Resolved integration bugs across APIs, web frameworks, and database setups for competing teams.",
    highlights: [
      "Guided 15+ student engineering squads through an intense 24-hour hackathon build cycle.",
      "Resolved mission-critical integration bugs across REST APIs, web frameworks (React, Next.js), and database schemas.",
      "Assisted teams with software system architecture, asynchronous state management, and MVP deployment.",
      "Served on the technical crew evaluating final stage project demonstrations and functional prototypes.",
    ],
    stats: [
      { label: "Teams Mentored", value: "15+ Hackathon Squads" },
      { label: "Sprint Duration", value: "24 Hours Continuous" },
      { label: "Stack Coverage", value: "APIs, DBs, Web Frameworks" },
      { label: "Role", value: "Technical Mentor & Crew" },
    ],
    images: [
      {
        url: "/images/volunteer/buildathon_team.jpeg",
        caption: "Live technical mentorship and real-time debugging alongside competing hackathon squads",
        tag: "Team Mentorship",
      },
      {
        url: "/images/volunteer/buildathon_presentation.jpeg",
        caption: "Evaluating prototype stage demonstrations and technical delivery during Buildathon 2k26",
        tag: "Stage Evaluation",
      },
    ],
  },
];

export default function QuestArchives() {
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption: string; tag: string } | null>(null);

  const openPhoto = (photo: { url: string; caption: string; tag: string }) => {
    soundFX.playClick();
    setSelectedPhoto(photo);
  };

  return (
    <section id="quests" className="py-20 sm:py-28 relative">
      {/* Zone Heading */}
      <div className="space-y-4 max-w-4xl mx-auto text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <Scroll className="w-3.5 h-3.5 text-emerald-400" />
          <span>ZONE 04 • THE QUEST ARCHIVES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Experience & Mentorship Guild
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 text-justified-pro leading-relaxed max-w-2xl mx-auto">
          Open quest scroll log depicting real-world community impact, open data leadership, and hackathon developer mentorship.
        </p>
      </div>

      {/* Quest Logs Stack */}
      <div className="space-y-8">
        {QUEST_LOGS.map((quest, idx) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="rounded-3xl glass-panel p-6 sm:p-10 border border-emerald-500/30 bg-[#07090e]/90 shadow-[0_0_40px_rgba(16,185,129,0.1)] space-y-8"
          >
            {/* Quest Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
                    {quest.questNumber}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 font-semibold">{quest.guild}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-black text-white">{quest.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-cyan-300">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{quest.date}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>VBIT, Hyderabad</span>
                </span>
              </div>
            </div>

            {/* Description & Highlights */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-zinc-300 text-justified-pro leading-relaxed">
                {quest.description}
              </p>

              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold block">
                  Key Quest Deliverables & Impact
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                  {quest.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {quest.stats.map((s, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-0.5 text-center"
                >
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-300 font-mono block truncate">
                    {s.value}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Verified Photographic Artifacts (NO DUPLICATES) */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Photographic Artifacts ({quest.images.length})</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Click to inspect full resolution
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quest.images.map((img, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => openPhoto(img)}
                    className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group border border-white/10 bg-black hover:border-emerald-500/50 transition-all shadow-lg"
                  >
                    <Image
                      src={img.url}
                      alt={img.caption}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md text-emerald-300 border border-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-medium block w-fit mb-1">
                        {img.tag}
                      </span>
                      <p className="text-xs text-white line-clamp-1">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#07090e] border border-emerald-500/40 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#04060a]">
                <span className="text-xs font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 font-bold uppercase">
                  {selectedPhoto.tag}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-5 bg-[#04060a] border-t border-white/10">
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed text-justified-pro font-mono">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

