import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  OrderDetailsHeader,
  OrderItemsSummary,
  OrderStatusCard,
} from "../../components/features/admin/AdminOrderDetail/index";

import { orderService } from "../../services/orderService";
import { capitalize } from "../../utils/formatters";

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus) => orderService.updateOrderStatus(id, newStatus),

    onSuccess: (updatedOrder) => {
      queryClient.setQueryData(["order", id], updatedOrder);

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });

      toast.success(
        `Order status updated to ${capitalize(updatedOrder.status)}!`,
      );
    },

    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to update order status.";

      toast.error(message);
    },
  });

  const handleStatusChange = (newStatus) => {
    updateStatusMutation.mutate(newStatus);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 text-center py-12">
        <h2 className="text-xl font-bold text-white">Order Not Found</h2>

        <Link to="/admin/orders" className="btn-primary inline-block">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <OrderDetailsHeader
        order={order}
        isPending={updateStatusMutation.isPending}
        onStatusChange={handleStatusChange}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OrderItemsSummary items={order.items} total={order.total} />

        <OrderStatusCard status={order.status} />
      </div>
    </div>
  );
}
