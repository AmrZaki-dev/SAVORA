import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import MenuCard from "../../../common/organisms/MenuCard";

export default function PopularDishes({ dishes, loading }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="text-center mb-9">
        <span className="text-primary text-sm font-semibold uppercase tracking-widest">
          Our Menu
        </span>

        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-warm-900 mt-2">
          Popular Dishes
        </h2>

        <p className="text-warm-500 mt-3 max-w-xl mx-auto text-sm md:text-base">
          Discover some of our favorite dishes, prepared with fresh ingredients
          and served with love.
        </p>
      </div>

      {/* Dishes */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-warm-200" />

              <div className="p-5 space-y-3">
                <div className="h-4 bg-warm-200 rounded w-3/4" />

                <div className="h-3 bg-warm-100 rounded w-full" />

                <div className="h-6 bg-warm-200 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : dishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <MenuCard key={dish.id} item={dish} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-warm-500">No dishes are currently available.</p>
        </div>
      )}

      {/* View Full Menu */}
      <div className="text-center mt-10">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300"
        >
          View Full Menu
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
