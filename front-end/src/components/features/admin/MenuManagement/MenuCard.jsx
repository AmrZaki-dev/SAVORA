import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";

import { formatPrice } from "../../../../utils/formatters";

export default function MenuCard({
  item,
  index,
  isLast,
  isSearching,
  isPopular,
  onTogglePopular,
  handleToggleAvailability,
  setDeleteModal,
  handleMoveUp,
  handleMoveDown,
  draggedIndex,
}) {
  const isDragged = draggedIndex === index;

  return (
    <div
      className={`relative bg-gray-900 border border-gray-800/80 rounded-2xl overflow-hidden flex transition-colors hover:border-gray-700/50 ${
        isDragged ? "border-primary bg-primary/5" : ""
      } ${!item.available ? "opacity-65" : ""}`}
    >
      {/* Popular */}
      <button
        type="button"
        onClick={() => onTogglePopular(item)}
        title={
          isPopular ? "Remove from Popular Dishes" : "Add to Popular Dishes"
        }
        className={`absolute top-3 left-3 z-10 p-2 rounded-full border transition-all cursor-pointer shadow-md ${
          isPopular
            ? "bg-amber-500 border-amber-400 text-white"
            : "bg-gray-950/85 border-gray-800 text-gray-400 hover:text-white"
        }`}
      >
        <Star size={18} fill={isPopular ? "currentColor" : "none"} />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-4 pl-16 flex flex-col gap-3 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 rounded-xl object-cover border border-gray-800 shrink-0"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=60";
            }}
          />

          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white line-clamp-1">
              {item.name}
            </h4>

            <span className="text-xs text-gray-400 bg-gray-950/40 px-2 py-0.5 rounded-full border border-gray-800/40 mt-1 inline-block">
              {item.category}
            </span>
          </div>
        </div>

        {/* Price & Availability */}
        <div className="flex items-center justify-between border-t border-b border-gray-800 py-2.5">
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
              Price
            </span>

            <span className="text-sm font-bold text-white">
              {formatPrice(item.price)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleToggleAvailability(item)}
            className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer ${
              item.available
                ? "bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25"
                : "bg-red-500/15 text-red-400 hover:bg-red-500/25"
            }`}
          >
            {item.available ? (
              <>
                <ToggleRight size={14} />
                Available
              </>
            ) : (
              <>
                <ToggleLeft size={14} />
                Unavailable
              </>
            )}
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to={`/admin/menu/edit/${item.id}`}
            className="flex-1 py-2 px-3 bg-gray-950/40 hover:bg-primary/10 border border-gray-800/80 hover:border-primary/30 rounded-xl text-gray-300 hover:text-primary transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
          >
            <Pencil size={14} />
            Edit
          </Link>

          <button
            type="button"
            onClick={() => setDeleteModal(item)}
            className="flex-1 py-2 px-3 bg-gray-950/40 hover:bg-red-500/10 border border-gray-800/80 hover:border-red-500/30 rounded-xl text-gray-300 hover:text-red-400 transition-colors flex items-center justify-center gap-1.5 text-xs font-medium cursor-pointer"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      </div>

      {/* Reorder */}
      {!isSearching && (
        <div className="flex flex-col items-center justify-center gap-1.5 px-3 text-gray-500 shrink-0">
          <button
            type="button"
            onClick={() => handleMoveUp(index)}
            disabled={index === 0}
            className="p-1 hover:text-primary disabled:opacity-25 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Move up"
          >
            <ChevronUp size={20} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={() => handleMoveDown(index)}
            disabled={isLast}
            className="p-1 hover:text-primary disabled:opacity-25 transition-colors cursor-pointer disabled:cursor-not-allowed"
            title="Move down"
          >
            <ChevronDown size={20} strokeWidth={2.5} />
          </button>
        </div>
      )}
    </div>
  );
}
