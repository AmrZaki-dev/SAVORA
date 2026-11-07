import Skeleton from "../../../common/atoms/Skeleton";

export default function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 md:pb-12 md:pt-32 lg:px-8">
      <Skeleton className="mb-8 h-9 w-40 md:h-10" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-4 lg:col-span-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex gap-4 rounded-2xl border border-warm-100 bg-white p-4 shadow-sm"
            >
              <Skeleton className="h-24 w-24 shrink-0 rounded-xl sm:h-28 sm:w-28" />

              <div className="min-w-0 flex-1">
                <Skeleton className="mb-3 h-5 w-1/2" />

                <Skeleton className="mb-6 h-4 w-1/4 bg-warm-100" />

                <div className="flex items-center justify-between">
                  <Skeleton className="h-9 w-28 rounded-lg" />

                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-warm-100 bg-white p-6 shadow-sm">
            <Skeleton className="mb-6 h-5 w-1/2" />

            <Skeleton className="mb-4 h-4 w-full bg-warm-100" />

            <Skeleton className="mb-6 h-5 w-1/3" />

            <Skeleton className="h-12 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
