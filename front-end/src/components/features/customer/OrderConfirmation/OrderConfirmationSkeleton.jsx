import Skeleton from "../../../common/atoms/Skeleton";

export default function OrderConfirmationSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-8 md:pb-12">
      <div className="text-center space-y-4">
        <Skeleton className="mx-auto h-16 w-16 rounded-full" />

        <Skeleton className="mx-auto h-8 w-64" />

        <Skeleton className="mx-auto h-4 w-80 max-w-full" />
      </div>

      <div className="mt-10 rounded-2xl border border-warm-100 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <Skeleton className="h-5 w-1/3" />

          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="border-t border-warm-100 pt-5">
            <Skeleton className="h-6 w-1/3" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-11 flex-1 rounded-xl" />
        <Skeleton className="h-11 flex-1 rounded-xl" />
      </div>
    </div>
  );
}
