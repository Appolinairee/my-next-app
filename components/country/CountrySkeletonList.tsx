import { Skeleton } from "../base/Skeleton";

export function CountrySkeletonCard() {
  return (
    <div className="border border-black/10 rounded-[20px] shadow-soft overflow-hidden">
      <Skeleton className="h-40 w-full rounded-[10px] mb-3" />

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-5 w-1/2 rounded" />
          <Skeleton className="h-5 w-1/4 rounded-full" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
}

export function CountrySkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
      {Array.from({ length: count }).map((_, index) => (
        <CountrySkeletonCard key={index} />
      ))}
    </div>
  );
}
