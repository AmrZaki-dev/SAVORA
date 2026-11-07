import { Link } from "react-router-dom";
import { UtensilsCrossed, ShoppingBag } from "lucide-react";

export default function DashboardQuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Link
        to="/admin/menu"
        className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl p-5 hover:border-primary/30 hover:bg-gray-900/80 transition-all group flex items-center gap-4"
      >
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <UtensilsCrossed size={24} className="text-primary" />
        </div>

        <div>
          <h3 className="text-white font-semibold">Manage Menu</h3>

          <p className="text-gray-400 text-sm">Add, edit, or remove dishes</p>
        </div>
      </Link>

      <Link
        to="/admin/orders"
        className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl p-5 hover:border-primary/30 hover:bg-gray-900/80 transition-all group flex items-center gap-4"
      >
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <ShoppingBag size={24} className="text-primary" />
        </div>

        <div>
          <h3 className="text-white font-semibold">Manage Orders</h3>

          <p className="text-gray-400 text-sm">
            View and update order statuses
          </p>
        </div>
      </Link>
    </div>
  );
}
