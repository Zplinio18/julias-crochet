import { Text } from "../../base/Text";
import deleteImg from "../../../assets/images/1.png";

interface DeleteProjectDialogProps {
  isOpen: boolean;
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteProjectDialog({ isOpen, projectName, onClose, onConfirm }: DeleteProjectDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200 border-b-4 border-red-100">
        <div className="flex flex-col items-center text-center gap-4">
          
          {/* Imagem da gatinha no lixo */}
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 blur-2xl opacity-50 rounded-full"></div>
            <img 
              src={deleteImg} 
              alt="Gatinha jogando fora" 
              className="w-40 h-40 object-contain relative z-10"
            />
          </div>
          
          <Text.Title className="text-2xl text-gray-800">Excluir Projeto?</Text.Title>
          
          <Text.Defaut className="text-gray-500">
            Tem certeza que quer excluir <strong>"{projectName}"</strong>? <br/>
            <span className="text-xs text-pink-600 mt-2 block font-bold">
              Isso não tem volta, a Maia vai levar embora!
            </span>
          </Text.Defaut>

          <div className="flex gap-3 w-full pt-4">
            <button
              onClick={onClose}
              className="flex-1 p-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 p-3 bg-pink-600 text-white rounded-xl font-bold hover:bg-pink-800 shadow-md shadow-red-200 transition-all active:scale-95"
            >
              Sim, Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}