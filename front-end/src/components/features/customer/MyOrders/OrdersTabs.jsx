import { capitalize } from "../../../../utils/formatters";

const STATUS_TABS = ["all", "pending", "preparing", "completed", "cancelled"];

export default function OrdersTabs({ activeTab, orders, onTabChange }) {
  return (
    <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto pb-2">
      {STATUS_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium
            transition-all whitespace-nowrap
            ${
              activeTab === tab
                ? "bg-primary text-white shadow-md"
                : "bg-white text-warm-600 hover:bg-warm-100 border border-warm-200"
            }
          `}
        >
          {capitalize(tab)}

          {tab !== "all" && (
            <span className="ml-1.5 text-xs opacity-80">
              ({orders.filter((order) => order.status === tab).length})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
