import { AlertTriangle } from "lucide-react";

export default function MenuError({ onRetry }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle size={40} strokeWidth={1.8} />
      </div>

      <h3 className="mb-2 text-xl font-semibold text-warm-700">
        Failed to load menu
      </h3>

      <p className="mb-5 text-warm-500">
        Something went wrong while loading the dishes.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 font-medium text-white shadow-md transition-colors hover:bg-primary/90"
      >
        Try Again
      </button>
    </div>
  );
}
