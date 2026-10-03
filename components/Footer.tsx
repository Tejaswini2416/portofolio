"use client";

import React from "react";
import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp, FiHeart } from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#05070d]/90 backdrop-blur-xl mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px]">
                <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                    TK
                  </span>
                </div>
              </div>
              <span className="font-bold text-lg text-white">Tejaswini Kummari</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-md text-justified-pro leading-relaxed">
              Computer Science Engineer specialized in AI/ML architectures, high-performance web systems, and cloud telemetry. Dedicated to engineering publication-grade code and reliable software systems.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 tracking-wide">
                Available for Software Engineering & AI/ML Roles
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 font-semibold">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">
                  Overview / Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About & Education
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="hover:text-cyan-400 transition-colors">
                  Skills Matrix
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="hover:text-cyan-400 transition-colors">
                  Credentials & Badges
                </Link>
              </li>

              <li>
                <Link href="/admin" className="text-cyan-400/80 hover:text-cyan-300 font-mono text-xs">
                  CMS Content Manager →
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 font-semibold">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <a
                  href="mailto:tejaswinikummari17@gmail.com"
                  className="hover:text-cyan-400 transition-colors break-all"
                >
                  tejaswinikummari17@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918919912916" className="hover:text-cyan-400 transition-colors">
                  +91 8919912916
                </a>
              </li>
              <li className="text-zinc-500">Telangana, India</li>
            </ul>

            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://github.com/Tejaswini2416"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-cyan-950/40 border border-white/5 transition-all"
                aria-label="GitHub"
              >
                <FiGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tejaswini-kummari-192425313/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-cyan-950/40 border border-white/5 transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:tejaswinikummari17@gmail.com"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:bg-cyan-950/40 border border-white/5 transition-all"
                aria-label="Email"
              >
                <FiMail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Tejaswini Kummari. Crafted with Next.js, Tailwind CSS & Framer Motion.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-cyan-400 transition-colors"
            >
              <span>Back to Top</span>
              <FiArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
