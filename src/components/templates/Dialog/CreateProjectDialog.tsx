import { useState } from "react";
import { Text } from "../../base/Text";

const EMOJI_LIST = [
  "🧶", "🧣", "🩷", "🤍", "🥳", "🧵", "🪡", "👒", "🧤", "👗",
  "🐶", "🐱", "🌷", "🪷", "🌸", "🌺", "🌻", "🌼", "🪻", "🌹",
  "💐", "🌈", "💫", "⭐️", "🍓", "🍉", "🍒", "🍇", "🍎", "🍡",
  "🍧", "🍰", "🧁", "🍭", "🎂", "🍦", "🍨", "🍫", "🧋", "🧃",
  "🥢", "🏹", "🛼", "🎧", "🎨", "🩰", "🎮", "🏠", "🧸", "🎀",
  "🎁", "🎉"
];

interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, emoji: string) => void;
}

export function CreateProjectDialog({ isOpen, onClose, onSubmit }: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🧶");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    onSubmit(name, emoji);
    setName("");
    setEmoji("🧶");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200">
        <Text.Title className="text-2xl text-pink-500 mb-6 text-center">Novo Projeto</Text.Title>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">NOME DO PROJETO</label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-pink-300 rounded-xl focus:outline-none text-gray-700 font-medium transition-all"
              placeholder="Ex: Cachecol de Inverno"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">ÍCONE</label>
            
            {/* Adicionei max-h-60 e overflow para criar a rolagem */}
            <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-5 gap-2 p-4">
                {EMOJI_LIST.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`text-2xl p-2 rounded-xl transition-all ${
                      emoji === e 
                        ? "bg-pink-100 ring-2 ring-pink-400 scale-110" 
                        : "hover:bg-gray-100 grayscale hover:grayscale-0"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 text-gray-500 hover:bg-gray-100 rounded-xl font-bold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name}
              className="flex-1 p-3 bg-pink-500 text-white rounded-xl font-bold hover:bg-pink-600 disabled:opacity-50 disabled:hover:bg-pink-500 shadow-md shadow-pink-200 transition-all active:scale-95"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}