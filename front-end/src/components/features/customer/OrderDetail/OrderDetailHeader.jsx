import { Clock } from "lucide-react";
import {
  formatDateTime,
  formatOrderId,
  getStatusColor,
} from "../../../../utils/formatters";

export default function OrderDetailHeader({ order }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-warm-900">
          Order {formatOrderId(order.id)}
        </h1>

        <div className="flex items-center gap-2 text-sm text-warm-500 mt-2">
          <Clock size={14} />
          {formatDateTime(order.createdAt)}
        </div>
      </div>

      <span
        className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${getStatusColor(
          order.status,
        )}`}
      >
        {order.status}
      </span>
    </div>
  );
}
