import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { orderService } from "../../services/orderService";

import {
  OrderConfirmationHeader,
  OrderDetails,
  OrderActions,
  OrderConfirmationError,
  OrderConfirmationSkeleton,
} from "../../components/features/customer/OrderConfirmation";

export default function OrderConfirmationPage() {
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
    return <OrderConfirmationSkeleton />;
  }

  if (isError || !order) {
    return <OrderConfirmationError />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      <OrderConfirmationHeader />

      <OrderDetails order={order} />

      <OrderActions />
    </div>
  );
}
