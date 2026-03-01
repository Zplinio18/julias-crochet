import { useState, useEffect } from "react";
import { Text } from "../../base/Text";

const EMOJI_LIST = [
  "🧶",
  "🧣",
  "🩷",
  "🤍",
  "🥳",
  "🧵",
  "🪡",
  "👒",
  "🧤",
  "👗",
  "🐶",
  "🐱",
  "🌷",
  "🪷",
  "🌸",
  "🌺",
  "🌻",
  "🌼",
  "🪻",
  "🌹",
  "💐",
  "🌈",
  "💫",
  "⭐️",
  "🍓",
  "🍉",
  "🍒",
  "🍇",
  "🍎",
  "🍡",
  "🍧",
  "🍰",
  "🧁",
  "🍭",
  "🎂",
  "🍦",
  "🍨",
  "🍫",
  "🧋",
  "🧃",
  "🥢",
  "🏹",
  "🛼",
  "🎧",
  "🎨",
  "🩰",
  "🎮",
  "🏠",
  "🧸",
  "🎀",
  "🎁",
  "🎉",
];

interface EditProjectNameDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, emoji: string) => void;
  initialName: string;
  initialEmoji: string;
}

export function EditProjectNameDialog({
  isOpen,
  onClose,
  onSubmit,
  initialName,
  initialEmoji,
}: EditProjectNameDialogProps) {
  const [name, setName] = useState(initialName);
  const [emoji, setEmoji] = useState(initialEmoji);

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
      setEmoji(initialEmoji);
    }
  }, [isOpen, initialName, initialEmoji]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    onSubmit(name, emoji);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="animate-in fade-in zoom-in relative z-10 w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl duration-200">
        <div className="mb-6 flex flex-col items-center">
          <Text.Title className="text-center text-2xl text-pink-500">
            Editar Projeto
          </Text.Title>
          <Text.Defaut className="text-sm text-gray-400">
            Personalize seu projeto
          </Text.Defaut>
        </div>

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

            <div className="custom-scrollbar max-h-60 overflow-y-auto pr-2">
              <div className="grid grid-cols-5 gap-2 p-4">
                {EMOJI_LIST.map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => setEmoji(e)}
                    className={`rounded-xl p-2 text-2xl transition-all ${
                      emoji === e
                        ? "scale-110 bg-pink-100 ring-2 ring-pink-400"
                        : "grayscale hover:bg-gray-100 hover:grayscale-0"
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
              className="flex-1 rounded-xl p-3 font-bold text-gray-500 transition-colors hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name}
              className="flex-1 rounded-xl bg-pink-500 p-3 font-bold text-white shadow-md shadow-pink-200 transition-all hover:bg-pink-600 active:scale-95 disabled:opacity-50 disabled:hover:bg-pink-500"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
