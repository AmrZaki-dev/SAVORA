import { forwardRef } from "react";

/**
 * Input — Reusable atomic input component.
 *
 * @param {"light"|"dark"} theme - visual theme
 * @param {boolean} hasError - whether the field has a validation error
 * @param {string} className - additional classes
 */
const Input = forwardRef(function Input(
  { theme = "dark", hasError = false, className = "", ...props },
  ref,
) {
  const base =
    "w-full outline-none transition-all duration-200 text-sm box-border";

  const themes = {
    dark: `h-12 px-4 rounded-lg bg-[#0b0a08] border ${
      hasError
        ? "border-red-500"
        : "border-white/15 focus:border-secondary"
    } text-white placeholder:text-white/30 focus:ring-1 focus:ring-secondary/40`,

    light: `py-3 px-4 rounded-xl bg-white border ${
      hasError
        ? "border-red-500"
        : "border-warm-200 focus:border-primary"
    } text-warm-900 placeholder:text-warm-400 focus:ring-2 focus:ring-primary/15`,

    admin: `px-4 py-2.5 rounded-xl bg-gray-950 border ${
      hasError
        ? "border-red-500"
        : "border-gray-800 focus:border-primary/50"
    } text-white placeholder-gray-600 focus:ring-2 focus:ring-primary/30`,
  };

  return (
    <input
      ref={ref}
      className={`${base} ${themes[theme] || themes.dark} ${className}`}
      {...props}
    />
  );
});

export default Input;
