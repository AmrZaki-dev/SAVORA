import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { menuService } from "../../services/menuService";
import { orderService } from "../../services/orderService";

import {
  DashboardPeriodFilter,
  DashboardStats,
  OrdersOverviewChart,
  OrderStatusChart,
  RevenueOverviewChart,
  DashboardQuickActions,
  RecentOrders,
} from "../../components/features/admin/Dashboard";

const TIME_PERIODS = [
  { label: "Today", value: "1d", days: 1 },
  { label: "Last Week", value: "7d", days: 7 },
  { label: "Last Month", value: "30d", days: 30 },
  { label: "Last 3 Months", value: "90d", days: 90 },
  { label: "Last 6 Months", value: "180d", days: 180 },
  { label: "Last Year", value: "365d", days: 365 },
];

function getPeriodStart(days) {
  const d = new Date();

  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - days + 1);

  return d;
}

function buildBuckets(orders, days) {
  const now = new Date();

  now.setHours(23, 59, 59, 999);

  const start = getPeriodStart(days);

  if (days <= 30) {
    const buckets = [];

    for (let i = 0; i < days; i++) {
      const d = new Date(start);

      d.setDate(d.getDate() + i);

      const next = new Date(d);

      next.setDate(next.getDate() + 1);

      const dayOrders = orders.filter((order) => {
        const time = new Date(order.createdAt);

        return time >= d && time < next;
      });

      buckets.push({
        date: d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),

        orders: dayOrders.length,

        revenue: dayOrders
          .filter((order) => order.status !== "cancelled")
          .reduce((sum, order) => sum + Number(order.total || 0), 0),
      });
    }

    return buckets;
  }

  if (days <= 90) {
    const buckets = [];

    let cursor = new Date(start);

    while (cursor <= now) {
      const weekEnd = new Date(cursor);

      weekEnd.setDate(weekEnd.getDate() + 7);

      const weekOrders = orders.filter((order) => {
        const time = new Date(order.createdAt);

        return time >= cursor && time < weekEnd;
      });

      buckets.push({
        date: cursor.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),

        orders: weekOrders.length,

        revenue: weekOrders
          .filter((order) => order.status !== "cancelled")
          .reduce((sum, order) => sum + Number(order.total || 0), 0),
      });

      cursor = weekEnd;
    }

    return buckets;
  }

  const buckets = [];

  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);

  while (cursor <= now) {
    const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);

    const monthOrders = orders.filter((order) => {
      const time = new Date(order.createdAt);

      return time >= cursor && time < monthEnd;
    });

    buckets.push({
      date: cursor.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),

      orders: monthOrders.length,

      revenue: monthOrders
        .filter((order) => order.status !== "cancelled")
        .reduce((sum, order) => sum + Number(order.total || 0), 0),
    });

    cursor = monthEnd;
  }

  return buckets;
}

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState("1d");

  const {
    data: menuItems = [],
    isLoading: menuLoading,
    isError: menuError,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: menuService.getMenu,
  });

  const {
    data: orders = [],
    isLoading: ordersLoading,
    isError: ordersError,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: orderService.getAllOrders,
  });

  const loading = menuLoading || ordersLoading;
  const hasError = menuError || ordersError;

  const selectedPeriod = TIME_PERIODS.find(
    (period) => period.value === activePeriod,
  );

  const periodOrders = useMemo(() => {
    const start = getPeriodStart(selectedPeriod.days);

    return orders.filter((order) => new Date(order.createdAt) >= start);
  }, [orders, selectedPeriod]);

  const totalRevenue = useMemo(
    () =>
      periodOrders
        .filter((order) => order.status !== "cancelled")
        .reduce((sum, order) => sum + Number(order.total || 0), 0),
    [periodOrders],
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "pending",
  ).length;

  const chartData = useMemo(
    () => buildBuckets(orders, selectedPeriod.days),
    [orders, selectedPeriod],
  );

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8),
    [orders],
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-2xl p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded w-2/3 mb-3" />
              <div className="h-8 bg-gray-700 rounded w-1/2" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 h-80 bg-gray-900/50 rounded-2xl animate-pulse" />

          <div className="h-80 bg-gray-900/50 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-center">
          <p className="text-red-400 font-medium">
            Failed to load dashboard data.
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardPeriodFilter
        activePeriod={activePeriod}
        setActivePeriod={setActivePeriod}
        timePeriods={TIME_PERIODS}
      />

      <DashboardStats
        periodOrders={periodOrders}
        menuItems={menuItems}
        pendingOrders={pendingOrders}
        totalRevenue={totalRevenue}
        selectedPeriod={selectedPeriod}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <OrdersOverviewChart
          chartData={chartData}
          selectedPeriod={selectedPeriod}
        />

        <OrderStatusChart orders={orders} />
      </div>

      <RevenueOverviewChart
        chartData={chartData}
        selectedPeriod={selectedPeriod}
      />

      <DashboardQuickActions />

      <RecentOrders orders={recentOrders} />
    </div>
  );
}
