import { ChefHat, UtensilsCrossed, Salad, CakeSlice, Wine } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const categories = [
  {
    key: "all",
    label: "All",
    icon: ChefHat,
  },
  {
    key: "Main Course",
    label: "Main Course",
    icon: UtensilsCrossed,
  },
  {
    key: "Appetizer",
    label: "Appetizer",
    icon: Salad,
  },
  {
    key: "Dessert",
    label: "Dessert",
    icon: CakeSlice,
  },
  {
    key: "Beverage",
    label: "Beverage",
    icon: Wine,
  },
];

export default function MenuCategories({ activeCategory, onCategoryChange }) {
  return (
    <>
      {/* Mobile Categories */}
      <div className="mb-8 block sm:hidden">
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          grabCursor={true}
          className="!px-1 !py-2"
        >
          {categories.map(({ key, label, icon: Icon }) => {
            const isActive = activeCategory === key;

            return (
              <SwiperSlide key={key} className="!w-auto">
                <button
                  type="button"
                  onClick={() => onCategoryChange(key)}
                  aria-pressed={isActive}
                  className={`flex select-none items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "scale-[1.02] border-primary bg-primary text-white shadow-lg shadow-primary/30"
                      : "border-warm-200 bg-white text-warm-600 hover:border-warm-300 hover:bg-warm-100 hover:text-warm-800"
                  }`}
                >
                  <Icon size={17} strokeWidth={2} />
                  <span>{label}</span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Desktop Categories */}
      <div className="mb-8 hidden flex-wrap items-center justify-center gap-3 sm:flex lg:gap-4">
        {categories.map(({ key, label, icon: Icon }) => {
          const isActive = activeCategory === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onCategoryChange(key)}
              aria-pressed={isActive}
              className={`flex select-none items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 lg:px-6 ${
                isActive
                  ? "scale-[1.02] border-primary bg-primary text-white shadow-lg shadow-primary/30"
                  : "border-warm-200 bg-white text-warm-600 hover:border-warm-300 hover:bg-warm-100 hover:text-warm-800"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
