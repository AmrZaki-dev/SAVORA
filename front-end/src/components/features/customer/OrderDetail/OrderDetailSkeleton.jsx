import Skeleton from "../../../common/atoms/Skeleton";

export default function OrderDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Progress */}
      <div className="mb-8 rounded-2xl border border-warm-100 bg-white p-6 shadow-sm">
        <Skeleton className="mb-6 h-5 w-40" />

        <div className="flex items-center justify-between">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />

              {index < 3 && <Skeleton className="hidden h-1 w-12 sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Order Info */}
      <div className="rounded-2xl border border-warm-100 bg-white p-6 shadow-sm">
        <Skeleton className="mb-6 h-6 w-48" />

        <div className="space-y-4">
          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="flex justify-between gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Items */}
        <div className="mt-8 space-y-4 border-t border-warm-100 pt-6">
          <Skeleton className="h-5 w-32" />

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-warm-100 p-4"
            >
              <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
              </div>

              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-between border-t border-warm-100 pt-6">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>
    </div>
  );
}
