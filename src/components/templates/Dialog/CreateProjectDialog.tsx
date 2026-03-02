import { useState } from "react";
import { Text } from "../../base/Text";
import { EmojiPicker } from "./EmojiPicker";
interface CreateProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, emoji: string, hasTimer: boolean, notes: string) => void;
}

export function CreateProjectDialog({
  isOpen,
  onClose,
  onSubmit,
}: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🧶");
  const [hasTimer, setHasTimer] = useState(false);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name, emoji, hasTimer, notes);
      setName("");
      setEmoji("🧶");
      setHasTimer(false);
      setNotes("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="animate-in fade-in zoom-in relative z-10 w-full max-w-sm max-h-[90vh] overflow-y-auto custom-scrollbar rounded-3xl bg-white p-6 shadow-2xl duration-200">
        <Text.Title className="mb-6 text-center text-2xl text-pink-500">
          Novo Projeto
        </Text.Title>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 ml-1 block text-sm font-bold text-gray-400">
              NOME DO PROJETO
            </label>
            <input
              autoFocus
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border-2 border-transparent bg-gray-50 p-4 font-medium text-gray-700 transition-all focus:border-pink-300 focus:outline-none"
              placeholder="Ex: Cachecol de Inverno"
            />
          </div>

          <div>
            <label className="mb-2 ml-1 block text-sm font-bold text-gray-400">
              ÍCONE
            </label>

            <EmojiPicker selectedEmoji={emoji} onSelect={setEmoji} />
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4 transition-all hover:bg-gray-100">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700">Cronômetro de Sessão</span>
              <span className="text-xs text-gray-400">Ver quanto tempo levou cada projeto</span>
            </div>
            <button
              type="button"
              onClick={() => setHasTimer(!hasTimer)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                hasTimer ? "bg-pink-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  hasTimer ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 ml-1 block text-sm font-bold text-gray-400 uppercase">
              Notas (Opcional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Cole o link do YouTube ou anote detalhes do tutorial..."
              className="w-full min-h-[100px] rounded-2xl border-2 border-transparent bg-gray-50 p-4 text-sm font-medium text-gray-700 transition-all focus:border-pink-300 focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl p-3 font-bold text-gray-500 transition-colors hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name}
              className="flex-1 rounded-xl bg-pink-500 p-3 font-bold text-white shadow-md shadow-pink-200 transition-all hover:bg-pink-600 active:scale-95 disabled:opacity-50 disabled:hover:bg-pink-500"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
