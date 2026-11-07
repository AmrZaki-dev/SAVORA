import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const STATUS_COLORS = {
  pending: "#f59e0b",
  preparing: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

const STATUS_LABELS = {
  pending: "Pending",
  preparing: "Preparing",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function OrderStatusChart({ orders }) {
  const statuses = ["pending", "preparing", "completed", "cancelled"];

  const statusData = statuses
    .map((status) => ({
      name: STATUS_LABELS[status],
      value: orders.filter((order) => order.status === status).length,
      status,
    }))
    .filter((item) => item.value > 0);

  return (
    <div className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl p-5 md:p-6">
      <div className="mb-4">
        <h2 className="text-white font-semibold text-lg">Order Status</h2>

        <p className="text-gray-500 text-sm mt-1">Current order distribution</p>
      </div>

      {statusData.length === 0 ? (
        <div className="h-72 flex items-center justify-center text-gray-500 text-sm">
          No orders yet
        </div>
      ) : (
        <>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {statusData.map((item) => (
                    <Cell key={item.status} fill={STATUS_COLORS[item.status]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            {statusData.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{
                    backgroundColor: STATUS_COLORS[item.status],
                  }}
                />

                <span className="text-xs text-gray-400">{item.name}</span>

                <span className="text-xs font-semibold text-white ml-auto">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
