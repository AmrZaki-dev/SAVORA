import {
  ClipboardList,
  UtensilsCrossed,
  Clock,
  TrendingUp,
} from "lucide-react";

import { formatPrice } from "../../../../utils/formatters";

export default function DashboardStats({
  periodOrders,
  menuItems,
  pendingOrders,
  totalRevenue,
  selectedPeriod,
}) {
  const stats = [
    {
      title: "Total Orders",
      value: periodOrders.length,
      icon: ClipboardList,
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      periodLabel: true,
    },
    {
      title: "Menu Items",
      value: menuItems.length,
      icon: UtensilsCrossed,
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-400",
      periodLabel: false,
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      bgColor: "bg-amber-500/10",
      textColor: "text-amber-400",
      periodLabel: false,
    },
    {
      title: "Revenue",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      periodLabel: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl p-5 hover:border-gray-700/50 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400 font-medium">
              {stat.title}
            </span>

            <div className={`p-2 rounded-xl ${stat.bgColor}`}>
              <stat.icon size={18} className={stat.textColor} />
            </div>
          </div>

          <p className="text-2xl font-bold text-white">{stat.value}</p>

          {stat.periodLabel && (
            <p className="text-[11px] text-gray-500 mt-1">
              {selectedPeriod.label.toLowerCase()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
