import { formatPrice } from "../../../../utils/formatters";

export default function OrderItemsSummary({ items, total }) {
  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white mb-4">Items Summary</h2>

        <div className="divide-y divide-gray-800/50">
          {items.map((item, index) => (
            <div
              key={`${item.menuItemId}-${index}`}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  ID: {item.menuItemId}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatPrice(item.price)} × {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <span className="text-sm font-semibold text-white">
                  {formatPrice(item.lineTotal)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t-2 border-gray-800/80 flex justify-between text-base font-bold">
          <span className="text-gray-400">Grand Total</span>

          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
