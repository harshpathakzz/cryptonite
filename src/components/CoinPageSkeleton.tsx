import React from "react";
import { Skeleton } from "@/components/Skeleton";

const CoinPageSkeleton: React.FC = () => (
  <>
    <div className="bg-card rounded-lg shadow-md p-6 flex flex-col border m-2">
      <div className="flex items-center mb-4">
        <Skeleton className="h-24 w-24 rounded-full mr-4" />
        <div className="flex flex-col">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {[...Array(2)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
    <div className="mt-8">
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-64 w-full" />
    </div>
    <div className="mt-8">
      <Skeleton className="h-8 w-48 mb-4" />
      <Skeleton className="h-40 w-full" />
    </div>
  </>
);

export default CoinPageSkeleton;
