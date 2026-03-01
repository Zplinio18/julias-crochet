import { Text } from "../../base/Text";
import loadingImg from "../../../assets/images/6.png";

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-50/90 backdrop-blur-md">
      <div className="animate-in fade-in relative flex flex-col items-center gap-6 duration-500">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-pink-200 opacity-40 blur-3xl" />
          <img
            src={loadingImg}
            alt="Maia carregando..."
            className="relative z-10 h-48 w-48 animate-pulse object-contain duration-[2000ms]"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <Text.Title className="mb-2 text-2xl text-pink-600">
            Maia está buscando seus dados...
          </Text.Title>
          <Text.Defaut className="animate-pulse font-medium text-pink-400">
            Sincronizando com a nuvem ✨
          </Text.Defaut>
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-pink-100">
          <div className="h-full animate-[progress_2s_ease-in-out_infinite] bg-pink-400" />
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; transform: translateX(50%); }
          100% { width: 0%; transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
