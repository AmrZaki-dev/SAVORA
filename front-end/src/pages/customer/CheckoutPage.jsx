import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import { useCart } from "../../context/CartContext";
import { orderService } from "../../services/orderService";

import {
  CheckoutEmpty,
  CheckoutItems,
  CheckoutSummary,
} from "../../components/features/customer/Checkout";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const placeOrderMutation = useMutation({
    mutationFn: (orderItems) => orderService.createOrder(orderItems),

    onSuccess: (order) => {
      clearCart();

      toast.success("Order placed successfully!", {
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
        },
      });

      navigate(`/order-confirmation/${order.id}`);
    },

    onError: (err) => {
      if (!err._toasted) {
        const message =
          err.response?.data?.message ||
          "Failed to place order. Please try again.";

        toast.error(message);
      }
    },
  });

  const handlePlaceOrder = () => {
    const orderItems = items.map((item) => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
    }));

    placeOrderMutation.mutate(orderItems);
  };

  if (items.length === 0) {
    return <CheckoutEmpty />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      {/* Back to Cart */}
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-warm-600 hover:text-primary font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Cart
      </Link>

      {/* Page Title */}
      <h1 className="font-playfair text-3xl md:text-4xl font-bold text-warm-900 mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <CheckoutItems items={items} />

        <CheckoutSummary
          items={items}
          subtotal={subtotal}
          onPlaceOrder={handlePlaceOrder}
          isPending={placeOrderMutation.isPending}
        />
      </div>
    </div>
  );
}
