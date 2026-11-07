import { Search, X } from "lucide-react";

/**
 * SearchBar — Reusable search input with icon and clear button.
 *
 * @param {string} value
 * @param {(e) => void} onChange
 * @param {() => void} onClear
 * @param {string} placeholder
 * @param {"light"|"dark"} theme
 */
export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search...",
  theme = "light",
  className = "",
}) {
  const themes = {
    light:
      "bg-white border-warm-200 text-warm-800 placeholder-warm-400 focus:ring-primary/30 focus:border-primary",
    dark:
      "bg-gray-900/60 border-gray-800 text-white placeholder-gray-500 focus:ring-primary/30 focus:border-primary/50",
  };

  const iconThemes = {
    light: "text-warm-400",
    dark: "text-gray-500",
  };

  const clearThemes = {
    light: "text-warm-400 hover:text-warm-600",
    dark: "text-gray-400 hover:text-white",
  };

  return (
    <div className={`relative ${className}`}>
      <Search
        size={20}
        className={`absolute left-4 top-1/2 -translate-y-1/2 ${
          iconThemes[theme] || iconThemes.light
        }`}
      />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-12 py-3 border rounded-full outline-none transition-all shadow-sm text-sm focus:ring-2 ${
          themes[theme] || themes.light
        }`}
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
            clearThemes[theme] || clearThemes.light
          }`}
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
