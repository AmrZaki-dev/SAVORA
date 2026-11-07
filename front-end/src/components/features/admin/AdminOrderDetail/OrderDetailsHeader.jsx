import { Link } from "react-router-dom";
import { ArrowLeft, Clock, User } from "lucide-react";

import { formatDateTime, formatOrderId } from "../../../../utils/formatters";

const STATUS_OPTIONS = ["pending", "preparing", "completed", "cancelled"];

export default function OrderDetailsHeader({
  order,
  isPending,
  onStatusChange,
}) {
  return (
    <>
      <Link
        to="/admin/orders"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Orders Management
      </Link>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div>
          <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
            Order Details
          </span>

          <h1 className="text-xl sm:text-2xl font-bold text-white mt-1">
            {formatOrderId(order.id)}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400 mt-2">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {formatDateTime(order.createdAt)}
            </span>

            <span className="hidden sm:inline text-gray-600">|</span>

            <span className="flex items-center gap-1.5">
              <User size={14} />
              Customer ID:
              <strong className="font-mono text-xs">{order.userId}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="status"
            className="text-xs font-semibold text-gray-400 uppercase tracking-wider"
          >
            Update Status
          </label>

          <select
            id="status"
            value={order.status}
            disabled={isPending}
            onChange={(e) => onStatusChange(e.target.value)}
            className="bg-gray-950 border border-gray-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all font-medium capitalize disabled:opacity-60"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
