"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail, FiEdit3, FiFileText, FiLock, FiShield } from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa";
import { usePortfolio } from "@/context/PortfolioContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Skills", href: "/skills" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAdmin } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-2xl shadow-cyan-950/20" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
                TK
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-wide text-white group-hover:text-cyan-400 transition-colors">
              Tejaswini Kummari
            </span>
            <span className="text-[10px] text-zinc-400 tracking-wider uppercase font-mono">
              CSE • AI/ML & DevOps
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0d1322]/80 px-4 py-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-1.5 text-xs lg:text-sm font-medium transition-colors rounded-full ${
                  isActive ? "text-cyan-300 font-semibold" : "text-zinc-300 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border border-cyan-400/40 rounded-full shadow-[0_0_12px_rgba(0,242,254,0.3)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls: Socials, CMS Admin, Contact CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all hover:scale-105 border ${
              isAdmin
                ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                : "text-cyan-400/90 bg-cyan-950/40 border-cyan-500/30 hover:bg-cyan-900/40 hover:text-cyan-300"
            }`}
            title={isAdmin ? "Admin Mode Active (Manage CMS)" : "Admin CMS Login"}
          >
            {isAdmin ? <FiShield className="w-3.5 h-3.5 text-emerald-400" /> : <FiLock className="w-3.5 h-3.5" />}
            <span>{isAdmin ? "Admin (Active)" : "CMS Admin"}</span>
          </Link>

          <a
            href="https://github.com/Tejaswini2416"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
            aria-label="GitHub Profile"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/tejaswini-kummari-192425313/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-cyan-400 transition-colors rounded-lg hover:bg-white/5"
            aria-label="LinkedIn Profile"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>

          <Link
            href="/contact"
            className="neon-glow-btn px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-cyan-300 uppercase"
          >
            Let&apos;s Connect
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/admin"
            className={`p-2 text-xs font-mono rounded-lg border ${
              isAdmin
                ? "text-emerald-400 bg-emerald-950/40 border-emerald-500/40"
                : "text-cyan-400 bg-cyan-950/40 border-cyan-500/30"
            }`}
            title="CMS Admin"
          >
            {isAdmin ? <FiShield className="w-4 h-4" /> : <FiLock className="w-4 h-4" />}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-b border-white/10 px-6 py-5 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Tejaswini2416"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-cyan-400 bg-white/5 rounded-lg"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tejaswini-kummari-192425313/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-zinc-400 hover:text-cyan-400 bg-white/5 rounded-lg"
                  >
                    <FiLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:tejaswinikummari17@gmail.com"
                    className="p-2 text-zinc-400 hover:text-cyan-400 bg-white/5 rounded-lg"
                  >
                    <FiMail className="w-4 h-4" />
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="neon-glow-btn px-4 py-2 rounded-xl text-xs font-semibold text-cyan-300"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
