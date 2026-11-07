import { Package } from "lucide-react";

import { getStatusColor } from "../../../../utils/formatters";

export default function OrderStatusCard({ status }) {
  return (
    <div>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">Order Status</h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className={`p-2.5 rounded-xl ${getStatusColor(status)}`}>
              <Package size={18} />
            </span>

            <div>
              <p className="text-xs text-gray-400 font-medium">
                Current Status
              </p>

              <p className="text-sm font-semibold capitalize text-white mt-0.5">
                {status}
              </p>
            </div>
          </div>

          {status === "cancelled" ? (
            <div className="p-3 bg-red-950/20 border border-red-900/50 text-red-400 rounded-xl text-xs">
              This order was cancelled and will not be prepared.
            </div>
          ) : (
            <div className="p-3 bg-blue-950/20 border border-blue-900/50 text-blue-400 rounded-xl text-xs">
              Review status updates carefully. Status transitions directly
              affect customer notifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
