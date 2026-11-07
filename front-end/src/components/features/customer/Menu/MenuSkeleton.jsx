import Skeleton from "../../../common/atoms/Skeleton";

export default function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <Skeleton className="h-48 rounded-none" />

          <div className="space-y-3 p-5">
            <Skeleton className="h-4 w-3/4" />

            <Skeleton className="h-3 w-full bg-warm-100" />

            <Skeleton className="h-3 w-5/6 bg-warm-100" />

            <Skeleton className="mt-4 h-6 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
