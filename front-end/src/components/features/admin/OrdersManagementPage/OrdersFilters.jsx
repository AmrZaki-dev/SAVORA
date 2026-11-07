import { Search, Filter } from "lucide-react";
import { capitalize } from "../../../../utils/formatters";

const STATUS_FILTERS = [
  "all",
  "pending",
  "preparing",
  "completed",
  "cancelled",
];

export default function OrdersFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  orders,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
      {/* Search */}
      <div className="relative w-full sm:max-w-xs">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search by order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/60 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm"
        />
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 flex-wrap items-center overflow-x-auto pb-1 max-w-full w-full sm:w-auto">
        <Filter size={16} className="text-gray-500 shrink-0 hidden sm:block" />

        {STATUS_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setStatusFilter(filter)}
            className={`
              px-3 py-1.5 rounded-full text-xs font-semibold capitalize
              transition-all whitespace-nowrap cursor-pointer
              ${
                statusFilter === filter
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800"
              }
            `}
          >
            {capitalize(filter)}

            {filter !== "all" && (
              <span className="ml-1 opacity-70">
                ({orders.filter((o) => o.status === filter).length})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
