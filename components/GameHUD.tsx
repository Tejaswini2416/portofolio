"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  Volume2,
  VolumeX,
  Compass,
  Zap,
  Heart,
  ChevronDown,
  Navigation,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  Scroll,
} from "lucide-react";
import { soundFX } from "@/lib/soundEffects";

interface GameHUDProps {
  currentZone: string;
  onWarpZone: (zoneId: string) => void;
  exploredZones: Set<string>;
}

export const ZONES = [
  {
    id: "foundry",
    name: "The Arcane Foundry",
    subtitle: "Skills & Attribute Matrix",
    icon: Sparkles,
    color: "#06b6d4",
    bgClass: "from-cyan-500/20 to-transparent",
    coords: "ZONE 01 • X:120 Y:340",
  },
  {
    id: "citadel",
    name: "The Cyber Citadel",
    subtitle: "Project Artifacts & Dungeons",
    icon: Swords,
    color: "#6366f1",
    bgClass: "from-indigo-500/20 to-transparent",
    coords: "ZONE 02 • X:540 Y:210",
  },
  {
    id: "valor",
    name: "The Hall of Valor",
    subtitle: "Achievements & Trophies",
    icon: Trophy,
    color: "#f59e0b",
    bgClass: "from-amber-500/20 to-transparent",
    coords: "ZONE 03 • X:890 Y:420",
  },
  {
    id: "quests",
    name: "The Quest Archives",
    subtitle: "Experience & Mentorship Guild",
    icon: Scroll,
    color: "#10b981",
    bgClass: "from-emerald-500/20 to-transparent",
    coords: "ZONE 04 • X:320 Y:780",
  },
];

