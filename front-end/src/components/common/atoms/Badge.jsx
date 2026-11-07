/**
 * Badge — Reusable status/label pill component.
 *
 * @param {"primary"|"secondary"|"success"|"warning"|"danger"|"info"|"neutral"|"custom"} variant
 * @param {"sm"|"md"} size
 * @param {string} customClasses - used when variant is "custom"
 */
export default function Badge({
  variant = "neutral",
  size = "sm",
  customClasses = "",
  className = "",
  children,
  ...props
}) {
  const variants = {
    primary: "bg-primary/15 text-primary",
    secondary: "bg-secondary/15 text-secondary border border-secondary/30",
    success: "bg-emerald-500/15 text-emerald-400",
    warning: "bg-amber-500/15 text-amber-400",
    danger: "bg-red-500/15 text-red-400",
    info: "bg-blue-500/15 text-blue-400",
    neutral: "bg-white/90 backdrop-blur-sm text-warm-700",
    custom: customClasses,
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full capitalize
        ${variants[variant] || variants.neutral}
        ${sizes[size] || sizes.sm}
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
