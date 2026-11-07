import { formatPrice } from "../../../../utils/formatters";

export default function OrderItems({ items, total }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
      <h2 className="font-semibold text-warm-900 mb-4">Order Items</h2>

      <div className="divide-y divide-warm-100">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between py-3 first:pt-0 last:pb-0"
          >
            <div>
              <p className="font-medium text-warm-900">{item.name}</p>

              <p className="text-sm text-warm-500">
                {formatPrice(item.price)} × {item.quantity}
              </p>
            </div>

            <span className="font-semibold text-warm-900">
              {formatPrice(item.lineTotal)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4 mt-4 border-t-2 border-warm-200 text-lg font-bold">
        <span className="text-warm-900">Total</span>

        <span className="text-primary">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
