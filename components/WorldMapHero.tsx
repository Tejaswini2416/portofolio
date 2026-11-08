"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Sparkles,
  Swords,
  Trophy,
  Scroll,
  Navigation,
  Crosshair,
  ArrowRight,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import { ZONES } from "@/components/GameHUD";
import { soundFX } from "@/lib/soundEffects";

interface WorldMapHeroProps {
  currentZone: string;
  onWarpZone: (zoneId: string) => void;
  exploredZones: Set<string>;
}

export default function WorldMapHero({
  currentZone,
  onWarpZone,
  exploredZones,
}: WorldMapHeroProps) {
  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10 text-center">
        {/* Subtitle Telemetry Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 text-xs font-mono shadow-[0_0_25px_rgba(6,182,212,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>OPEN-WORLD RPG REALM • TEJASWINI KUMMARI</span>
        </motion.div>

        {/* Hero Title & Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none">
            EXPLORE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500">TECH DOMAIN</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-mono leading-relaxed max-w-2xl mx-auto text-justified-pro">
            Computer Science & Engineering (Data Science) Student • AI/ML Specialist • Google Student Ambassador (Gemini Lead). Traverse 4 physical biomes using the tactical radar or WASD controls.
          </p>
        </motion.div>

        {/* Interactive RPG World Map Biome Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl glass-panel p-6 sm:p-10 border border-cyan-500/40 bg-[#07090e]/95 shadow-[0_0_60px_rgba(6,182,212,0.15)] overflow-hidden"
        >
          {/* Tactical Background Grid & Coordinates */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

          {/* Ambient Glowing Blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Map Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>BIOME RADAR SECTORS (4 EXPLORATION ZONES)</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Explored: {exploredZones.size} / 4</span>
                </span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-400">Use WASD or click landmarks</span>
              </div>
            </div>

            {/* 4 Interactive Zone Biome Portals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ZONES.map((zone) => {
                const Icon = zone.icon;
                const isCurrent = currentZone === zone.id;
                const isExplored = exploredZones.has(zone.id);

                return (
                  <motion.button
                    key={zone.id}
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      soundFX.playWarp();
                      onWarpZone(zone.id);
                    }}
                    className={`relative p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-4 group overflow-hidden ${
                      isCurrent
                        ? "bg-cyan-950/40 border-cyan-400 ring-2 ring-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                        : "bg-[#0b0f19]/80 border-white/10 hover:border-white/25 hover:bg-[#0d1322]"
                    }`}
                  >
                    {/* Glowing Top Pill */}
                    <div className="flex items-center justify-between">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
                        style={{
                          borderColor: `${zone.color}50`,
                          backgroundColor: `${zone.color}15`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: zone.color }} />
                      </div>

                      <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">
                        {zone.coords.split("•")[0]}
                      </span>
                    </div>

                    {/* Zone Title & Description */}
                    <div className="space-y-1">
                      <h3 className="text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                        {zone.name}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {zone.subtitle}
                      </p>
                    </div>

                    {/* Action Teleport Footer */}
                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] text-zinc-500">
                        {isExplored ? "VISITED" : "PENDING"}
                      </span>
                      <span
                        className="font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        style={{ color: zone.color }}
                      >
                        <span>Warp Zone</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

