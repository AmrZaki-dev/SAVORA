import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function OrderActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
      <Link
        to="/my-orders"
        className="btn-primary inline-flex items-center justify-center gap-2"
      >
        View My Orders
        <ArrowRight size={18} />
      </Link>

      <Link
        to="/menu"
        className="px-6 py-3 border-2 border-warm-300 text-warm-700 rounded-full font-semibold text-center hover:border-primary hover:text-primary transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
