"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiShield, FiCalendar, FiBriefcase } from "react-icons/fi";
import { SiPython } from "react-icons/si";
import { FaCogs } from "react-icons/fa";
import { usePortfolio } from "@/context/PortfolioContext";
import TiltCard from "@/components/TiltCard";

export default function CertificationsPage() {
  const { data } = usePortfolio();
  const { certifications } = data;

  const getIssuerBadgeIcon = (issuer: string) => {
    if (issuer.includes("ServiceNow")) {
      return <FaCogs className="w-5 h-5 text-[#81b5a1]" />;
    }
    if (issuer.includes("Infosys")) {
      return <SiPython className="w-5 h-5 text-[#3776ab]" />;
    }
    return <FiBriefcase className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <FiShield className="w-3.5 h-3.5" />
          <span>Industry Accreditations & Badges</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Certifications & Simulations
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto text-justified-pro leading-relaxed">
          Formally verified industry qualifications and technical job simulations spanning enterprise cloud administration, algorithmic mastery, generative analytics, and global software engineering.
        </p>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <TiltCard
              glowColor="rgba(99, 102, 241, 0.25)"
              className="glass-panel glass-panel-hover p-6 rounded-3xl border border-white/10 bg-[#0d1322]/80 flex flex-col justify-between h-full space-y-5"
            >
              {/* Card Header: Icon, Badge Type, Verified Tick */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    {getIssuerBadgeIcon(cert.issuer)}
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium">
                    <FiCheckCircle className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {cert.issuer}
                  </span>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {cert.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                  <FiCalendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Issued {cert.date}</span>
                  <span>•</span>
                  <span className="text-zinc-500">{cert.badgeType}</span>
                </div>

                <p className="text-xs text-zinc-300 text-justified-pro leading-relaxed pt-1">
                  {cert.description}
                </p>
              </div>

              {/* Verified Skills & Actions */}
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Validated Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-zinc-300 border border-white/[0.08]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>


              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
