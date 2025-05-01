import { Skeleton } from "../base/Skeleton";

export function UserSkeletonCard() {
  return (
    <div className="flex items-center space-x-4 ">
      <Skeleton className="w-[80px] h-[80px] rounded-full" />
      <div className="flex flex-col space-y-2 flex-1">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-2/5" />
      </div>
    </div>
  );
}

export function UserSkeletonList({ count = 10 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 mt-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 gap-x-[4%]">
      {Array.from({ length: count }).map((_, index) => (
        <UserSkeletonCard key={index} />
      ))}
    </div>
  );
}
