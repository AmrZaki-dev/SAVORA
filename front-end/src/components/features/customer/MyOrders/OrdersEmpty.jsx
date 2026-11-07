import { Link } from "react-router-dom";
import { Package } from "lucide-react";

export default function OrdersEmpty({ activeTab }) {
  return (
    <div className="text-center py-16">
      <Package size={48} className="mx-auto text-warm-300 mb-4" />

      <h3 className="text-xl font-semibold text-warm-700 mb-2">
        No orders found
      </h3>

      <p className="text-warm-500 mb-6">
        {activeTab === "all"
          ? "You haven't placed any orders yet."
          : `No ${activeTab} orders.`}
      </p>

      <Link to="/menu" className="btn-primary">
        Browse Menu
      </Link>
    </div>
  );
}
