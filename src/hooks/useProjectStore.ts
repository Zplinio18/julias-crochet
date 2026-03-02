import { useState, useEffect, useCallback, useRef } from "react";

export type Project = {
  id: string;
  name: string;
  emoji: string;
  rows: number;
  stitches: number;
  hasTimer?: boolean;
  totalSeconds?: number;
  notes?: string;
};

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL;

export function useProjectStore() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("crochet-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const syncToCloud = useCallback(async (currentProjects: Project[]) => {
    if (!SCRIPT_URL) return;
    setIsSyncing(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sync", projects: currentProjects }),
      });
    } catch (error) {
      console.error("Erro ao sincronizar:", error);
    } finally {
      setTimeout(() => setIsSyncing(false), 800);
    }
  }, []);

  const syncTimeoutRef = useRef<number | null>(null);

  const debouncedSync = useCallback(
    (currentProjects: Project[]) => {
      if (syncTimeoutRef.current) {
        window.clearTimeout(syncTimeoutRef.current);
      }
      syncTimeoutRef.current = window.setTimeout(() => {
        syncToCloud(currentProjects);
      }, 2000);
    },
    [syncToCloud]
  );

  useEffect(() => {
    localStorage.setItem("crochet-projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    const fetchFromCloud = async () => {
      if (!SCRIPT_URL) { setIsLoading(false); return; }
      try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        if (Array.isArray(data)) setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFromCloud();
  }, []);

  const addProject = (name: string, emoji: string, hasTimer: boolean = false, notes: string = "") => {
    const newProject: Project = { id: crypto.randomUUID(), name, emoji, rows: 0, stitches: 0, hasTimer, totalSeconds: 0, notes };
    const updated = [...projects, newProject];
    setProjects(updated);
    syncToCloud(updated);
    return newProject.id;
  };

  const updateCount = (id: string, type: "rows" | "stitches", delta: number) => {
    const updated = projects.map(p => p.id === id ? { ...p, [type]: Math.max(0, (p[type] || 0) + delta) } : p);
    setProjects(updated);
    debouncedSync(updated);
  };

  const resetCount = (id: string, type: "rows" | "stitches") => {
    const updated = projects.map(p => p.id === id ? { ...p, [type]: 0 } : p);
    setProjects(updated);
    syncToCloud(updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    syncToCloud(updated);
  };

  const editProject = (id: string, name: string, emoji: string, hasTimer: boolean, notes: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, name, emoji, hasTimer, notes } : p);
    setProjects(updated);
    syncToCloud(updated);
  };

  const updateProjectTime = (id: string, seconds: number) => {
    const updated = projects.map(p => p.id === id ? { ...p, totalSeconds: Math.floor(seconds) } : p);
    setProjects(updated);
    syncToCloud(updated);
  };

  const updateNotes = (id: string, notes: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, notes } : p);
    setProjects(updated);
    syncToCloud(updated);
  };

  return { projects, addProject, updateCount, resetCount, deleteProject, editProject, updateProjectTime, updateNotes, isLoading, isSyncing };
}
