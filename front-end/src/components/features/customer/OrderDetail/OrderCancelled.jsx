import { Package } from "lucide-react";

export default function OrderCancelled() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-red-700 text-sm font-medium flex items-center gap-2">
      <Package size={18} />
      This order has been cancelled.
    </div>
  );
}
