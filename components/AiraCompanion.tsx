"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Volume2,
  VolumeX,
  Sparkles,
  Swords,
  Trophy,
  Scroll,
  X,
  MessageSquare,
  Wand2,
  Radio,
  Zap,
} from "lucide-react";
import { soundFX } from "@/lib/soundEffects";

interface AiraCompanionProps {
  currentZone: string;
  onWarpZone: (zoneId: string) => void;
}

const ZONE_DIALOGUES: Record<string, string> = {
  default:
    "Greetings Explorer! I am AIRA, your automated guide through Tejaswini's realm. Select a Zone on the map or ask me to warp you directly to her projects!",
  foundry:
    "Welcome to The Arcane Foundry! Here Tejaswini synthesizes multi-threaded neural networks, quantum algorithms with Qiskit, and resilient full-stack architectures.",
  citadel:
    "You have entered The Cyber Citadel! Inspect the legendary project relics, including my own multi-provider streaming orchestration engine and live APIs!",
  valor:
    "Behold The Hall of Valor! Honor pedestals recognizing GATE 2026 AIR 10,000, Google Student Ambassador (Gemini Lead), and Smart India Hackathon finalists.",
  quests:
    "Welcome to The Quest Archives! Review Tejaswini's verified leadership impact, mentoring 100+ students in CrowdBridge and 15+ hackathon squads at Buildathon 2k26.",
};

export default function AiraCompanion({
  currentZone,
  onWarpZone,
}: AiraCompanionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeakingVoice, setIsSpeakingVoice] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const fullText = ZONE_DIALOGUES[currentZone] || ZONE_DIALOGUES.default;
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Typewriter effect when zone or text changes
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText("");
    let idx = 0;

    const timer = setInterval(() => {
      idx++;
      setDisplayedText(fullText.slice(0, idx));
      if (idx >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 22);

    // Voice Synthesis if enabled
    if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.pitch = 1.1;
      utterance.rate = 1.05;
      utterance.onstart = () => setIsSpeakingVoice(true);
      utterance.onend = () => setIsSpeakingVoice(false);
      utterance.onerror = () => setIsSpeakingVoice(false);
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      clearInterval(timer);
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [fullText, voiceEnabled]);

  const toggleVoiceMode = () => {
    soundFX.playClick();
    const next = !voiceEnabled;
    setVoiceEnabled(next);

    if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingVoice(false);
    } else if (next && typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.pitch = 1.1;
      utterance.rate = 1.05;
      utterance.onstart = () => setIsSpeakingVoice(true);
      utterance.onend = () => setIsSpeakingVoice(false);
      utterance.onerror = () => setIsSpeakingVoice(false);
      synthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePortalClick = (zoneId: string) => {
    soundFX.playWarp();
    onWarpZone(zoneId);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none">
      {/* Dialogue Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="pointer-events-auto mb-3 w-[92vw] sm:w-96 rounded-3xl glass-panel border border-cyan-500/40 bg-[#07090e]/95 p-4 sm:p-5 shadow-[0_0_40px_rgba(6,182,212,0.25)] backdrop-blur-2xl space-y-3.5"
          >
            {/* Header: Guide Title & Controls */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <span>AIRA AI COMPANION</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      v2.4
                    </span>
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-400">Autonomous Telemetry Guide</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Voice Commentary Toggle */}
                <button
                  type="button"
                  onClick={toggleVoiceMode}
                  className={`p-1.5 rounded-lg border transition-all ${
                    voiceEnabled
                      ? "border-cyan-400 bg-cyan-950/80 text-cyan-300"
                      : "border-white/10 bg-white/5 text-zinc-500 hover:text-white"
                  }`}
                  title={voiceEnabled ? "Mute AIRA Voice Synthesis" : "Enable AIRA Voice Synthesis"}
                >
                  {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    setIsOpen(false);
                  }}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white transition-colors"
                  title="Minimize AIRA Dialogue"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Typewriter Commentary Text */}
            <div className="min-h-[64px] bg-[#05070c] p-3 rounded-2xl border border-white/5">
              <p className="text-xs font-mono text-zinc-200 leading-relaxed text-justified-pro">
                {displayedText}
                {isTyping && <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-pulse" />}
              </p>

              {/* Dynamic Waveform Docks if Voice Active */}
              {isSpeakingVoice && (
                <div className="flex items-center gap-1 pt-2">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">
                    Synthesizing Audio
                  </span>
                  <div className="flex items-center gap-0.5 ml-2">
                    {[12, 24, 18, 28, 14, 20].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [6, h, 6] }}
                        transition={{ repeat: Infinity, duration: 0.5 + i * 0.1 }}
                        className="w-1 bg-cyan-400 rounded-full"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick-Warp Portal Buttons */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                <span>Quick-Warp Teleport Portals</span>
                <span className="text-[9px] text-zinc-500 font-normal">Fast Travel</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePortalClick("citadel")}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[10px] font-mono transition-all text-left ${
                    currentZone === "citadel"
                      ? "bg-indigo-500/25 border border-indigo-400 text-indigo-300 font-bold"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white"
                  }`}
                >
                  <Swords className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">⚔️ Cyber Citadel</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalClick("foundry")}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[10px] font-mono transition-all text-left ${
                    currentZone === "foundry"
                      ? "bg-cyan-500/25 border border-cyan-400 text-cyan-300 font-bold"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">🔮 Arcane Foundry</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalClick("valor")}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[10px] font-mono transition-all text-left ${
                    currentZone === "valor"
                      ? "bg-amber-500/25 border border-amber-400 text-amber-300 font-bold"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white"
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="truncate">🏆 Hall of Valor</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePortalClick("quests")}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[10px] font-mono transition-all text-left ${
                    currentZone === "quests"
                      ? "bg-emerald-500/25 border border-emerald-400 text-emerald-300 font-bold"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white"
                  }`}
                >
                  <Scroll className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">📜 Quest Archives</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating 3D-Style Glass Orb Avatar */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          soundFX.playClick();
          setIsOpen(!isOpen);
        }}
        className="pointer-events-auto relative group flex items-center justify-center"
        aria-label="Toggle AIRA AI Companion"
      >
        {/* Outer Aura Rings */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 opacity-60 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

        {/* Orbiting Particle Dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute -inset-1 rounded-full pointer-events-none"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4] -translate-x-1" />
        </motion.div>

        {/* Core Glass Orb */}
        <div className="relative w-14 h-14 rounded-full bg-[#07090e]/90 border-2 border-cyan-400/80 backdrop-blur-xl flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.5)]">
          <Bot className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

          {/* Active Speaking Indicator */}
          {isSpeakingVoice && (
            <span className="absolute -bottom-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#07090e] animate-ping" />
          )}
        </div>

        {/* Small Tooltip Badge if Closed */}
        {!isOpen && (
          <span className="absolute -top-1 -left-2 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-[10px] font-mono text-cyan-300 shadow-md">
            AIRA
          </span>
        )}
      </motion.button>
    </div>
  );
}

