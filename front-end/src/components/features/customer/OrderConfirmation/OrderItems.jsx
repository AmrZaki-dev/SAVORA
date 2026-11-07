import { formatPrice } from "../../../../utils/formatters";

export default function OrderItems({ items }) {
  return (
    <div className="divide-y divide-warm-100">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between py-3">
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
  );
}
