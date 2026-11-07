import { useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=60";

export default function ProductImage({ item }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-warm-100">
      {imageLoading && (
        <div className="absolute inset-0 bg-warm-200 animate-pulse" />
      )}

      <img
        src={item.image}
        alt={item.name}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setImageLoading(false)}
        onError={(e) => {
          e.target.src = FALLBACK_IMAGE;
          setImageLoading(false);
        }}
      />

      <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-white text-sm font-semibold rounded-full">
        {item.category}
      </span>
    </div>
  );
}
