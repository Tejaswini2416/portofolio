"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiShield,
  FiCalendar,
  FiBriefcase,
  FiFileText,
  FiExternalLink,
  FiDownload,
  FiEye,
  FiX,
  FiMaximize2,
} from "react-icons/fi";
import { SiPython, SiHackerrank, SiUdemy } from "react-icons/si";
import { FaCogs, FaGraduationCap, FaAws } from "react-icons/fa";
import { usePortfolio } from "@/context/PortfolioContext";
import TiltCard from "@/components/TiltCard";

interface DocumentItem {
  title: string;
  issuer: string;
  category: string;
  pdfUrl: string;
  filename: string;
}

const certificationDocs: DocumentItem[] = [
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia (Forage)",
    category: "Virtual Job Simulation",
    pdfUrl: "/certifications/forage_simulation.pdf",
    filename: "forage_simulation.pdf",
  },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata (Forage)",
    category: "Business Analytics",
    pdfUrl: "/certifications/data_visualization.pdf",
    filename: "data_visualization.pdf",
  },
  {
    title: "Generative AI & ChatGPT Technical Masterclass",
    issuer: "Udemy",
    category: "AI & Machine Learning",
    pdfUrl: "/certifications/udemy_certificate.pdf",
    filename: "udemy_certificate.pdf",
  },
];

export default function CertificationsPage() {
  const { data } = usePortfolio();
  const { certifications } = data;
  const [selectedPdf, setSelectedPdf] = useState<{ url: string; title: string } | null>(null);

  const getIssuerBadgeIcon = (issuer: string) => {
    if (issuer.includes("ServiceNow")) {
      return <FaCogs className="w-5 h-5 text-[#81b5a1]" />;
    }
    if (issuer.includes("Infosys")) {
      return <SiPython className="w-5 h-5 text-[#3776ab]" />;
    }
    if (issuer.includes("Amazon") || issuer.includes("AWS")) {
      return <FaAws className="w-5 h-5 text-[#ff9900]" />;
    }
    if (issuer.includes("HackerRank")) {
      return <SiHackerrank className="w-5 h-5 text-[#2ec866]" />;
    }
    if (issuer.includes("Udemy")) {
      return <SiUdemy className="w-5 h-5 text-[#a435f0]" />;
    }
    if (issuer.includes("AICTE") || issuer.includes("EduSkills")) {
      return <FaGraduationCap className="w-5 h-5 text-amber-400" />;
    }
    return <FiBriefcase className="w-5 h-5 text-indigo-400" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <FiShield className="w-3.5 h-3.5" />
          <span>Industry Accreditations & Verified Credentials</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Certifications & Simulations
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto text-justified-pro leading-relaxed">
          Formally verified industry accreditations, corporate engineering job simulations (Deloitte Australia, Tata), Generative AI masterclass credentials, and ServiceNow administration qualifications.
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
            transition={{ delay: index * 0.05 }}
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

                {/* PDF & Verification Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {cert.pdfUrl && (
                    <button
                      type="button"
                      onClick={() => setSelectedPdf({ url: cert.pdfUrl!, title: cert.title })}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium transition-colors shadow-sm shadow-cyan-500/10"
                    >
                      <FiFileText className="w-3.5 h-3.5" />
                      <span>View PDF</span>
                    </button>
                  )}

                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 text-xs font-mono transition-colors"
                      title="Open in new tab"
                    >
                      <FiMaximize2 className="w-3 h-3" />
                      <span>Tab</span>
                    </a>
                  )}

                  {cert.credentialUrl && cert.credentialUrl !== "#" && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-zinc-400 hover:text-white text-xs font-mono transition-colors"
                    >
                      <span>Issuer</span>
                      <FiExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Dedicated Section: Official Certificate Documents (PDFs) */}
      <div className="space-y-6 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-2">
              <FiFileText className="w-3.5 h-3.5" />
              <span>Official Document Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Verified Certificate Documents (PDFs)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Direct access to all verified PDF credentials, transcripts, and completion certificates stored in <code className="text-cyan-400">/certifications/</code>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificationDocs.map((doc, idx) => (
            <motion.div
              key={doc.filename}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
              className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0d1322]/70 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400">
                  <FiFileText className="w-5 h-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    {doc.issuer}
                  </span>
                  <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2">
                    {doc.title}
                  </h4>
                  <span className="text-[11px] text-zinc-400 font-mono block">
                    {doc.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedPdf({ url: doc.pdfUrl, title: doc.title })}
                  className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <FiEye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <span>Open</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={doc.pdfUrl}
                    download={doc.filename}
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <FiDownload className="w-3 h-3" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PDF Modal Viewer */}
      <AnimatePresence>
        {selectedPdf && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedPdf(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0b101d] border border-cyan-500/30 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-2xl shadow-cyan-500/20"
            >
              {/* Modal Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070b14]/90">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <FiFileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate">
                      {selectedPdf.title}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400">
                      Document Preview
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={selectedPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                    title="Open in new tab"
                  >
                    <FiMaximize2 className="w-4 h-4" />
                  </a>
                  <a
                    href={selectedPdf.url}
                    download
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors"
                    title="Download PDF"
                  >
                    <FiDownload className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedPdf(null)}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Embed */}
              <div className="flex-1 bg-zinc-900 relative">
                <iframe
                  src={`${selectedPdf.url}#toolbar=1`}
                  className="w-full h-full border-0"
                  title={selectedPdf.title}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
