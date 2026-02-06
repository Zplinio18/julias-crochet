import { useParams, Navigate } from "react-router-dom";
import { RefreshCcw, Plus, Minus } from "lucide-react";
import { Container } from "../components/base/Container";
import { Text } from "../components/base/Text";
// Removi o import do CloudBackground daqui
import type { Project } from "../hooks/useProjectStore";
import signCatImg from "../assets/images/4.png";
import signCatStitchesImg from "../assets/images/5.png";

interface CounterProps {
  projects: Project[];
  updateCount: (id: string, type: "rows" | "stitches", delta: number) => void;
  resetCount: (id: string, type: "rows" | "stitches") => void;
}

export function ProjectCounter({
  projects,
  updateCount,
  resetCount,
}: CounterProps) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/" />;

  return (
    // Removi 'min-h-screen' e 'bg-pink-50'.
    // Agora ele usa o tamanho e o fundo definidos no layout principal (App.tsx)
    <Container.Flex className="relative w-full flex-col items-center justify-center overflow-hidden p-4">
      {/* CloudBackground REMOVIDO DAQUI (já está no App.tsx) */}

      <div className="z-10 flex w-full max-w-4xl flex-col items-center gap-8">
        {/* Header do Projeto */}
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] bg-[#3B3294] p-8 text-center text-white shadow-xl">
          <div className="absolute bottom-0 left-0 h-4 w-full translate-y-2 rounded-t-full bg-white/10"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-5xl shadow-inner">
              {project.emoji}
            </div>
            <Text.Title className="font-exo2 text-3xl">
              {project.name}
            </Text.Title>
          </div>
        </div>

        <Text.Title className="mt-4 font-dyna text-5xl text-pink-500 drop-shadow-sm">
          Row Counter
        </Text.Title>

        {/* Grid de Contadores */}
        <Container.SimpleGrid className="w-full max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          <CounterCard
            title="Rows"
            imageSrc={signCatImg}
            count={project.rows}
            color="text-pink-500"
            onIncrement={() => updateCount(project.id, "rows", 1)}
            onDecrement={() => updateCount(project.id, "rows", -1)}
            onReset={() => resetCount(project.id, "rows")}
          />

          <CounterCard
            title="Stitches"
            imageSrc={signCatStitchesImg}
            count={project.stitches}
            color="text-pink-500"
            onIncrement={() => updateCount(project.id, "stitches", 1)}
            onDecrement={() => updateCount(project.id, "stitches", -1)}
            onReset={() => resetCount(project.id, "stitches")}
          />
        </Container.SimpleGrid>
      </div>
    </Container.Flex>
  );
}

// O componente CounterCard continua igual
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
        className="absolute right-4 top-4 z-20 text-gray-300 transition-colors hover:text-pink-500"
        title="Zerar contador"
      >
        <RefreshCcw size={20} />
      </button>

      <div className="relative flex h-[400px] w-[400px] items-center justify-center">
        <img
          src={imageSrc}
          alt={`${title} gatinha com placa`}
          className="relative z-0 h-full w-full object-contain"
        />
        <div className="absolute left-1/2 top-[55%] z-10 flex w-[70%] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <div className="mt-24 font-dyna text-7xl font-bold leading-none text-black">
            {count}
          </div>
        </div>
      </div>

      <div className="z-10 -mt-14 flex w-full justify-center gap-4">
        <button
          onClick={onDecrement}
          className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-200 text-3xl text-gray-400 transition-all hover:border-pink-500 hover:text-pink-500 active:scale-95"
        >
          <Minus />
        </button>
        <button
          onClick={onIncrement}
          className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-gray-200 text-3xl text-gray-400 transition-all hover:border-pink-500 hover:text-pink-500 active:scale-95"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
