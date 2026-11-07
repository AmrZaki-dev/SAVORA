import { Loader2, ShieldCheck } from "lucide-react";
import { formatPrice } from "../../../../utils/formatters";

export default function CheckoutSummary({
  items,
  subtotal,
  onPlaceOrder,
  isPending,
}) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100 sticky top-28">
        <h2 className="text-lg font-bold text-warm-900 mb-4">Order Summary</h2>

        {/* Items Summary */}
        <div className="space-y-3 pb-4 border-b border-warm-100">
          {items.map((item) => (
            <div key={item.menuItemId} className="flex justify-between text-sm">
              <span className="text-warm-500 truncate mr-2">
                {item.name} × {item.quantity}
              </span>

              <span className="text-warm-700 font-medium shrink-0">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between py-4 text-lg font-bold">
          <span className="text-warm-900">Total</span>

          <span className="text-primary">{formatPrice(subtotal)}</span>
        </div>

        {/* Server Price Notice */}
        <p className="text-xs text-warm-400 mb-4 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-500" />
          Final prices are calculated by the server
        </p>

        {/* Place Order */}
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={isPending}
          className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Placing Order...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}
