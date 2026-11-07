import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { menuService } from "../../services/menuService";
import { useCart } from "../../context/CartContext";

import {
  ProductImage,
  ProductInfo,
  RelatedItems,
  ProductDetailSkeleton,
  ProductDetailError,
} from "../../components/features/customer/ProductDetail";

import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);

  const {
    data: item,
    isLoading: itemLoading,
    isError: itemError,
  } = useQuery({
    queryKey: ["menuItem", id],
    queryFn: () => menuService.getMenuItem(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  const { data: related = [], isLoading: relatedLoading } = useQuery({
    queryKey: ["relatedMenuItems", item?.category],

    queryFn: async () => {
      const data = await menuService.getMenu({
        category: item.category,
      });

      return data.filter((menuItem) => menuItem.id !== item.id).slice(0, 4);
    },

    enabled: !!item?.category,
    staleTime: 1000 * 60 * 5,
  });

  const loading = itemLoading || relatedLoading;

  const handleAddToCart = () => {
    if (!item) return;

    addItem(item, quantity);

    toast.success(`${quantity}x ${item.name} added to cart!`, {
      style: {
        borderRadius: "12px",
        background: "#1a1a1a",
        color: "#fff",
      },
    });
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (itemError || !item) {
    return <ProductDetailError />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      <Link
        to="/menu"
        className="inline-flex items-center gap-2 text-warm-600 hover:text-primary font-medium mb-8 transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductImage item={item} />

        <ProductInfo
          item={item}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </div>

      <RelatedItems items={related} />
    </div>
  );
}
