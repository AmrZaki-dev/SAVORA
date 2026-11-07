import Skeleton from "../../../common/atoms/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-8 h-6 w-32" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Skeleton className="h-[400px] rounded-2xl" />

        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />

          <Skeleton className="h-10 w-1/3" />

          <Skeleton className="h-4 w-full bg-warm-100" />

          <Skeleton className="h-4 w-5/6 bg-warm-100" />
        </div>
      </div>
    </div>
  );
}
