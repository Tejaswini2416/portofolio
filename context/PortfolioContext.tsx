"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initialPortfolioData,
  PortfolioData,
  Project,
  CertificationItem,
  AchievementItem,
  VolunteerExperience,
  VolunteerImage,
} from "@/data/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  // Projects
  addProject: (project: Omit<Project, "id" | "slug">) => boolean;
  updateProject: (id: string, updated: Partial<Project>) => boolean;
  deleteProject: (id: string) => boolean;
  // Certifications
  addCertification: (cert: Omit<CertificationItem, "id">) => boolean;
  updateCertification: (id: string, updated: Partial<CertificationItem>) => boolean;
  deleteCertification: (id: string) => boolean;
  // Volunteer & Community
  addVolunteerExperience: (item: Omit<VolunteerExperience, "id">) => boolean;
  updateVolunteerExperience: (id: string, updated: Partial<VolunteerExperience>) => boolean;
  deleteVolunteerExperience: (id: string) => boolean;
  addVolunteerImage: (volId: string, image: VolunteerImage) => boolean;
  deleteVolunteerImage: (volId: string, imgUrl: string) => boolean;
  // Achievements
  addAchievement: (ach: Omit<AchievementItem, "id">) => boolean;
  updateAchievement: (id: string, updated: Partial<AchievementItem>) => boolean;
  deleteAchievement: (id: string) => boolean;
  // Personal & Global Info
  updatePersonalInfo: (info: Partial<PortfolioData["personal"]>) => boolean;
  // Global Import/Export & Reset
  updateWholeData: (newData: PortfolioData) => boolean;
  resetToDefaults: () => boolean;
  exportJSON: () => void;
  hasCustomEdits: boolean;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = "tejaswini_portfolio_custom_data_v2";
