"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { initialPortfolioData, PortfolioData, Project } from "@/data/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  addProject: (project: Omit<Project, "id" | "slug">) => boolean;
  updateProject: (id: string, updated: Partial<Project>) => boolean;
  deleteProject: (id: string) => boolean;
  updatePersonalInfo: (info: Partial<PortfolioData["personal"]>) => boolean;
  resetToDefaults: () => boolean;
  exportJSON: () => void;
  hasCustomEdits: boolean;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const STORAGE_KEY = "tejaswini_portfolio_custom_data_v1";
const ADMIN_SESSION_KEY = "tejaswini_portfolio_admin_auth";

// Allowed admin passcodes
const VALID_PASSCODES = ["admin2026", "tejaswini@admin2026", "admin123", "tejaswini2416"];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [hasCustomEdits, setHasCustomEdits] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
        setHasCustomEdits(true);
      }
    } catch (e) {
      console.error("Failed to load custom portfolio data from localStorage", e);
    }

    try {
      const adminAuth = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (adminAuth === "true") {
        setIsAdmin(true);
      }
    } catch (e) {
      console.error("Failed to check admin session", e);
    }

    setIsInitialized(true);
  }, []);

  const loginAdmin = (password: string): boolean => {
    const clean = password.trim().toLowerCase();
    if (VALID_PASSCODES.some((p) => p.toLowerCase() === clean)) {
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

  const addProject = (projectData: Omit<Project, "id" | "slug">): boolean => {
    if (!isAdmin) {
      console.warn("Unauthorized attempt to add project. Admin login required.");
      return false;
    }
    const slug = projectData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      slug: slug || `project-${Date.now()}`,
    };
    const updated = {
      ...data,
      projects: [newProject, ...data.projects],
    };
    saveToStorage(updated);
    return true;
  };

  const updateProject = (id: string, updatedFields: Partial<Project>): boolean => {
    if (!isAdmin) {
      console.warn("Unauthorized attempt to update project. Admin login required.");
      return false;
    }
    const updatedProjects = data.projects.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    const updated = { ...data, projects: updatedProjects };
    saveToStorage(updated);
    return true;
  };

  const deleteProject = (id: string): boolean => {
    if (!isAdmin) {
      console.warn("Unauthorized attempt to delete project. Admin login required.");
      return false;
    }
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    const updated = { ...data, projects: updatedProjects };
    saveToStorage(updated);
    return true;
  };

  const updatePersonalInfo = (info: Partial<PortfolioData["personal"]>): boolean => {
    if (!isAdmin) {
      console.warn("Unauthorized attempt to update personal info. Admin login required.");
      return false;
    }
    const updated = {
      ...data,
      personal: { ...data.personal, ...info },
    };
    saveToStorage(updated);
    return true;
  };

  const resetToDefaults = (): boolean => {
    if (!isAdmin) {
      console.warn("Unauthorized attempt to reset defaults. Admin login required.");
      return false;
    }
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
      JSON.stringify(data.projects, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "projects.json");
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
        updatePersonalInfo,
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
