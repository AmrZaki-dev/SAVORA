export default function MenuResultsHeader({
  count,
  search,
  activeCategory,
  onClearFilters,
}) {
  const hasFilters = search || activeCategory !== "all";

  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-sm text-warm-500">
        {count} dish{count !== 1 ? "es" : ""} found
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="text-sm font-medium text-primary transition-all hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
