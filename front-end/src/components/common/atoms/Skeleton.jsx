export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded bg-warm-200 ${className}`}
      aria-hidden="true"
    />
  );
}
