import { Minus, Plus } from "lucide-react";

/**
 * QuantitySelector — Minus / quantity display / Plus control.
 *
 * @param {number} quantity
 * @param {(newQty: number) => void} onChange
 * @param {number} min
 */
export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  className = "",
}) {
  return (
    <div
      className={`flex items-center border border-warm-200 rounded-lg overflow-hidden ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="p-2 text-warm-600 hover:bg-warm-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>

      <span className="px-4 py-2 text-sm font-semibold text-warm-900 min-w-10 text-center select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="p-2 text-warm-600 hover:bg-warm-100 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
