import { Cloud } from "lucide-react";

export function CloudBackground() {
  return (
    <>
      <style>{`
        @keyframes floatCloud {
          from { transform: translateX(-350px); }
          to { transform: translateX(110vw); }
        }
        .animate-cloud {
          animation: floatCloud linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* --- CAMADA 1: Nuvens Grandes e Lentas (Fundo - Opacidade Baixa) --- */}
        {/* Topo */}
        <div className="animate-cloud absolute text-pink-100 opacity-60" style={{ top: '5%',  animationDuration: '85s', animationDelay: '-5s' }}>
          <Cloud size={280} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-pink-100 opacity-60" style={{ top: '15%', animationDuration: '90s', animationDelay: '-45s' }}>
          <Cloud size={260} fill="currentColor" strokeWidth={0} />
        </div>
        
        {/* Baixo */}
        <div className="animate-cloud absolute text-pink-100 opacity-60" style={{ top: '65%', animationDuration: '80s', animationDelay: '-10s' }}>
          <Cloud size={300} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-pink-100 opacity-60" style={{ top: '75%', animationDuration: '88s', animationDelay: '-50s' }}>
          <Cloud size={250} fill="currentColor" strokeWidth={0} />
        </div>


        {/* --- CAMADA 2: Nuvens Médias (Meio - Opacidade Média) --- */}
        <div className="animate-cloud absolute text-pink-200 opacity-40" style={{ top: '25%', animationDuration: '60s', animationDelay: '-15s' }}>
          <Cloud size={180} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-pink-200 opacity-40" style={{ top: '45%', animationDuration: '65s', animationDelay: '-40s' }}>
          <Cloud size={200} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-pink-200 opacity-40" style={{ top: '85%', animationDuration: '55s', animationDelay: '-25s' }}>
          <Cloud size={160} fill="currentColor" strokeWidth={0} />
        </div>


        {/* --- CAMADA 3: Nuvens Pequenas e Rápidas (Frente - Mais Brancas) --- */}
        <div className="animate-cloud absolute text-white opacity-50" style={{ top: '10%', animationDuration: '40s', animationDelay: '-2s' }}>
          <Cloud size={100} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-white opacity-40" style={{ top: '35%', animationDuration: '45s', animationDelay: '-20s' }}>
          <Cloud size={120} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-white opacity-60" style={{ top: '55%', animationDuration: '38s', animationDelay: '-12s' }}>
          <Cloud size={90} fill="currentColor" strokeWidth={0} />
        </div>
        <div className="animate-cloud absolute text-white opacity-40" style={{ top: '80%', animationDuration: '42s', animationDelay: '-30s' }}>
          <Cloud size={110} fill="currentColor" strokeWidth={0} />
        </div>
        {/* Nuvem extra para preencher buracos ocasionais */}
        <div className="animate-cloud absolute text-white opacity-50" style={{ top: '20%', animationDuration: '48s', animationDelay: '-35s' }}>
          <Cloud size={85} fill="currentColor" strokeWidth={0} />
        </div>
      </div>
    </>
  );
}