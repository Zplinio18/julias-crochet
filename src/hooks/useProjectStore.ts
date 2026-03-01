import { useState, useEffect, useCallback } from "react";

export type Project = {
  id: string;
  name: string;
  emoji: string;
  rows: number;
  stitches: number;
};

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

export function useProjectStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("crochet-projects");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const fetchFromCloud = async () => {
      try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();

        if (Array.isArray(data)) {
          setProjects(data);
          localStorage.setItem("crochet-projects", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Erro ao buscar dados da planilha:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFromCloud();
  }, []);

  const syncToCloud = useCallback(async (currentProjects: Project[]) => {
    setIsSyncing(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sync",
          projects: currentProjects,
        }),
      });
    } catch (error) {
      console.error("Erro ao sincronizar com a nuvem:", error);
    } finally {
      setIsSyncing(false);
    }
  }, []);

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
    const updated = [...projects, newProject];
    setProjects(updated);
    syncToCloud(updated);
    return newProject.id;
  };

  const updateCount = (
    id: string,
    type: "rows" | "stitches",
    delta: number,
  ) => {
    const updated = projects.map((p) => {
      if (p.id !== id) return p;
      const newValue = p[type] + delta;
      return { ...p, [type]: newValue < 0 ? 0 : newValue };
    });
    setProjects(updated);
    syncToCloud(updated);
  };

  const resetCount = (id: string, type: "rows" | "stitches") => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, [type]: 0 } : p,
    );
    setProjects(updated);
    syncToCloud(updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    syncToCloud(updated);
  };

  const editProject = (id: string, name: string, emoji: string) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, name, emoji } : p,
    );
    setProjects(updated);
    syncToCloud(updated);
  };

  return {
    projects,
    addProject,
    updateCount,
    resetCount,
    deleteProject,
    editProject,
    isLoading,
    isSyncing,
  };
}
