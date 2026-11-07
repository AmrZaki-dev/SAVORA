import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { menuService } from "../../services/menuService";
import { filterAvailableItems, applyMenuOrder } from "../../utils/menuStorage";

import Pagination from "../../components/common/molecules/Pagination";

import {
  MenuHeader,
  MenuCategories,
  MenuSearch,
  MenuSkeleton,
  MenuError,
  MenuEmpty,
  MenuResultsHeader,
  MenuGrid,
} from "../../components/features/customer/Menu";

const ITEMS_PER_PAGE = 12;

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: dishes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menu", search.trim(), activeCategory],

    queryFn: async () => {
      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (activeCategory !== "all") {
        params.category = activeCategory;
      }

      return menuService.getMenu(params);
    },

    select: (data) => applyMenuOrder(filterAvailableItems(data)),

    staleTime: 1000 * 60 * 5,
  });

  /*
   * Reset pagination whenever
   * search or category changes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  /*
   * Pagination calculations
   */
  const totalPages = Math.ceil(dishes.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedDishes = dishes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-secondary/80 to-warm-100">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 md:pb-12 md:pt-32 lg:px-8">
        {/* Header */}
        <MenuHeader />

        {/* Categories */}
        <MenuCategories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Search */}
        <MenuSearch
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
        />

        {/* Loading */}
        {isLoading && <MenuSkeleton />}

        {/* Error */}
        {!isLoading && isError && (
          <MenuError onRetry={() => window.location.reload()} />
        )}

        {/* Empty */}
        {!isLoading && !isError && dishes.length === 0 && (
          <MenuEmpty
            search={search}
            activeCategory={activeCategory}
            onClearFilters={clearFilters}
          />
        )}

        {/* Results */}
        {!isLoading && !isError && dishes.length > 0 && (
          <>
            <MenuResultsHeader
              count={dishes.length}
              search={search}
              activeCategory={activeCategory}
              onClearFilters={clearFilters}
            />

            <MenuGrid dishes={paginatedDishes} />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
