import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { formatPrice } from "../../../../utils/formatters";

export default function CartSummary({ cartCount, subtotal, isAuthenticated }) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-28 rounded-2xl border border-warm-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-warm-900">Order Summary</h2>

        <div className="space-y-3 border-b border-warm-100 pb-4">
          <div className="flex justify-between text-sm">
            <span className="text-warm-500">Items ({cartCount})</span>

            <span className="font-medium text-warm-800">
              {formatPrice(subtotal)}
            </span>
          </div>
        </div>

        <div className="flex justify-between py-4 text-lg font-bold">
          <span className="text-warm-900">Total</span>

          <span className="text-primary">{formatPrice(subtotal)}</span>
        </div>

        {isAuthenticated ? (
          <Link
            to="/checkout"
            className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-center"
          >
            Proceed to Checkout
            <ArrowRight size={18} />
          </Link>
        ) : (
          <Link
            to="/login"
            state={{
              from: {
                pathname: "/checkout",
              },
            }}
            className="btn-primary flex w-full items-center justify-center gap-2 py-3.5 text-center"
          >
            Login to Checkout
            <ArrowRight size={18} />
          </Link>
        )}

        <Link
          to="/menu"
          className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-warm-600 transition-colors hover:text-primary"
        >
          <ArrowLeft size={16} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
