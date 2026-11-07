import { forwardRef } from "react";

/**
 * Checkbox — Reusable atomic checkbox.
 *
 * @param {string} label - Optional label text shown next to the checkbox
 * @param {"dark"|"light"} theme
 */
const Checkbox = forwardRef(function Checkbox(
  { label, theme = "dark", className = "", ...props },
  ref,
) {
  const themes = {
    dark: "w-4 h-4 rounded text-primary focus:ring-primary bg-gray-950 border-gray-800",
    light:
      "w-4 h-4 rounded text-primary focus:ring-primary bg-white border-warm-300",
  };

  const labelThemes = {
    dark: "text-sm font-medium text-gray-300",
    light: "text-sm font-medium text-warm-700",
  };

  if (!label) {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={`${themes[theme] || themes.dark} ${className}`}
        {...props}
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <input
        ref={ref}
        type="checkbox"
        className={`${themes[theme] || themes.dark} ${className}`}
        {...props}
      />
      <label
        htmlFor={props.id}
        className={labelThemes[theme] || labelThemes.dark}
      >
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
