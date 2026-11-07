import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { orderService } from "../../services/orderService";
import { formatOrderId } from "../../utils/formatters";

import {
  OrdersFilters,
  OrdersList,
} from "../../components/features/admin/OrdersManagementPage/index";

export default function OrdersManagementPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getAllOrders(),
    staleTime: 2 * 60 * 1000,
  });

  if (isError) {
    console.error("Failed to fetch orders:", error);
  }

  const filteredOrders = orders
    .filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const searchValue = search.toLowerCase();

      const matchesSearch =
        formatOrderId(order.id).toLowerCase().includes(searchValue) ||
        order.userId.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-secondary">Orders Management</h1>

        <p className="text-white text-sm mt-1">{orders.length} orders total</p>
      </div>

      {/* Filters */}
      <OrdersFilters
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        orders={orders}
      />

      {/* Orders */}
      <OrdersList
        orders={filteredOrders}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
