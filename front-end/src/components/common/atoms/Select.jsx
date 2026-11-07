import { forwardRef } from "react";

/**
 * Select — Reusable atomic select dropdown.
 *
 * @param {"dark"|"light"|"admin"} theme
 * @param {boolean} hasError
 * @param {{ value: string, label: string }[]} options
 */
const Select = forwardRef(function Select(
  { theme = "admin", hasError = false, options = [], className = "", children, ...props },
  ref,
) {
  const base =
    "w-full outline-none transition-all duration-200 text-sm box-border";

  const themes = {
    dark: `h-12 px-4 rounded-lg bg-[#0b0a08] border ${
      hasError ? "border-red-500" : "border-white/15 focus:border-secondary"
    } text-white focus:ring-1 focus:ring-secondary/40`,

    light: `py-3 px-4 rounded-xl bg-white border ${
      hasError ? "border-red-500" : "border-warm-200 focus:border-primary"
    } text-warm-900 focus:ring-2 focus:ring-primary/15`,

    admin: `px-4 py-2.5 rounded-xl bg-gray-950 border ${
      hasError ? "border-red-500" : "border-gray-800 focus:border-primary/50"
    } text-white placeholder-gray-600 focus:ring-2 focus:ring-primary/30`,
  };

  return (
    <select
      ref={ref}
      className={`${base} ${themes[theme] || themes.admin} ${className}`}
      {...props}
    >
      {children ||
        options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
    </select>
  );
});

export default Select;
