"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { initialPortfolioData, PortfolioData, Project } from "@/data/portfolioData";

interface PortfolioContextType {
  data: PortfolioData;
  addProject: (project: Omit<Project, "id" | "slug">) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updatePersonalInfo: (info: Partial<PortfolioData["personal"]>) => void;
  resetToDefaults: () => void;
  exportJSON: () => void;
  hasCustomEdits: boolean;
}

const STORAGE_KEY = "tejaswini_portfolio_custom_data_v1";

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [hasCustomEdits, setHasCustomEdits] = useState<boolean>(false);
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
    setIsInitialized(true);
  }, []);

  const saveToStorage = (newData: PortfolioData) => {
    setData(newData);
    setHasCustomEdits(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error("Failed to persist portfolio data", e);
    }
  };

  const addProject = (projectData: Omit<Project, "id" | "slug">) => {
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
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    const updatedProjects = data.projects.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    const updated = { ...data, projects: updatedProjects };
    saveToStorage(updated);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    const updated = { ...data, projects: updatedProjects };
    saveToStorage(updated);
  };

  const updatePersonalInfo = (info: Partial<PortfolioData["personal"]>) => {
    const updated = {
      ...data,
      personal: { ...data.personal, ...info },
    };
    saveToStorage(updated);
  };

  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setData(initialPortfolioData);
    setHasCustomEdits(false);
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
