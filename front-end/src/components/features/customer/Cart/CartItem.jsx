import { Trash2 } from "lucide-react";
import { formatPrice } from "../../../../utils/formatters";
import QuantitySelector from "../../../common/molecules/QuantitySelector";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=60";

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-warm-100 bg-white p-4 shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
        onError={(e) => {
          e.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-warm-900">
              {item.name}
            </h3>

            <p className="mt-1 font-bold text-primary">
              {formatPrice(item.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.menuItemId)}
            className="shrink-0 rounded-lg p-2 text-warm-400 transition-colors hover:bg-red-50 hover:text-red-500"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(newQty) => onQuantityChange(item.menuItemId, newQty)}
          />

          <span className="font-bold text-warm-900">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
