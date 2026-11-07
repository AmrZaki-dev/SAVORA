import OrderItems from "./OrderItems";
import OrderStatus from "./OrderStatus";
import {
  formatDateTime,
  formatOrderId,
  formatPrice,
} from "../../../../utils/formatters";

export default function OrderDetails({ order }) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-warm-100">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-warm-100">
        <div>
          <p className="text-sm text-warm-500">Order ID</p>

          <p className="font-bold text-warm-900 text-lg">
            {formatOrderId(order.id)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-warm-500">Date</p>

          <p className="text-warm-700 text-sm">
            {formatDateTime(order.createdAt)}
          </p>
        </div>
      </div>

      <OrderItems items={order.items} />

      <div className="flex justify-between pt-4 mt-4 border-t-2 border-warm-200 text-lg font-bold">
        <span className="text-warm-900">Total</span>

        <span className="text-primary">{formatPrice(order.total)}</span>
      </div>

      <OrderStatus status={order.status} />
    </div>
  );
}