export default function GameHUD({
  currentZone,
  onWarpZone,
  exploredZones,
}: GameHUDProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [teleportMenuOpen, setTeleportMenuOpen] = useState(false);
  const [radarExpanded, setRadarExpanded] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
    if (next) soundFX.playClick();
  };

  const handleTeleport = (zoneId: string) => {
    soundFX.playWarp();
    onWarpZone(zoneId);
    setTeleportMenuOpen(false);
  };

  return (
    <header className="fixed top-16 sm:top-20 left-0 right-0 z-40 pointer-events-none p-2 sm:p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Top-Left: Player Stat Banner (HP & Mana) */}
        <div className="pointer-events-auto flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl glass-panel border border-cyan-500/30 bg-[#07090e]/90 backdrop-blur-xl shadow-[0_0_25px_rgba(6,182,212,0.15)]">
          {/* Avatar Ring */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[2px] flex-shrink-0">
            <div className="w-full h-full rounded-[10px] bg-[#07090e] flex items-center justify-center font-black text-cyan-400 text-xs">
              TK
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#07090e] flex items-center justify-center" title="Online & Ready">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
          </div>

          {/* Profile Name & Stat Bars */}
          <div className="space-y-1 min-w-[210px] sm:min-w-[260px]">
            <div className="flex items-center justify-between text-[11px] font-mono leading-none">
              <span className="font-extrabold text-white tracking-wide truncate">
                Tejaswini Kummari
              </span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[10px] text-cyan-300 font-bold">
                Lvl 2027 (CSE-DS)
              </span>
            </div>

            <div className="text-[10px] font-mono text-zinc-400">
              Class: <span className="text-indigo-400 font-semibold">AI/ML Architect</span> • VBIT
            </div>

            {/* HP Bar (CGPA 8.77 / 10 = 87.7%) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-rose-400 font-bold">
                  <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" /> HP: 8.77 CGPA
                </span>
                <span className="text-zinc-500">87.7% Integrity</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "87.7%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-rose-500 via-rose-400 to-amber-400 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                />
              </div>
            </div>

            {/* Mana Bar (GATE AIR 10k / National Standing) */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Zap className="w-2.5 h-2.5 fill-cyan-400 text-cyan-400" /> MP: GATE AIR 10k
                </span>
                <span className="text-zinc-500">DA National Pool</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "92%" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top-Right: Quick Teleport Dropdown, Mini-Map Radar & Audio Toggle */}
        <div className="pointer-events-auto flex items-center justify-between md:justify-end gap-2">
          {/* Keyboard Key Assist Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel border border-white/10 bg-[#07090e]/80 text-[10px] font-mono text-zinc-400">
            <span className="px-1 py-0.5 rounded bg-white/10 text-white font-bold">W</span>
            <span className="px-1 py-0.5 rounded bg-white/10 text-white font-bold">A</span>
            <span className="px-1 py-0.5 rounded bg-white/10 text-white font-bold">S</span>
            <span className="px-1 py-0.5 rounded bg-white/10 text-white font-bold">D</span>
            <span className="text-zinc-500">Traverse</span>
          </div>

          {/* Quick Teleport Selector */}
          <div className="relative">
            <button
              onClick={() => {
                soundFX.playClick();
                setTeleportMenuOpen(!teleportMenuOpen);
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl glass-panel border border-indigo-500/40 bg-[#07090e]/90 text-xs font-mono font-bold text-indigo-300 hover:text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
            >
              <Navigation className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">WARP PORTAL:</span>
              <span className="text-white capitalize">
                {ZONES.find((z) => z.id === currentZone)?.name.split(" ")[1] || "Map"}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${teleportMenuOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {teleportMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel border border-cyan-500/30 bg-[#07090e]/98 p-2 shadow-2xl space-y-1 z-50 backdrop-blur-2xl"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono text-cyan-400 uppercase tracking-widest border-b border-white/10 font-bold">
                    Select Exploration Biome
                  </div>

                  {ZONES.map((zone) => {
                    const Icon = zone.icon;
                    const isActive = currentZone === zone.id;
                    const isExplored = exploredZones.has(zone.id);

                    return (
                      <button
                        key={zone.id}
                        onClick={() => handleTeleport(zone.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs font-mono ${
                          isActive
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                            : "hover:bg-white/5 text-zinc-300 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center border"
                            style={{
                              borderColor: `${zone.color}40`,
                              backgroundColor: `${zone.color}15`,
                            }}
                          >
                            <Icon className="w-3.5 h-3.5" style={{ color: zone.color }} />
                          </div>
                          <div>
                            <div className="font-bold leading-tight text-white">{zone.name}</div>
                            <div className="text-[10px] text-zinc-400">{zone.subtitle}</div>
                          </div>
                        </div>

                        {isExplored ? (
                          <span className="text-[9px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                            VISITED
                          </span>
                        ) : (
                          <span className="text-[9px] font-mono text-zinc-500">
                            UNEXPLORED
                          </span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mini-Map Radar Widget */}
          <div className="relative">
            <button
              onClick={() => {
                soundFX.playClick();
                setRadarExpanded(!radarExpanded);
              }}
              className="p-2 sm:px-3 sm:py-2 rounded-xl glass-panel border border-cyan-500/40 bg-[#07090e]/90 text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              title="Toggle Tactical Radar"
            >
              <div className="relative w-4 h-4 rounded-full border border-cyan-400 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <span className="hidden sm:inline font-bold">RADAR</span>
            </button>

            <AnimatePresence>
              {radarExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel border border-cyan-500/40 bg-[#07090e]/95 p-3.5 shadow-2xl z-50 space-y-3"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 border-b border-white/10 pb-2">
                    <span className="font-bold flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      TACTICAL RADAR
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      {exploredZones.size} / {ZONES.length} Biomes
                    </span>
                  </div>

                  {/* Circular Radar Simulation Grid */}
                  <div className="relative w-full aspect-square rounded-xl bg-[#04060a] border border-cyan-500/30 overflow-hidden flex items-center justify-center p-2">
                    {/* Concentric rings */}
                    <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
                    <div className="absolute inset-10 rounded-full border border-cyan-500/30 border-dashed" />
                    <div className="absolute inset-16 rounded-full border border-cyan-500/40" />

                    {/* Crosshairs */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-500/20" />
                    <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-500/20" />

                    {/* Radar Sweep Line */}
                    <div className="absolute inset-0 origin-center animate-spin" style={{ animationDuration: "5s" }}>
                      <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-cyan-500/15" />
                    </div>

                    {/* Zone Landmarks on Radar */}
                    {ZONES.map((zone, idx) => {
                      const pos = [
                        { top: "25%", left: "30%" },
                        { top: "25%", left: "70%" },
                        { top: "70%", left: "70%" },
                        { top: "70%", left: "30%" },
                      ][idx];

                      const isCurrent = currentZone === zone.id;

                      return (
                        <button
                          key={zone.id}
                          onClick={() => handleTeleport(zone.id)}
                          style={{ top: pos.top, left: pos.left }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group/pin flex flex-col items-center"
                        >
                          <div
                            className={`w-4 h-4 rounded-full flex items-center justify-center border transition-transform ${
                              isCurrent
                                ? "scale-125 border-cyan-400 bg-cyan-400/50 shadow-[0_0_10px_#06b6d4]"
                                : "border-white/30 bg-black/60 hover:scale-110"
                            }`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: zone.color }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-zinc-300 opacity-70 group-hover/pin:opacity-100 mt-1 whitespace-nowrap bg-black/80 px-1 rounded">
                            {zone.name.split(" ")[1]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[10px] font-mono text-zinc-400 leading-tight text-center">
                    Click any landmark node to execute fast-travel telemetry.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl glass-panel border transition-all ${
              soundEnabled
                ? "border-cyan-500/40 bg-cyan-950/40 text-cyan-300"
                : "border-white/10 bg-[#07090e]/90 text-zinc-500"
            }`}
            title={soundEnabled ? "Mute Game Audio FX" : "Enable Game Audio FX"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

