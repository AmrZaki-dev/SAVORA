/**
 * FormField — Combines a label, an input/select/checkbox, and an error message.
 *
 * @param {string} label
 * @param {string} htmlFor - the id of the input field
 * @param {boolean} required
 * @param {string} error - validation error message
 * @param {"dark"|"light"|"admin"} theme
 * @param {React.ReactNode} children - the input element
 */
export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  theme = "dark",
  className = "",
  children,
}) {
  const labelThemes = {
    dark: "text-sm font-medium text-white/90",
    light: "text-sm font-medium text-warm-700",
    admin: "text-sm font-medium text-gray-300",
  };

  const errorThemes = {
    dark: "text-red-400 text-xs mt-1.5",
    light: "text-red-500 text-xs mt-1.5",
    admin: "text-red-500 text-xs mt-1.5",
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={htmlFor}
          className={`block mb-2 ${labelThemes[theme] || labelThemes.dark}`}
        >
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>
      )}

      {children}

      {error && (
        <p className={errorThemes[theme] || errorThemes.dark}>{error}</p>
      )}
    </div>
  );
}