const ADMIN_SESSION_KEY = "tejaswini_portfolio_admin_auth";
const ADMIN_PASSWORD = "Teju@2024";

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [hasCustomEdits, setHasCustomEdits] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Clear out any old v1 data that might contain Sowmya certificates
    try {
      localStorage.removeItem("tejaswini_portfolio_custom_data_v1");
    } catch (e) {
      // ignore
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasAira = parsed.projects?.some((p: Project) => p.id === "aira-chatbot");
        const mergedProjects = hasAira
          ? parsed.projects
          : [initialPortfolioData.projects[0], ...(parsed.projects || [])];

        const hasSih = parsed.achievements?.some((a: AchievementItem) => a.id === "sih-top-20");
        const mergedAchievements = hasSih
          ? parsed.achievements
          : [initialPortfolioData.achievements[0], ...(parsed.achievements || [])];

        // Sanitize certifications: only keep certifications matching Tejaswini Kummari
        const validPdfs = ["/certifications/data_visualization.pdf", "/certifications/forage_simulation.pdf", "/certifications/udemy_certificate.pdf"];
        const sanitizedCerts = (parsed.certifications || initialPortfolioData.certifications).filter((c: CertificationItem) => {
          if (c.pdfUrl && !validPdfs.includes(c.pdfUrl)) return false;
          const lower = (c.title + " " + c.description + " " + c.issuer).toLowerCase();
          return !lower.includes("sowmya");
        });

        // Sanitize volunteer: remove SIH hackathon from volunteer images
        const sanitizedVolunteer = (parsed.volunteer || initialPortfolioData.volunteer || []).map((v: VolunteerExperience) => ({
          ...v,
          images: (v.images || []).filter((img) => !img.url.includes("sih_hackathon")),
        }));

        setData({
          ...initialPortfolioData,
          ...parsed,
          projects: mergedProjects,
          achievements: mergedAchievements,
          certifications: sanitizedCerts.length > 0 ? sanitizedCerts : initialPortfolioData.certifications,
          volunteer: sanitizedVolunteer,
        });
        setHasCustomEdits(true);
      }
    } catch (e) {
      console.error("Failed to load custom portfolio data from localStorage", e);
    }

    try {
      const adminAuth = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (adminAuth === "true") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (e) {
      console.error("Failed to check admin session", e);
    }

    setIsInitialized(true);
  }, []);

  const loginAdmin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      try {
        sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      } catch (e) {
        console.error(e);
      }
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    try {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const saveToStorage = (newData: PortfolioData) => {
    setData(newData);
    setHasCustomEdits(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to persist portfolio data", e);
    }
  };

  // ------------------ PROJECTS ------------------
  const addProject = (projectData: Omit<Project, "id" | "slug">): boolean => {
    if (!isAdmin) return false;
    const slug = projectData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      slug: slug || `project-${Date.now()}`,
    };
    saveToStorage({
      ...data,
      projects: [newProject, ...data.projects],
    });
    return true;
  };

  const updateProject = (id: string, updatedFields: Partial<Project>): boolean => {
    if (!isAdmin) return false;
    const updatedProjects = data.projects.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    saveToStorage({ ...data, projects: updatedProjects });
    return true;
  };

  const deleteProject = (id: string): boolean => {
    if (!isAdmin) return false;
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    saveToStorage({ ...data, projects: updatedProjects });
    return true;
  };

  // ------------------ CERTIFICATIONS ------------------
  const addCertification = (certData: Omit<CertificationItem, "id">): boolean => {
    if (!isAdmin) return false;
    const newCert: CertificationItem = {
      ...certData,
      id: `cert-${Date.now()}`,
    };
    saveToStorage({
      ...data,
      certifications: [newCert, ...data.certifications],
    });
    return true;
  };

  const updateCertification = (id: string, updatedFields: Partial<CertificationItem>): boolean => {
    if (!isAdmin) return false;
    const updated = data.certifications.map((c) =>
      c.id === id ? { ...c, ...updatedFields } : c
    );
    saveToStorage({ ...data, certifications: updated });
    return true;
  };

  const deleteCertification = (id: string): boolean => {
    if (!isAdmin) return false;
    const updated = data.certifications.filter((c) => c.id !== id);
    saveToStorage({ ...data, certifications: updated });
    return true;
  };

  // ------------------ VOLUNTEER EXPERIENCE ------------------
  const addVolunteerExperience = (itemData: Omit<VolunteerExperience, "id">): boolean => {
    if (!isAdmin) return false;
    const newItem: VolunteerExperience = {
      ...itemData,
      id: `vol-${Date.now()}`,
    };
    const list = data.volunteer || [];
    saveToStorage({
      ...data,
      volunteer: [newItem, ...list],
    });
    return true;
  };

  const updateVolunteerExperience = (id: string, updatedFields: Partial<VolunteerExperience>): boolean => {
    if (!isAdmin) return false;
    const list = data.volunteer || [];
    const updated = list.map((v) => (v.id === id ? { ...v, ...updatedFields } : v));
    saveToStorage({ ...data, volunteer: updated });
    return true;
  };

  const deleteVolunteerExperience = (id: string): boolean => {
    if (!isAdmin) return false;
    const list = data.volunteer || [];
    const updated = list.filter((v) => v.id !== id);
    saveToStorage({ ...data, volunteer: updated });
    return true;
  };

  const addVolunteerImage = (volId: string, image: VolunteerImage): boolean => {
    if (!isAdmin) return false;
    const list = data.volunteer || [];
    const updated = list.map((v) => {
      if (v.id === volId) {
        return {
          ...v,
          images: [...(v.images || []), image],
        };
      }
      return v;
    });
    saveToStorage({ ...data, volunteer: updated });
    return true;
  };

  const deleteVolunteerImage = (volId: string, imgUrl: string): boolean => {
    if (!isAdmin) return false;
    const list = data.volunteer || [];
    const updated = list.map((v) => {
      if (v.id === volId) {
        return {
          ...v,
          images: (v.images || []).filter((img) => img.url !== imgUrl),
        };
      }
      return v;
    });
    saveToStorage({ ...data, volunteer: updated });
    return true;
  };

  // ------------------ ACHIEVEMENTS ------------------
  const addAchievement = (achData: Omit<AchievementItem, "id">): boolean => {
    if (!isAdmin) return false;
    const newAch: AchievementItem = {
      ...achData,
      id: `ach-${Date.now()}`,
    };
    saveToStorage({
      ...data,
      achievements: [newAch, ...data.achievements],
    });
    return true;
  };

  const updateAchievement = (id: string, updatedFields: Partial<AchievementItem>): boolean => {
    if (!isAdmin) return false;
    const updated = data.achievements.map((a) =>
      a.id === id ? { ...a, ...updatedFields } : a
    );
    saveToStorage({ ...data, achievements: updated });
    return true;
  };

  const deleteAchievement = (id: string): boolean => {
    if (!isAdmin) return false;
    const updated = data.achievements.filter((a) => a.id !== id);
    saveToStorage({ ...data, achievements: updated });
    return true;
  };

  // ------------------ PERSONAL PROFILE ------------------
  const updatePersonalInfo = (info: Partial<PortfolioData["personal"]>): boolean => {
    if (!isAdmin) return false;
    const updated = {
      ...data,
      personal: { ...data.personal, ...info },
    };
    saveToStorage(updated);
    return true;
  };

  const updateWholeData = (newData: PortfolioData): boolean => {
    if (!isAdmin) return false;
    saveToStorage(newData);
    return true;
  };

  const resetToDefaults = (): boolean => {
    if (!isAdmin) return false;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setData(initialPortfolioData);
    setHasCustomEdits(false);
    return true;
  };

  const exportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "portfolio-data-backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addVolunteerExperience,
        updateVolunteerExperience,
        deleteVolunteerExperience,
        addVolunteerImage,
        deleteVolunteerImage,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        updatePersonalInfo,
        updateWholeData,
        resetToDefaults,
        exportJSON,
        hasCustomEdits,
        isAdmin,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
