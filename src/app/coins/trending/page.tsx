"use client";
import { useQuery } from "@tanstack/react-query";
import { getTrendingCoins } from "@/lib/api";
import TrendingCoinCard from "@/components/TrendingCoinCard";
import Link from "next/link";

export default function ExplorePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["trendingCoins"],
    queryFn: () => getTrendingCoins(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">
            Error: {(error as Error).message}
          </p>
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
