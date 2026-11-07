import { Link } from "react-router-dom";
import { Eye, Clock } from "lucide-react";

import {
  formatPrice,
  formatDateTime,
  formatOrderId,
  getStatusColor,
} from "../../../../utils/formatters";

export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-warm-100 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-bold text-warm-900 text-lg">
            Order {formatOrderId(order.id)}
          </h3>

          <div className="flex items-center gap-2 text-sm text-warm-500 mt-1">
            <Clock size={14} />

            {formatDateTime(order.createdAt)}
          </div>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
            order.status,
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-warm-100">
        <div>
          <span className="text-sm text-warm-500">
            {order.items.length} item
            {order.items.length !== 1 ? "s" : ""}
          </span>

          <span className="mx-2 text-warm-300">•</span>

          <span className="font-bold text-primary">
            Total: {formatPrice(order.total)}
          </span>
        </div>

        <Link
          to={`/orders/${order.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark font-medium transition-colors"
        >
          <Eye size={16} />
          View Details
        </Link>
      </div>
    </div>
  );
}
