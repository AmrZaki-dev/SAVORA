import { Package } from "lucide-react";

export default function OrderStatus({ status }) {
  return (
    <div className="mt-6 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-xl">
      <Package size={18} />

      <span>
        Status: <strong className="capitalize">{status}</strong>
      </span>
    </div>
  );
}
