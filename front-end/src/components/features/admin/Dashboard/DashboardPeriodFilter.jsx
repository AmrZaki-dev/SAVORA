import { Calendar } from "lucide-react";

export default function DashboardPeriodFilter({
  activePeriod,
  setActivePeriod,
  timePeriods,
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-gray-300 text-base font-medium shrink-0">
        <Calendar size={18} />
        Period:
      </span>

      <div className="relative">
        <select
          value={activePeriod}
          onChange={(e) => setActivePeriod(e.target.value)}
          className="appearance-none bg-gray-800/80 border border-gray-700/70 text-gray-100 text-base font-semibold rounded-2xl pl-5 pr-12 py-3 cursor-pointer hover:border-primary/60 hover:bg-gray-800 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all duration-200 min-w-[180px]"
        >
          {timePeriods.map((period) => (
            <option
              key={period.value}
              value={period.value}
              className="bg-gray-900 text-gray-100 font-medium"
            >
              {period.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
    </div>
  );
}
