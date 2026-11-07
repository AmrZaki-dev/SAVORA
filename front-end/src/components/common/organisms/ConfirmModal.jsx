import { X } from "lucide-react";
import Button from "../atoms/Button";

/**
 * ConfirmModal — Reusable confirmation dialog with overlay.
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {() => void} onConfirm
 * @param {string} title
 * @param {React.ReactNode} children - body content
 * @param {React.ReactNode} icon - optional top icon element
 * @param {string} confirmLabel
 * @param {string} cancelLabel
 * @param {"danger"|"primary"} confirmVariant
 * @param {boolean} loading
 */
export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  children,
  icon,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "danger",
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => !loading && onClose()}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fadeIn">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-white disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          {icon && <div className="mb-4">{icon}</div>}

          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

          <div className="text-gray-400 text-sm mb-6">{children}</div>

          <div className="flex gap-3 justify-center">
            <Button
              variant="admin-outline"
              size="md"
              rounded={false}
              onClick={onClose}
              disabled={loading}
            >
              {cancelLabel}
            </Button>

            <Button
              variant={confirmVariant}
              size="md"
              rounded={false}
              loading={loading}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
