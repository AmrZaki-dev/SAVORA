import { Check } from "lucide-react";

import { formatPrice } from "../../../../utils/formatters";

import ProductActions from "./ProductActions";

export default function ProductInfo({
  item,
  quantity,
  onQuantityChange,
  onAddToCart,
}) {
  return (
    <div className="flex flex-col">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-900">
        {item.name}
      </h1>

      <p className="text-primary text-2xl md:text-3xl font-bold mt-3">
        {formatPrice(item.price)}
      </p>

      <p className="text-warm-600 text-base leading-relaxed mt-4">
        {item.description}
      </p>

      {/* Availability */}
      <div className="mt-5 flex items-center gap-2">
        {item.available !== false ? (
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium text-sm">
            <Check size={16} className="bg-emerald-100 rounded-full p-0.5" />
            Available
          </span>
        ) : (
          <span className="text-red-500 font-medium text-sm">
            Currently Unavailable
          </span>
        )}
      </div>

      <ProductActions
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        onAddToCart={onAddToCart}
        disabled={item.available === false}
      />
    </div>
  );
}
