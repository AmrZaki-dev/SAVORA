import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  ToggleLeft,
  ToggleRight,
  GripVertical,
  Star,
} from "lucide-react";

import { formatPrice } from "../../../../utils/formatters";

export default function MenuRow({
  item,
  index,
  isSearching,
  isPopular,
  onTogglePopular,
  handleToggleAvailability,
  setDeleteModal,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  draggedIndex,
}) {
  const isDragged = draggedIndex === index;

  return (
    <tr
      onDragOver={(e) => handleDragOver(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      className={`border-b border-gray-800/30 transition-colors hover:bg-gray-800/30 ${
        isDragged ? "bg-primary/5 border-primary/30" : ""
      } ${!item.available ? "opacity-60" : ""}`}
    >
      {/* Popular */}
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => onTogglePopular(item)}
          title={
            isPopular ? "Remove from Popular Dishes" : "Add to Popular Dishes"
          }
          className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer w-24 ${
            isPopular
              ? "bg-amber-500/15 text-amber-400 hover:bg-amber-500/25"
              : "bg-gray-800/60 text-gray-500 hover:bg-gray-700/60 hover:text-gray-300"
          }`}
        >
          <Star size={12} fill={isPopular ? "currentColor" : "none"} />

          {isPopular ? "Popular" : "Add"}
        </button>
      </td>
      {/* Drag Handle */}
      <td className="px-6 py-4">
        <div className="flex items-center text-gray-500">
          {!isSearching ? (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              className="cursor-grab active:cursor-grabbing p-1 hover:text-primary transition-colors"
              title="Drag to reorder"
            >
              <GripVertical size={16} />
            </div>
          ) : (
            <span className="text-[10px] text-gray-600 select-none">-</span>
          )}
        </div>
      </td>

      {/* Dish */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-xl object-cover border border-gray-800"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=60";
            }}
          />

          <span className="text-sm font-medium text-white">{item.name}</span>
        </div>
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-sm text-gray-400">{item.category}</td>

      {/* Price */}
      <td className="px-6 py-4 text-sm font-semibold text-white">
        {formatPrice(item.price)}
      </td>

      {/* Availability */}
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => handleToggleAvailability(item)}
          className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-colors cursor-pointer w-32 ${
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
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1">
          <Link
            to={`/admin/menu/edit/${item.id}`}
            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
            title="Edit"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => setDeleteModal(item)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
