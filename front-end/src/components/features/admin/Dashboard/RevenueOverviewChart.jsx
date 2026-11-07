import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { formatPrice } from "../../../../utils/formatters";

export default function RevenueOverviewChart({ chartData, selectedPeriod }) {
  return (
    <div className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl p-5 md:p-6">
      <div className="mb-6">
        <h2 className="text-white font-semibold text-lg">Revenue Overview</h2>

        <p className="text-gray-500 text-sm mt-1">{selectedPeriod.label}</p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
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
              stroke="#6b7280"
              tick={{
                fill: "#9ca3af",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [formatPrice(value), "Revenue"]}
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

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#f97316"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
