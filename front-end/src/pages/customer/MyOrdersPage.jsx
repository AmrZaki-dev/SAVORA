import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { orderService } from "../../services/orderService";

import {
  OrdersHeader,
  OrdersTabs,
  OrdersSkeleton,
  OrdersError,
  OrdersEmpty,
  OrderCard,
} from "../../components/features/customer/MyOrders";

export default function MyOrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: orderService.getMyOrders,
  });

  const filtered =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OrdersHeader />

        <OrdersSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
        <OrdersError />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      <OrdersHeader />

      <OrdersTabs
        activeTab={activeTab}
        orders={orders}
        onTabChange={setActiveTab}
      />

      {filtered.length === 0 ? (
        <OrdersEmpty activeTab={activeTab} />
      ) : (
        <div className="space-y-4">
          {[...filtered]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
        </div>
      )}
    </div>
  );
}
