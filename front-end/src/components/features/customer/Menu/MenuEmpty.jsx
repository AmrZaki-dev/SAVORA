import { UtensilsCrossed } from "lucide-react";

export default function MenuEmpty({ search, activeCategory, onClearFilters }) {
  const hasFilters = search || activeCategory !== "all";

  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <UtensilsCrossed size={40} strokeWidth={1.8} />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-warm-700">
        No dishes found
      </h3>

      <p className="mx-auto max-w-md text-warm-500">
        {search
          ? `No results for "${search}". Try a different search term.`
          : "No dishes available in this category."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-primary/90"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
