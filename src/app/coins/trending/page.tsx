"use client";
import { useQuery } from "@tanstack/react-query";
import { getTrendingCoins } from "@/lib/api";
import TrendingCoinCard from "@/components/TrendingCoinCard";
import Link from "next/link";
import { Skeleton } from "@/components/Skeleton";
import { useErrorHandling } from "@/hooks/useErrorHandling";

export default function TrendingPage() {
  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["trendingCoins"],
    queryFn: () => getTrendingCoins(),
  });

  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        {isLoading ? (
          <div className="w-full  gap-4 flex flex-col gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full" />
            ))}
          </div>
        ) : (
          <div className="w-full">
            {data?.map((coin: any) => (
              <Link href={`/coins/${coin.item.id}`} key={coin.item.id}>
                <TrendingCoinCard key={coin.item.id} coin={coin} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
