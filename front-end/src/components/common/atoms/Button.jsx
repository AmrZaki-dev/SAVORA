import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

const variantStyles = {
  primary:
    "bg-primary text-white shadow-[0_4px_6px_-1px_rgba(230,0,11,0.25),0_2px_4px_-1px_rgba(230,0,11,0.15)] hover:bg-primary-dark hover:shadow-[0_10px_15px_-3px_rgba(230,0,11,0.35),0_4px_6px_-2px_rgba(230,0,11,0.2)]",
  secondary:
    "bg-secondary text-warm-950 shadow-[0_4px_6px_-1px_rgba(253,198,0,0.25),0_2px_4px_-1px_rgba(253,198,0,0.15)] hover:bg-secondary-dark hover:shadow-[0_10px_15px_-3px_rgba(253,198,0,0.35),0_4px_6px_-2px_rgba(253,198,0,0.2)]",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost:
    "bg-transparent text-warm-600 hover:bg-warm-100 hover:text-primary",
  "admin-outline":
    "border border-gray-700 text-gray-300 hover:bg-gray-800",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2",
};

/**
 * Button — Reusable atomic button component.
 *
 * @param {"primary"|"secondary"|"outline"|"danger"|"ghost"|"admin-outline"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} loading
 * @param {boolean} fullWidth
 * @param {boolean} rounded - use rounded-full (pill) when true, rounded-xl otherwise
 * @param {React.ReactNode} children
 */
const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    fullWidth = false,
    rounded = true,
    className = "",
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-semibold
        transition-all duration-200 cursor-pointer border-0
        hover:-translate-y-px active:translate-y-0
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${rounded ? "rounded-full" : "rounded-xl"}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `.trim()}
      {...props}
    >
      {loading && <Loader2 size={size === "sm" ? 14 : 18} className="animate-spin" />}
      {children}
    </button>
  );
});

export default Button;
