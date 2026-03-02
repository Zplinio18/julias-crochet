import { useState, useMemo, useEffect } from "react";
import { Search, History, Smile, Leaf, Utensils, Trophy, Plane, Lightbulb, Shapes, X } from "lucide-react";
import { ALL_EMOJIS, EMOJI_CATEGORIES } from "../../../utils/emojiData";

interface EmojiPickerProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Recentes: <History size={18} />,
  "Sorrisos & Pessoas": <Smile size={18} />,
  "Animais & Natureza": <Leaf size={18} />,
  "Comida & Bebida": <Utensils size={18} />,
  Atividades: <Trophy size={18} />,
  "Viagem & Lugares": <Plane size={18} />,
  Objetos: <Lightbulb size={18} />,
  Símbolos: <Shapes size={18} />,
};

export function EmojiPicker({ selectedEmoji, onSelect }: EmojiPickerProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Sorrisos & Pessoas");
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  // Helper para normalizar texto (remover acentos)
  const normalizeText = (text: string) => 
    text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Carregar recentes do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recent_emojis");
    if (saved) {
      try {
        setRecentEmojis(JSON.parse(saved));
      } catch (e) {
        setRecentEmojis([]);
      }
    }
  }, []);

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    const newRecents = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 50);
    setRecentEmojis(newRecents);
    localStorage.setItem("recent_emojis", JSON.stringify(newRecents));
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setSearch(""); // Limpa a busca ao trocar de categoria
  };

  const filteredEmojis = useMemo(() => {
    let results = [];
    
    if (search.trim().length > 0) {
      const normalizedSearch = normalizeText(search);
      results = ALL_EMOJIS.filter(
        (e) =>
          normalizeText(e.name).includes(normalizedSearch) ||
          e.keywords.some((kw) => normalizeText(kw).includes(normalizedSearch))
      );
    } else if (activeCategory === "Recentes") {
      results = ALL_EMOJIS.filter(e => recentEmojis.includes(e.emoji))
        .sort((a, b) => recentEmojis.indexOf(a.emoji) - recentEmojis.indexOf(b.emoji));
    } else {
      results = ALL_EMOJIS.filter((e) => e.category === activeCategory);
    }

    // Garantir que não existam emojis duplicados na exibição (segurança extra)
    const seen = new Set();
    return results.filter(item => {
      const duplicate = seen.has(item.emoji);
      seen.add(item.emoji);
      return !duplicate;
    });
  }, [search, activeCategory, recentEmojis]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Campo de Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar emoji..."
          className="w-full rounded-xl border-2 border-transparent bg-gray-50 py-2 pl-10 pr-10 text-sm font-medium text-gray-700 transition-all focus:border-pink-300 focus:outline-none"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Abas de Categorias */}
      <div className="custom-scrollbar flex gap-1 overflow-x-auto pb-2">
        {EMOJI_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => handleCategoryClick(cat)}
            title={cat}
            className={`flex shrink-0 items-center justify-center rounded-lg p-2 transition-all ${
              !search && activeCategory === cat
                ? "bg-pink-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {CATEGORY_ICONS[cat]}
          </button>
        ))}
      </div>

      {/* Grid de Emojis */}
      <div className="custom-scrollbar max-h-60 overflow-y-auto pr-2">
        {filteredEmojis.length > 0 ? (
          <div className="grid grid-cols-6 gap-2 p-1">
            {filteredEmojis.map((e) => (
              <button
                key={`${e.category}-${e.emoji}`}
                type="button"
                onClick={() => handleSelect(e.emoji)}
                title={e.name}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-2xl transition-all ${
                  selectedEmoji === e.emoji
                    ? "scale-110 bg-pink-100 ring-2 ring-pink-400"
                    : "hover:bg-gray-100 active:scale-90"
                }`}
              >
                {e.emoji}
              </button>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-gray-400">
            Nenhum emoji encontrado {search ? '🔎' : '🌸'}
          </div>
        )}
      </div>
    </div>
  );
}
