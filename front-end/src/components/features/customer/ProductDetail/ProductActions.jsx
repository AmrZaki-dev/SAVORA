import { ShoppingBag } from "lucide-react";

import QuantitySelector from "../../../common/molecules/QuantitySelector";
import Button from "../../../common/atoms/Button";

export default function ProductActions({
  quantity,
  onQuantityChange,
  onAddToCart,
  disabled,
}) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <QuantitySelector
        quantity={quantity}
        onChange={onQuantityChange}
        className="border-warm-300 rounded-xl"
      />

      <Button
        onClick={onAddToCart}
        disabled={disabled}
        variant="primary"
        size="lg"
        className="px-8"
      >
        <ShoppingBag size={20} className="mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}
