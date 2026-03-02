import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  RefreshCcw,
  Plus,
  Minus,
  Play,
  Pause,
  Clock,
  Share2,
  X as CloseIcon,
  Download,
  StickyNote,
  Save,
  CheckCircle2,
} from "lucide-react";
import { toPng } from "html-to-image";
import { Container } from "../components/base/Container";
import { Text } from "../components/base/Text";
import type { Project } from "../hooks/useProjectStore";
import signCatImg from "../assets/images/4.png";
import signCatStitchesImg from "../assets/images/5.png";

interface CounterProps {
  projects: Project[];
  updateCount: (id: string, type: "rows" | "stitches", delta: number) => void;
  resetCount: (id: string, type: "rows" | "stitches") => void;
  updateProjectTime: (id: string, seconds: number) => void;
  updateNotes: (id: string, notes: string) => void;
}

export function ProjectCounter({
  projects,
  updateCount,
  resetCount,
  updateProjectTime,
  updateNotes,
}: CounterProps) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [localNotes, setLocalNotes] = useState("");
  const [isSavingFeedback, setIsSavingFeedback] = useState(false);

  const timerRef = useRef<number | null>(null);
  const secondsRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Sincroniza local ao carregar ou mudar ID
  useEffect(() => {
    if (project) {
      setSeconds(project.totalSeconds || 0);
      secondsRef.current = project.totalSeconds || 0;
      setLocalNotes(project.notes || "");
      setIsActive(false);
    }
  }, [id]);

  // Cronômetro (Visual)
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => {
          const next = prev + 1;
          secondsRef.current = next;
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const handleSaveNotes = () => {
    if (!id) return;
    setIsSavingFeedback(true);
    updateNotes(id, localNotes); // Salva globalmente e dispara syncToCloud
    setTimeout(() => setIsSavingFeedback(false), 2000);
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `progresso-${project?.name.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao baixar imagem:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!project) return <Navigate to="/" />;

  const formatTimeDigital = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const hasUnsavedNotes = localNotes !== (project.notes || "");

  return (
    <Container.Flex className="relative w-full flex-col items-center justify-center overflow-hidden p-4 pb-24">
      <button
        onClick={() => setIsShareModalOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg shadow-pink-200 transition-all hover:scale-110 hover:bg-pink-600 active:scale-95"
      >
        <Share2 size={24} />
      </button>

      {isShareModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="animate-in fade-in zoom-in relative duration-300">
            <div className="absolute -top-12 right-0 flex gap-2">
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-sm font-bold text-white shadow-lg transition-all hover:bg-pink-600"
              >
                {isDownloading ? (
                  "Gerando..."
                ) : (
                  <>
                    <Download size={18} /> Baixar Foto
                  </>
                )}
              </button>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="rounded-full bg-white p-2 text-gray-500 shadow-lg"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <div className="overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-2xl">
              <div
                ref={cardRef}
                className="relative flex h-[500px] w-[350px] flex-col items-center overflow-hidden rounded-[2rem] bg-gradient-to-b from-pink-50 to-white p-8 text-center"
              >
                <div className="z-10 mt-10 flex h-28 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-xl ring-4 ring-pink-100">
                  {project.emoji}
                </div>
                <h3 className="z-10 mt-8 font-dyna text-3xl text-pink-600">
                  {project.name}
                </h3>
                <p className="z-10 mt-1 font-medium text-pink-300">
                  Meu Progresso Maia
                </p>
                <div className="z-10 mt-10 grid w-full grid-cols-2 gap-4">
                  <div className="flex flex-col items-center rounded-3xl bg-white p-4 shadow-sm ring-1 ring-pink-50">
                    <span className="text-xs font-bold uppercase text-pink-200">
                      Carreiras
                    </span>
                    <span className="mt-1 font-dyna text-4xl text-pink-500">
                      {project.rows}
                    </span>
                  </div>
                  <div className="flex flex-col items-center rounded-3xl bg-white p-4 shadow-sm ring-1 ring-pink-50">
                    <span className="text-xs font-bold uppercase text-pink-200">
                      Pontos
                    </span>
                    <span className="mt-1 font-dyna text-4xl text-pink-500">
                      {project.stitches}
                    </span>
                  </div>
                </div>
                {project.hasTimer && (
                  <div className="z-10 mt-6 flex w-full flex-col items-center rounded-3xl bg-pink-500 p-4 text-white shadow-md">
                    <span className="text-xs font-bold uppercase opacity-80">
                      Tempo Dedicado
                    </span>
                    <span className="mt-1 font-mono text-3xl font-bold">
                      {Math.floor(seconds / 3600)}h{" "}
                      {Math.floor((seconds % 3600) / 60)}m
                    </span>
                  </div>
                )}
                <div className="absolute bottom-6 right-8 opacity-20">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
                    Julia's Crochet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-[#3B3294] p-8 text-center text-white shadow-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-5xl shadow-inner">
              {project.emoji}
            </div>
            <Text.Title className="font-exo2 text-3xl">
              {project.name}
            </Text.Title>
            {project.hasTimer && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-3 backdrop-blur-md">
                  <Clock className="text-pink-300" size={20} />
                  <span className="font-mono text-2xl font-bold">
                    {formatTimeDigital(seconds)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (isActive) updateProjectTime(id!, secondsRef.current);
                    setIsActive(!isActive);
                  }}
                  className={`flex items-center gap-2 rounded-xl px-6 py-2 font-bold transition-all ${isActive ? "bg-amber-500" : "bg-emerald-500"}`}
                >
                  {isActive ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" />
                  )}
                  {isActive ? "PAUSAR" : "INICIAR"}
                </button>
              </div>
            )}
          </div>
        </div>

        <Text.Title className="mt-4 font-dyna text-5xl text-pink-500">
          Row Counter
        </Text.Title>

        <Container.SimpleGrid className="w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          <CounterCard
            title="Rows"
            imageSrc={signCatImg}
            count={project.rows}
            onIncrement={() => {
              updateCount(project.id, "rows", 1);
            }}
            onDecrement={() => {
              updateCount(project.id, "rows", -1);
            }}
            onReset={() => resetCount(project.id, "rows")}
          />
          <CounterCard
            title="Stitches"
            imageSrc={signCatStitchesImg}
            count={project.stitches}
            onIncrement={() => {
              updateCount(project.id, "stitches", 1);
            }}
            onDecrement={() => {
              updateCount(project.id, "stitches", -1);
            }}
            onReset={() => resetCount(project.id, "stitches")}
          />
        </Container.SimpleGrid>

        <div className="mt-4 w-full max-w-3xl">
          <div className="mb-3 flex items-center justify-between px-4">
            <div className="flex items-center gap-2 font-bold text-pink-500">
              <StickyNote size={20} />
              <span className="text-sm uppercase tracking-wider">
                Anotações
              </span>
            </div>
            <button
              onClick={handleSaveNotes}
              disabled={isSavingFeedback || !hasUnsavedNotes}
              className={`flex items-center gap-2 rounded-full px-6 py-2 text-xs font-bold transition-all ${
                isSavingFeedback
                  ? "bg-emerald-500 text-white"
                  : hasUnsavedNotes
                    ? "animate-pulse bg-pink-500 text-white shadow-md hover:bg-pink-600"
                    : "cursor-default bg-gray-100 text-gray-400"
              }`}
            >
              {isSavingFeedback ? (
                <CheckCircle2 size={14} />
              ) : (
                <Save size={14} />
              )}
              {isSavingFeedback
                ? "SALVO!"
                : hasUnsavedNotes
                  ? "SALVAR ALTERAÇÕES"
                  : "NOTAS SALVAS"}
            </button>
          </div>
          <div className="group relative">
            <div
              className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-pink-200 to-indigo-200 blur transition duration-1000 ${hasUnsavedNotes ? "opacity-40" : "opacity-10"}`}
            ></div>
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              placeholder="Cole links de tutoriais, anote o número da agulha ou observações sobre a lã..."
              className="relative min-h-[180px] w-full resize-none rounded-[1.5rem] border-4 border-white bg-white p-6 text-sm font-medium leading-relaxed text-gray-600 shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>
      </div>
    </Container.Flex>
  );
}

function CounterCard({
  title,
  count,
  onIncrement,
  onDecrement,
  onReset,
  imageSrc,
}: any) {
  return (
    <div className="relative flex flex-col items-center gap-6 rounded-3xl border-4 border-white bg-white p-4 shadow-xl">
      <button
        onClick={onReset}
        className="absolute right-4 top-4 z-20 text-gray-300 hover:text-pink-500"
      >
        <RefreshCcw size={20} />
      </button>
      <div className="relative flex h-[400px] w-[400px] items-center justify-center">
        <img src={imageSrc} className="h-full w-full object-contain" />
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
          <div className="mt-24 font-dyna text-7xl font-bold text-black">
            {count}
          </div>
        </div>
      </div>
      <div className="z-10 -mt-14 flex gap-4">
        <button
          onClick={onDecrement}
          className="flex h-16 w-16 items-center justify-center rounded-xl border-2 text-gray-400 transition-all hover:border-pink-500 hover:text-pink-500 active:scale-90"
        >
          <Minus />
        </button>
        <button
          onClick={onIncrement}
          className="flex h-16 w-16 items-center justify-center rounded-xl border-2 text-gray-400 transition-all hover:border-pink-500 hover:text-pink-500 active:scale-90"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
