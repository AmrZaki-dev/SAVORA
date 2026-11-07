import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Plus, Trash2, GripVertical } from "lucide-react";

import { menuService } from "../../services/menuService";
import { formatPrice } from "../../utils/formatters";

import {
  isItemAvailable,
  setItemAvailability,
  applyMenuOrder,
  setMenuOrder,
  syncNewItems,
  removeItemFromStorage,
  getPopularIds,
  toggleItemPopular,
  MAX_POPULAR,
} from "../../utils/menuStorage";

import SearchBar from "../../components/common/molecules/SearchBar";
import ConfirmModal from "../../components/common/organisms/ConfirmModal";

import {
  MenuRow,
  MenuCard,
} from "../../components/features/admin/MenuManagement/index";

import toast from "react-hot-toast";

export default function MenuManagementPage() {
  const queryClient = useQueryClient();

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [popularIds, setPopularIdsState] = useState(() => getPopularIds());

  // Fetch Menu

  const {
    data: menuData,
    isLoading: menuLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: () => menuService.getMenu(),
    staleTime: 5 * 60 * 1000,
  });

  // Sync Menu Data

  useEffect(() => {
    if (!menuData) return;

    syncNewItems(menuData);

    const ordered = applyMenuOrder(menuData).map((item) => ({
      ...item,
      available: isItemAvailable(item.id),
    }));

    setItems(ordered);
  }, [menuData]);

  // Query Error

  useEffect(() => {
    if (!isError) return;

    console.error("Failed to fetch menu:", error);

    toast.error("Failed to load menu");
  }, [isError, error]);

  // Search

  const isSearching = search.trim().length > 0;

  const filteredItems = isSearching
    ? items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  // Toggle Availability

  const handleToggleAvailability = (item) => {
    const newAvailable = !item.available;

    setItemAvailability(item.id, newAvailable);

    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              available: newAvailable,
            }
          : i,
      ),
    );

    queryClient.invalidateQueries({ queryKey: ["menu"] });

    toast.success(
      `${item.name} is now ${newAvailable ? "available" : "unavailable"}`,
    );
  };



  // Toggle Popular

  const handleTogglePopular = (item) => {
    const result = toggleItemPopular(item.id);

    if (!result.ok && result.limitReached) {
      toast.error(`You can only feature up to ${MAX_POPULAR} popular dishes.`);

      return;
    }

    const next = getPopularIds();

    setPopularIdsState(next);

    const isNowPopular = next.includes(String(item.id));

    queryClient.invalidateQueries({ queryKey: ["menu"] });

    toast.success(
      isNowPopular
        ? `"${item.name}" added to Popular Dishes ⭐`
        : `"${item.name}" removed from Popular Dishes`,
    );
  };

  // Reorder

  const commitReorder = async (reordered) => {
    setItems(reordered);

    const ids = reordered.map((item) => item.id);

    setMenuOrder(ids);

    queryClient.invalidateQueries({ queryKey: ["menu"] });

    try {
      await menuService.reorderMenu(ids);
    } catch (err) {
      console.error("Failed to save order:", err);

      toast.error("Could not save order — please try again.");
    }
  };

  // Drag & Drop

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();

    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    const fromIndex = draggedIndex;

    if (fromIndex === null || fromIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const reordered = [...items];

    const [moved] = reordered.splice(fromIndex, 1);

    reordered.splice(dropIndex, 0, moved);

    setDraggedIndex(null);

    commitReorder(reordered);

    toast.success("Order updated!");
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Arrow Reorder

  const handleMoveUp = (index) => {
    if (index === 0) return;

    const reordered = [...items];

    [reordered[index - 1], reordered[index]] = [
      reordered[index],
      reordered[index - 1],
    ];

    commitReorder(reordered);

    toast.success("Order updated!");
  };

  const handleMoveDown = (index) => {
    if (index === items.length - 1) return;

    const reordered = [...items];

    [reordered[index], reordered[index + 1]] = [
      reordered[index + 1],
      reordered[index],
    ];

    commitReorder(reordered);

    toast.success("Order updated!");
  };

  // Shared Props

  const reorderProps = {
    isSearching,
    handleMoveUp,
    handleMoveDown,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedIndex,
  };

  // Delete

  const handleDelete = async () => {
    if (!deleteModal) return;

    setDeleting(true);

    try {
      await menuService.deleteMenuItem(deleteModal.id);

      removeItemFromStorage(deleteModal.id);

      setItems((prev) => prev.filter((item) => item.id !== deleteModal.id));

      await queryClient.invalidateQueries({
        queryKey: ["menu"],
      });

      toast.success(`${deleteModal.name} deleted successfully`);

      setDeleteModal(null);
    } catch (err) {
      console.error("Failed to delete item:", err);

      toast.error("Failed to delete item");
    } finally {
      setDeleting(false);
    }
  };

  // Render

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Menu Management</h1>

          <p className="text-white text-sm mt-1">{items.length} items total</p>
        </div>

        <Link
          to="/admin/menu/add"
          className="btn-primary inline-flex items-center gap-2 text-sm w-full sm:w-auto"
        >
          <Plus size={18} />
          Add New Dish
        </Link>
      </div>

      {/* Search */}

      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onClear={() => setSearch("")}
        placeholder="Search menu items..."
        theme="dark"
        className="max-w-md"
      />

      {/* Quick Guide */}

      <div className="bg-gray-900/40 border border-gray-800/60 rounded-2xl p-4 space-y-2">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Quick Guide
        </h3>

        <ul className="text-xs text-gray-500 space-y-1.5 list-disc pl-4">
          {!isSearching && items.length > 1 && (
            <li>
              <span className="text-gray-300 font-medium">Reordering:</span>{" "}
              Drag the grip handles (
              <GripVertical
                size={10}
                className="inline text-gray-600 align-middle -mt-0.5"
              />
              ) or use the card arrows to customize the display order (saved
              automatically).
            </li>
          )}



          <li>
            <span className="text-gray-300 font-medium">Popular Star ⭐:</span>{" "}
            Feature dishes on the customer home page. Active items will
            automatically sync to popular dishes (max {MAX_POPULAR}).
          </li>

          <li>
            <span className="text-gray-300 font-medium">
              Availability Status:
            </span>{" "}
            Toggle status between{" "}
            <span className="text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] font-medium">
              Available
            </span>{" "}
            and{" "}
            <span className="text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded text-[10px] font-medium">
              Unavailable
            </span>{" "}
            to instantly show or hide the dish on the customer menus.
          </li>
        </ul>
      </div>

      {/* Search Reordering Warning */}

      {isSearching && (
        <p className="text-xs text-amber-500/80">
          Reordering is disabled while searching. Clear the search to reorder
          items.
        </p>
      )}

      {/* Content */}

      <div>
        {menuLoading ? (
          <div className="p-8 space-y-4 bg-gray-900/60 border border-gray-800/50 rounded-2xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-800/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-900/60 border border-gray-800/50 rounded-2xl">
            <p className="mb-2">No menu items found</p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-primary text-sm hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <>
            {/* DESKTOP */}

            <div className="hidden md:block">
              <div className="bg-gray-900/60 backdrop-blur border border-gray-800/50 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-gray-800/30">
                        <th className="text-left px-6 py-3 font-medium w-32">
                          Popular
                        </th>

                        <th className="text-left px-6 py-3 font-medium w-20">
                          Order
                        </th>

                        <th className="text-left px-6 py-3 font-medium">
                          Dish
                        </th>

                        <th className="text-left px-6 py-3 font-medium">
                          Category
                        </th>

                        <th className="text-left px-6 py-3 font-medium">
                          Price
                        </th>

                        <th className="text-left px-6 py-3 font-medium w-40">
                          Status
                        </th>

                        <th className="text-right px-6 py-3 font-medium">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-800/30">
                      {filteredItems.map((item, index) => (
                        <MenuRow
                          key={item.id}
                          item={item}
                          index={index}
                          isLast={index === filteredItems.length - 1}
                          isPopular={popularIds.includes(String(item.id))}
                          onTogglePopular={handleTogglePopular}
                          handleToggleAvailability={handleToggleAvailability}
                          setDeleteModal={setDeleteModal}
                          {...reorderProps}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* MOBILE */}

            <div className="md:hidden">
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    index={index}
                    isLast={index === filteredItems.length - 1}
                    isPopular={popularIds.includes(String(item.id))}
                    onTogglePopular={handleTogglePopular}
                    handleToggleAvailability={handleToggleAvailability}
                    setDeleteModal={setDeleteModal}
                    {...reorderProps}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Modal */}

      <ConfirmModal
        open={!!deleteModal}
        onClose={() => setDeleteModal(null)}
        onConfirm={handleDelete}
        title="Delete Menu Item"
        confirmLabel={deleting ? "Deleting..." : "Delete"}
        confirmVariant="danger"
        loading={deleting}
        icon={
          <div className="w-14 h-14 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 size={24} className="text-red-400" />
          </div>
        }
      >
        Are you sure you want to delete{" "}
        <strong className="text-white">{deleteModal?.name}</strong>? This action
        cannot be undone.
      </ConfirmModal>
    </div>
  );
}
