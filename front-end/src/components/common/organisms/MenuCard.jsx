import { memo, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import { formatPrice } from "../../../utils/formatters";
import toast from "react-hot-toast";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=60";

function MenuCard({ item, priority = false }) {
  const { addItem } = useCart();
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      addItem(item, 1);

      toast.success(`${item.name} added to cart!`, {
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
        },
      });
    },
    [addItem, item],
  );

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback((e) => {
    e.currentTarget.src = FALLBACK_IMAGE;
    setImageLoading(false);
  }, []);

  return (
    <Link
      to={`/menu/${item.id}`}
      aria-label={`View ${item.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-warm-100 bg-white shadow-sm transition-[transform,box-shadow] duration-500 ease-out hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
        {imageLoading && (
          <div className="absolute inset-0 z-0 animate-pulse bg-warm-200" />
        )}

        <img
          src={item.image || FALLBACK_IMAGE}
          alt={item.name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width="400"
          height="300"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
            imageLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Image Overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

        {/* Category */}
        <span className="absolute left-3 top-3 z-30 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-warm-700 shadow-sm backdrop-blur-sm">
          {item.category}
        </span>

        {/* Quick Add */}
        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Add ${item.name} to cart`}
          className="absolute bottom-3 right-3 z-30 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-lg transition-[opacity,transform,background-color] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary-dark active:scale-95 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <ShoppingBag size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-warm-900 transition-colors duration-300 group-hover:text-primary">
          {item.name}
        </h3>

        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-warm-500">
          {item.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatPrice(item.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default memo(MenuCard);
