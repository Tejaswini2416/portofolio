"use client";

import React from "react";
import Link from "next/link";
import { FiArrowLeft, FiCompass } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-[#0d1322]/80">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/20">
          <FiCompass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
            404 Error
          </span>
          <h1 className="text-3xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The requested portfolio path does not exist or has been relocated.
          </p>
        </div>

        <Link
          href="/"
          className="neon-glow-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-cyan-300"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

