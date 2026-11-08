"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiCheckCircle,
  FiX,
  FiMaximize2,
  FiChevronLeft,
  FiChevronRight,
  FiCode,
  FiCompass,
  FiAward,
} from "react-icons/fi";
import { SiGoogle } from "react-icons/si";
import { FaLaptopCode, FaChalkboardTeacher } from "react-icons/fa";
import TiltCard from "@/components/TiltCard";
import { usePortfolio } from "@/context/PortfolioContext";

interface VolunteerGalleryItem {
  id: string;
  src: string;
  title: string;
  event: string;
  caption: string;
  tags: string[];
}

const volunteerGallery: VolunteerGalleryItem[] = [
  {
    id: "crowdbridge-1",
    src: "/images/volunteer/crowdbridge_lead.jpeg",
    title: "Technical Lead — CrowdBridge Keynote",
    event: "CrowdBridge • Google Crowdsource",
    caption:
      "Leading technical execution on stage at VBIT, demonstrating machine learning data labeling workflows and guiding students to contribute quality dataset annotations for Google Crowdsource.",
    tags: ["CrowdBridge", "Technical Lead", "Google Crowdsource", "Sept 2026"],
  },
  {
    id: "crowdbridge-2",
    src: "/images/volunteer/crowdbridge_audience.jpeg",
    title: "Student Mentorship & Data Labeling",
    event: "CrowdBridge • Google Crowdsource",
    caption:
      "Mentoring attendees on open data contribution practices, dataset annotation accuracy, and responsible AI workflows during the CrowdBridge initiative.",
    tags: ["Mentorship", "Open Data", "ML Data Labeling", "500+ Students"],
  },
  {
    id: "buildathon-1",
    src: "/images/volunteer/buildathon_team.jpeg",
    title: "Technical Mentor & Crew — Live Debugging",
    event: "Buildathon 2k26 • 24-Hour Hackathon",
    caption:
      "Providing real-time technical guidance and debugging support for hackathon participants over an intense 24-hour build cycle.",
    tags: ["Buildathon 2k26", "24-Hour Hackathon", "Real-Time Debugging", "Jan 2026"],
  },
  {
    id: "buildathon-2",
    src: "/images/volunteer/buildathon_presentation.jpeg",
    title: "Hackathon Evaluation & Stage Demonstrations",
    event: "Buildathon 2k26 • 24-Hour Hackathon",
    caption:
      "Resolving integration bugs across APIs, web frameworks, and database setups for competing teams, followed by technical project evaluation.",
    tags: ["API Integration", "Web Frameworks", "Stage Pitches", "Crew"],
  },
];

