import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function OrdersOverviewChart({ chartData, selectedPeriod }) {
  return (
    <div className="xl:col-span-2 bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl p-5 md:p-6">
      <div className="mb-6">
        <h2 className="text-white font-semibold text-lg">Orders Overview</h2>

        <p className="text-gray-500 text-sm mt-1">{selectedPeriod.label}</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{
                fill: "#9ca3af",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />

            <YAxis
              allowDecimals={false}
              stroke="#6b7280"
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#9ca3af",
              }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#f97316"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#111827",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
