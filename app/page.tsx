"use client";

import React, { useState, useEffect, useCallback } from "react";
import GameHUD, { ZONES } from "@/components/GameHUD";
import WorldMapHero from "@/components/WorldMapHero";
import ArcaneFoundry from "@/components/ArcaneFoundry";
import CyberCitadel from "@/components/CyberCitadel";
import HallOfValor from "@/components/HallOfValor";
import QuestArchives from "@/components/QuestArchives";
import AiraCompanion from "@/components/AiraCompanion";
import { soundFX } from "@/lib/soundEffects";

export default function HomePage() {
  const [currentZone, setCurrentZone] = useState<string>("foundry");
  const [exploredZones, setExploredZones] = useState<Set<string>>(
    new Set(["foundry"])
  );

  const handleWarpZone = useCallback((zoneId: string) => {
    setCurrentZone(zoneId);
    setExploredZones((prev) => {
      const next = new Set(prev);
      next.add(zoneId);
      return next;
    });

    const el = document.getElementById(zoneId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Keyboard navigation listener (WASD and Arrow keys)
  useEffect(() => {
    const zoneIds = ZONES.map((z) => z.id);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input, textarea, etc.
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const currentIndex = zoneIds.indexOf(currentZone);

      if (e.key === "w" || e.key === "W" || e.key === "ArrowUp" || e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + zoneIds.length) % zoneIds.length;
        const targetZone = zoneIds[prevIndex];
        soundFX.playWarp();
        handleWarpZone(targetZone);
      } else if (e.key === "s" || e.key === "S" || e.key === "ArrowDown" || e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % zoneIds.length;
        const targetZone = zoneIds[nextIndex];
        soundFX.playWarp();
        handleWarpZone(targetZone);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentZone, handleWarpZone]);

  // ScrollSpy to update active zone as user scrolls through the world map
  useEffect(() => {
    const zoneIds = ["foundry", "citadel", "valor", "quests"];

    const handleScroll = () => {
      const scrollY = window.scrollY + 250;

      for (let i = zoneIds.length - 1; i >= 0; i--) {
        const id = zoneIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top) {
            setCurrentZone(id);
            setExploredZones((prev) => {
              if (!prev.has(id)) {
                const next = new Set(prev);
                next.add(id);
                return next;
              }
              return prev;
            });
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-white">
      {/* 1. Tactical Game HUD (Player profile, HP/Mana, radar, teleport dropdown) */}
      <GameHUD
        currentZone={currentZone}
        onWarpZone={handleWarpZone}
        exploredZones={exploredZones}
      />

      {/* Main Game World Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-36 pb-32">
        {/* World Map Tactical Biome Radar Hero */}
        <WorldMapHero
          currentZone={currentZone}
          onWarpZone={handleWarpZone}
          exploredZones={exploredZones}
        />

        {/* 📍 ZONE 1: THE ARCANE FOUNDRY (Skills & Character Attribute Matrix) */}
        <ArcaneFoundry />

        {/* 📍 ZONE 2: THE CYBER CITADEL (Project Artifacts & Legendary Dungeons) */}
        <CyberCitadel />

        {/* 📍 ZONE 3: THE HALL OF VALOR (Achievements & Trophies) */}
        <HallOfValor />

        {/* 📍 ZONE 4: THE QUEST ARCHIVES (Experience & Mentorship Guild) */}
        <QuestArchives />
      </main>

      {/* 🤖 Permanent Floating AI Avatar Companion Guide ("AIRA") */}
      <AiraCompanion
        currentZone={currentZone}
        onWarpZone={handleWarpZone}
      />
    </div>
  );
}
