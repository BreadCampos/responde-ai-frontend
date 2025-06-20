import { Skeleton } from "@/shared/components/ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="p-4 bg-card rounded-lg space-y-4 border h-full w-full max-w-3xl">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-1/2 mr-auto" />
          <Skeleton className="h-15 w-15" />
        </div>
        <div className="space-y-6 mt-8">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
