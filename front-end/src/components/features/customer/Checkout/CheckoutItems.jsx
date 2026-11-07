import { formatPrice } from "../../../../utils/formatters";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=60";

export default function CheckoutItems({ items }) {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-100">
        <h2 className="text-lg font-bold text-warm-900 mb-4">Order Items</h2>

        <div className="divide-y divide-warm-100">
          {items.map((item) => (
            <div
              key={item.menuItemId}
              className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-warm-900 text-sm">
                  {item.name}
                </h3>

                <p className="text-warm-500 text-sm">Qty: {item.quantity}</p>
              </div>

              <span className="font-semibold text-warm-900 text-sm">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
