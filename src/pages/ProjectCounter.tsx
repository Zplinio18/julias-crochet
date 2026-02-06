import { useParams, Navigate } from "react-router-dom";
import { RefreshCcw, Plus, Minus } from "lucide-react";
import { Container } from "../components/base/Container";
import { Text } from "../components/base/Text";
import { CloudBackground } from "../components/templates/CloudBackground";
import type { Project } from "../hooks/useProjectStore";
import signCatImg from "../assets/images/4.png";
import signCatStitchesImg from "../assets/images/5.png";

interface CounterProps {
  projects: Project[];
  updateCount: (id: string, type: "rows" | "stitches", delta: number) => void;
  resetCount: (id: string, type: "rows" | "stitches") => void;
}

export function ProjectCounter({ projects, updateCount, resetCount }: CounterProps) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/" />;

  return (
    <Container.Flex className="w-full min-h-screen flex-col items-center justify-center p-4 relative overflow-hidden bg-pink-50">
      
      {/* Componente de Fundo com Nuvens */}
      <CloudBackground />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">
        
        {/* Header do Projeto */}
        <div className="bg-[#3B3294] text-white w-full max-w-2xl p-8 rounded-[2rem] shadow-xl text-center relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-4 bg-white/10 rounded-t-full translate-y-2"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-5xl bg-white/20 w-20 h-20 flex items-center justify-center rounded-full shadow-inner mb-2">
              {project.emoji}
            </div>
            <Text.Title className="text-3xl font-exo2">{project.name}</Text.Title>
          </div>
        </div>

        <Text.Title className="text-5xl text-pink-500 drop-shadow-sm mt-4 font-dyna">Row Counter</Text.Title>

        {/* Grid de Contadores */}
        <Container.SimpleGrid className="w-full max-w-3xl grid-cols-1 md:grid-cols-2 gap-8">
          
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

// O componente CounterCard continua igual (não precisa alterar)
function CounterCard({ title, count, onIncrement, onDecrement, onReset, imageSrc }: any) {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-xl border-4 border-white flex flex-col items-center gap-6 relative">
      <button 
        onClick={onReset}
        className="absolute top-4 right-4 text-gray-300 hover:text-pink-500 transition-colors z-20"
        title="Zerar contador"
      >
        <RefreshCcw size={20} />
      </button>

      <div className="relative w-[400px] h-[400px] flex justify-center items-center">
        <img 
          src={imageSrc} 
          alt={`${title} gatinha com placa`} 
          className="w-full h-full object-contain relative z-0"
        />
        <div className="absolute z-10 top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] text-center flex flex-col items-center">
          <div className="text-7xl font-bold text-black font-dyna leading-none mt-24">
            {count}
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 w-full justify-center -mt-14 z-10">
        <button 
          onClick={onDecrement}
          className="w-16 h-16 flex items-center justify-center border-2 border-gray-200 rounded-xl text-3xl text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-all active:scale-95"
        >
          <Minus />
        </button>
        <button 
          onClick={onIncrement}
          className="w-16 h-16 flex items-center justify-center border-2 border-gray-200 rounded-xl text-3xl text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-all active:scale-95"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}