export default function VolunteerExperiencePage() {
  const { data } = usePortfolio();
  const volunteerList =
    data.volunteer && data.volunteer.length > 0
      ? data.volunteer
      : [];

  // Construct gallery items from volunteer data with strict deduplication
  const dynamicGallery: VolunteerGalleryItem[] = React.useMemo(() => {
    const list: VolunteerGalleryItem[] = [];
    const seenUrls = new Set<string>();

    if (volunteerList.length > 0) {
      volunteerList.forEach((v) => {
        (v.images || []).forEach((img, idx) => {
          if (!seenUrls.has(img.url)) {
            seenUrls.add(img.url);
            list.push({
              id: `${v.id}-img-${idx}`,
              src: img.url,
              title: img.caption || v.role,
              event: img.category || v.organization,
              caption: img.caption || v.description,
              tags: v.skills || [v.organization],
            });
          }
        });
      });
    }
    // If no dynamic images, fall back to default deduplicated volunteerGallery
    return list.length > 0 ? list : volunteerGallery;
  }, [volunteerList]);

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! === 0 ? dynamicGallery.length - 1 : prev! - 1
    );
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! === dynamicGallery.length - 1 ? 0 : prev! + 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16 pb-24">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <span>🤝 Volunteer & Leadership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Volunteer & Leadership Experience
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto text-justified-pro leading-relaxed">
          Technical leadership, hackathon mentorship, and open data advocacy across premier collegiate technical initiatives.
        </p>
      </div>

      {/* Featured Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {volunteerList.map((vol, vIdx) => {
          const isGoogle = vol.organization.toLowerCase().includes("google");
          const isHackathon =
            vol.organization.toLowerCase().includes("hackathon") ||
            vol.role.toLowerCase().includes("hackathon");

          return (
            <motion.div
              key={vol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: vIdx * 0.1 }}
            >
              <TiltCard
                glowColor={isGoogle ? "rgba(0, 242, 254, 0.25)" : "rgba(99, 102, 241, 0.25)"}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-[#0d1322]/85 h-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                      {isGoogle ? (
                        <SiGoogle className="w-6 h-6" />
                      ) : isHackathon ? (
                        <FaLaptopCode className="w-6 h-6 text-indigo-400" />
                      ) : (
                        <FiUsers className="w-6 h-6 text-amber-400" />
                      )}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                      {vol.period}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                      {vol.organization}
                    </span>
                    <h2 className="text-2xl font-extrabold text-white mt-1">
                      {vol.role}
                    </h2>
                  </div>

                  {vol.highlights && vol.highlights.length > 0 ? (
                    <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {vol.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5">
                          <FiCheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {vol.description}
                    </p>
                  )}
                </div>

                {/* Photos Strip for this Volunteer Item */}
                {vol.images && vol.images.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                      {vol.organization} Photo Highlights
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      {vol.images.slice(0, 2).map((img, iIdx) => {
                        const galleryIndex = dynamicGallery.findIndex(
                          (g) => g.src === img.url
                        );
                        return (
                          <div
                            key={iIdx}
                            onClick={() =>
                              openLightbox(galleryIndex !== -1 ? galleryIndex : 0)
                            }
                            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-white/10"
                          >
                            <Image
                              src={img.url}
                              alt={img.caption || vol.role}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                            <span className="absolute bottom-1.5 left-2 text-[10px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded truncate max-w-[90%]">
                              {img.category || img.caption || "View"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* Photo Gallery Full Section */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
              <FiCompass className="w-3.5 h-3.5" />
              <span>Event Photo Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Event Moments: CrowdBridge & Buildathon 2k26
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Photographic highlights from keynote addresses, team mentoring sessions, and hackathon technical debugging.
            </p>
          </div>

          <Link
            href="/#valor"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors self-start sm:self-auto"
          >
            <FiAward className="w-4 h-4 text-cyan-400" />
            <span>View Hall of Valor (Achievements) →</span>
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicGallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer glass-panel rounded-3xl overflow-hidden border border-white/10 bg-[#0d1322]/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1322] via-transparent to-transparent opacity-80" />

                <div className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiMaximize2 className="w-4 h-4 text-cyan-400" />
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-medium">
                    {item.event}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.06]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && dynamicGallery[selectedPhotoIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-3 sm:p-6"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0b101d] border border-cyan-500/30 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#070b14]">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider block">
                    {dynamicGallery[selectedPhotoIndex].event}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {dynamicGallery[selectedPhotoIndex].title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 mr-2">
                    {selectedPhotoIndex + 1} / {dynamicGallery.length}
                  </span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="p-2 rounded-lg bg-white/[0.05] hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="relative aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={dynamicGallery[selectedPhotoIndex].src}
                  alt={dynamicGallery[selectedPhotoIndex].title}
                  fill
                  className="object-contain"
                  priority
                />

                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110"
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 bg-[#070b14] space-y-3 border-t border-white/10">
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed text-justified-pro">
                  {dynamicGallery[selectedPhotoIndex].caption}
                </p>
                <div className="flex flex-wrap gap-2">
                  {dynamicGallery[selectedPhotoIndex].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
