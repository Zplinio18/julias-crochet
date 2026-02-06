import { useState, useEffect } from "react";

export type Project = {
  id: string;
  name: string;
  emoji: string;
  rows: number;
  stitches: number;
};

export function useProjectStore() {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("crochet-projects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("crochet-projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (name: string, emoji: string) => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name,
      emoji,
      rows: 0,
      stitches: 0,
    };
    setProjects([...projects, newProject]);
    return newProject.id;
  };

  const updateCount = (id: string, type: "rows" | "stitches", delta: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newValue = p[type] + delta;
        return { ...p, [type]: newValue < 0 ? 0 : newValue };
      })
    );
  };

  const resetCount = (id: string, type: "rows" | "stitches") => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [type]: 0 } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return { projects, addProject, updateCount, resetCount, deleteProject };
}