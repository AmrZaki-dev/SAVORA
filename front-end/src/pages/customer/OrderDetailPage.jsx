import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { orderService } from "../../services/orderService";

import {
  OrderDetailHeader,
  OrderProgress,
  OrderCancelled,
  OrderItems,
  OrderDetailSkeleton,
  OrderDetailError,
} from "../../components/features/customer/OrderDetail";

export default function OrderDetailPage() {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !order) {
    return <OrderDetailError />;
  }

  const isCancelled = order.status === "cancelled";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      <Link
        to="/my-orders"
        className="inline-flex items-center gap-2 text-warm-600 hover:text-primary font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to My Orders
      </Link>

      <OrderDetailHeader order={order} />

      {!isCancelled && <OrderProgress status={order.status} />}

      {isCancelled && <OrderCancelled />}

      <OrderItems items={order.items} total={order.total} />
    </div>
  );
}
