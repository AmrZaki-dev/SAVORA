import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import {
  CartItemsList,
  CartSummary,
  CartEmpty,
  CartSkeleton,
} from "../../components/features/customer/Cart";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    cartCount,
    cartLoading,
  } = useCart();

  const { isAuthenticated } = useAuth();

  // Loading State
  if (cartLoading) {
    return <CartSkeleton />;
  }

  // Empty Cart
  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 md:pb-12 md:pt-32 lg:px-8">
      {/* Page Header */}
      <h1 className="mb-8 font-playfair text-3xl font-bold text-warm-900 md:text-4xl">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <CartItemsList
          items={items}
          onRemove={removeItem}
          onQuantityChange={updateQuantity}
        />

        {/* Order Summary */}
        <CartSummary
          cartCount={cartCount}
          subtotal={subtotal}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}
