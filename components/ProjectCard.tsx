"use client";

import React from "react";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiMaximize2 } from "react-icons/fi";
import TiltCard from "./TiltCard";
import { Project } from "@/data/portfolioData";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <TiltCard
      glowColor="rgba(0, 242, 254, 0.2)"
      className="glass-panel glass-panel-hover flex flex-col h-full bg-[#0d1322]/80 border border-white/[0.08]"
    >
      {/* Media Mockup Container */}
      <div
        className="relative w-full aspect-[16/9] overflow-hidden bg-black/40 group cursor-pointer"
        onClick={() => onSelect(project)}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-[#0d1322]/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Hover quick overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/80 text-black text-xs font-bold tracking-wider uppercase shadow-lg shadow-cyan-500/50">
            <FiMaximize2 className="w-3.5 h-3.5" />
            Explore Case Study
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-black/70 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3
            onClick={() => onSelect(project)}
            className="text-lg font-bold text-white hover:text-cyan-300 transition-colors cursor-pointer mb-2.5 line-clamp-1"
          >
            {project.title}
          </h3>

          <p className="text-zinc-300 text-xs sm:text-sm text-justified-pro leading-relaxed mb-4 line-clamp-3">
            {project.shortDescription}
          </p>

          {/* Highlights Mini Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] text-cyan-400 border border-cyan-500/20">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
          <button
            onClick={() => onSelect(project)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            <span>Architecture & Metrics</span>
            <span>→</span>
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                title="GitHub Code"
                onClick={(e) => e.stopPropagation()}
              >
                <FiGithub className="w-3.5 h-3.5" />
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 hover:text-cyan-200 border border-cyan-500/30 transition-colors"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <FiExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
