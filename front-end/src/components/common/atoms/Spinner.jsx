/**
 * Spinner — Lightweight loading indicator.
 *
 * @param {"sm"|"md"|"lg"} size
 * @param {string} className
 */
export default function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-10 w-10 border-4",
  };

  return (
    <div
      className={`
        animate-spin rounded-full border-primary border-t-transparent
        ${sizes[size] || sizes.md}
        ${className}
      `.trim()}
      role="status"
      aria-label="Loading"
    />
  );
}
