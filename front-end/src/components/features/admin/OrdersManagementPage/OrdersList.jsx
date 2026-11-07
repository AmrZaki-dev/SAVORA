import { Eye, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

import {
  formatPrice,
  formatDateTime,
  formatOrderId,
  getStatusColor,
} from "../../../../utils/formatters";

export default function OrdersList({ orders, isLoading, isError }) {
  if (isLoading) {
    return (
      <div className="p-8 space-y-4 bg-gray-900/60 border border-gray-800/50 rounded-2xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 bg-gray-800/50 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-400 bg-gray-900/60 border border-gray-800/50 rounded-2xl">
        <p className="text-base">Failed to load orders</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 bg-gray-900/60 border border-gray-800/50 rounded-2xl">
        <ClipboardList
          size={48}
          className="mx-auto mb-4 opacity-40 text-gray-400"
        />

        <p className="text-base">No orders found matching filters</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800/30">
                <th className="text-left px-6 py-3 font-medium">Order ID</th>

                <th className="text-left px-6 py-3 font-medium">Date/Time</th>

                <th className="text-left px-6 py-3 font-medium">Items</th>

                <th className="text-left px-6 py-3 font-medium">Total</th>

                <th className="text-left px-6 py-3 font-medium">Status</th>

                <th className="text-right px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/30">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-white">
                    {formatOrderId(order.id)}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-400">
                    {formatDateTime(order.createdAt)}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-400">
                    <div
                      className="max-w-50 truncate"
                      title={order.items
                        .map((i) => `${i.name} x${i.quantity}`)
                        .join(", ")}
                    >
                      {order.items
                        .map((i) => `${i.name} (x${i.quantity})`)
                        .join(", ")}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-bold text-white">
                    {formatPrice(order.total)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                      <Eye size={16} />
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-900 border border-gray-800/80 rounded-2xl p-4 flex flex-col gap-3 hover:border-gray-700/50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {formatOrderId(order.id)}
              </span>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Meta */}
            <div className="text-xs space-y-2 text-gray-400 border-t border-b border-gray-800 py-3 my-1">
              <div className="flex justify-between">
                <span>Date & Time:</span>

                <span className="text-white font-medium">
                  {formatDateTime(order.createdAt)}
                </span>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span>Customer ID:</span>

                <span
                  className="text-white font-mono text-[10px] truncate max-w-45 bg-gray-950/40 px-2 py-0.5 rounded border border-gray-800/60"
                  title={order.userId}
                >
                  {order.userId}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="bg-gray-950/45 border border-gray-800/60 rounded-xl p-3">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1.5 font-semibold">
                Items
              </span>

              <p
                className="text-xs text-gray-300 leading-relaxed max-h-16 overflow-y-auto pr-1"
                title={order.items
                  .map((i) => `${i.name} x${i.quantity}`)
                  .join(", ")}
              >
                {order.items
                  .map((i) => `${i.name} (x${i.quantity})`)
                  .join(", ")}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                  Total
                </span>

                <span className="text-base font-extrabold text-white">
                  {formatPrice(order.total)}
                </span>
              </div>

              <Link
                to={`/admin/orders/${order.id}`}
                className="py-2.5 px-4 bg-gray-950/40 hover:bg-primary/10 border border-gray-800/80 hover:border-primary/30 rounded-xl text-gray-300 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              >
                <Eye size={14} />
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
