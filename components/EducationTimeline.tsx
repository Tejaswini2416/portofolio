"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiCalendar, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { EducationItem, AchievementItem } from "@/data/portfolioData";

interface EducationTimelineProps {
  education: EducationItem[];
  achievements: AchievementItem[];
}

export default function EducationTimeline({ education, achievements }: EducationTimelineProps) {
  return (
    <div className="space-y-16">
      {/* Education Timeline */}
      <div className="relative">
        {/* Glowing Vertical Line */}
        <div className="absolute top-4 bottom-4 left-4 sm:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-indigo-500 to-purple-600 opacity-40" />

        <div className="space-y-12">
          {education.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#070b14] border-2 border-cyan-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,242,254,0.6)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0 ${
                    isEven ? "sm:mr-auto sm:pr-4" : "sm:ml-auto sm:pl-4"
                  }`}
                >
                  <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 bg-[#0d1322]/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                        <FiCalendar className="w-3 h-3" />
                        {item.period}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                        {item.grade}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {item.degree}
                    </h3>

                    <div className="space-y-1 text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5 text-zinc-300 font-medium">
                        <FiBookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.institution}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <FiMapPin className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <p className="text-zinc-300 text-xs sm:text-sm text-justified-pro leading-relaxed pt-1">
                      {item.summary}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <FiCheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Achievements & Hackathons Matrix */}
      <div className="pt-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <FiAward className="w-3.5 h-3.5" />
            <span>Honors & Competitions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Key Achievements & Hackathons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 bg-[#0d1322]/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {ach.type}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{ach.year}</span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug">{ach.title}</h3>
                <p className="text-xs font-mono text-indigo-300">{ach.organization}</p>
                <p className="text-xs text-zinc-400 text-justified-pro leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
