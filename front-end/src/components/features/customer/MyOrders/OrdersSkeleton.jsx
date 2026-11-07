import Skeleton from "../../../common/atoms/Skeleton";

export default function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-white p-6">
          <Skeleton className="mb-3 h-5 w-1/3" />

          <Skeleton className="mb-2 h-4 w-1/2 bg-warm-100" />

          <Skeleton className="h-4 w-1/4 bg-warm-100" />
        </div>
      ))}
    </div>
  );
}
