import { Link } from "react-router-dom";
import { ClipboardList, Eye } from "lucide-react";

import {
  formatPrice,
  formatDateTime,
  formatOrderId,
  getStatusColor,
} from "../../../../utils/formatters";

export default function RecentOrders({ orders }) {
  return (
    <div className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
        <h2 className="text-white font-semibold text-lg">Recent Orders</h2>

        <Link
          to="/admin/orders"
          className="text-sm text-primary hover:text-primary-light font-medium"
        >
          View All
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <ClipboardList size={40} className="mx-auto mb-3 opacity-50" />

          <p>No orders yet</p>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800/30">
                  <th className="text-left px-6 py-3 font-medium">Order ID</th>

                  <th className="text-left px-6 py-3 font-medium">Date</th>

                  <th className="text-left px-6 py-3 font-medium">Items</th>

                  <th className="text-left px-6 py-3 font-medium">Total</th>

                  <th className="text-left px-6 py-3 font-medium">Status</th>

                  <th className="text-right px-6 py-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/30">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {formatOrderId(order.id)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-400">
                      {formatDateTime(order.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-400">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold text-white">
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
                        className="text-primary hover:text-primary-light text-sm font-medium inline-flex items-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="lg:hidden space-y-4 p-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-950/20 border border-gray-800/60 rounded-2xl p-4 flex flex-col gap-3 hover:border-gray-700/40 transition-colors"
              >
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

                <div className="text-xs space-y-2 text-gray-400 border-t border-b border-gray-800 py-3 my-1">
                  <div className="flex justify-between">
                    <span>Date &amp; Time:</span>

                    <span className="text-white font-medium">
                      {formatDateTime(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Items:</span>

                    <span className="text-white font-medium">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
                      Total
                    </span>

                    <span className="text-sm font-bold text-white">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="py-2 px-3.5 bg-gray-950/40 hover:bg-primary/10 border border-gray-800/80 hover:border-primary/30 rounded-xl text-gray-300 hover:text-primary transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
