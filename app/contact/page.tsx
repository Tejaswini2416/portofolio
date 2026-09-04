"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiCopy,
  FiCheck,
  FiMessageCircle,
  FiClock,
} from "react-icons/fi";
import { usePortfolio } from "@/context/PortfolioContext";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const { data } = usePortfolio();
  const { personal } = data;

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <FiMessageCircle className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Connect & Collaborate
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto text-justified-pro leading-relaxed">
          Open to full-time Software Engineer, AI/ML Developer, and Full-Stack opportunities. Drop a message via the form below or connect via direct channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Details Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-4"
        >
          {/* Card 1: Email */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0d1322]/80 flex items-center justify-between group">
            <div className="flex items-center gap-3.5 overflow-hidden">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <FiMail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Direct Email
                </span>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                >
                  {personal.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(personal.email, "email")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex-shrink-0"
              title="Copy Email"
            >
              {copiedField === "email" ? (
                <FiCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <FiCopy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Card 2: Phone */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0d1322]/80 flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, "")}`}
                  className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                >
                  {personal.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(personal.phone, "phone")}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors flex-shrink-0"
              title="Copy Phone"
            >
              {copiedField === "phone" ? (
                <FiCheck className="w-4 h-4 text-emerald-400" />
              ) : (
                <FiCopy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Card 3: Location */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0d1322]/80 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 flex-shrink-0">
              <FiMapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                Geographic Location
              </span>
              <span className="text-sm font-semibold text-white">
                {personal.location} (Open to Relocation)
              </span>
            </div>
          </div>

          {/* Card 4: Response Window & Availability */}
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
              <FiClock className="w-4 h-4" />
              <span>Prompt Response SLA</span>
            </div>
            <p className="text-xs text-zinc-300 text-justified-pro leading-relaxed">
              I typically review and reply to technical inquiries, interviews, and project discussions within 24 hours.
            </p>
          </div>

          {/* Social Profiles Grid */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-[#0d1322]/80 space-y-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
              Professional Profiles
            </span>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-cyan-300 transition-colors"
              >
                <FiGithub className="w-4 h-4 text-cyan-400" />
                <span>GitHub</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-cyan-300 transition-colors"
              >
                <FiLinkedin className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  );
}
