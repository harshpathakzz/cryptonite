"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useWatchlistStore } from "@/store/watchListStore";
import { getWatchListCoins } from "@/lib/api";
import Link from "next/link";
import WatchListCoinCard from "@/components/WatchListCoinCard";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { Skeleton } from "@/components/Skeleton";

const WatchListPage = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const watchlistIds = watchlist.map((item) => item.id);
  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["exploreCoins", watchlistIds],
    queryFn: () => getWatchListCoins(watchlistIds),
    gcTime: 3600000, //Cache time of 1 hour
    staleTime: 55000, //Stale time of 55 seconds
    refetchInterval: 5 * 60000, //Refetch every 60 seconds
  });

  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-left">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className=" text-lg text-accent-foreground  text-left">
          Your watchlist is empty. Add some coins to track!
        </p>
      ) : (
        <div className="space-y-6">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <Skeleton key={index} className="h-24 w-full" />
                ))
            : data?.map((coin: any) => (
                <Link
                  href={`/coins/${coin.id}`}
                  key={coin.id}
                  className="block"
                >
                  <div className="">
                    <WatchListCoinCard coin={coin} />
                  </div>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default WatchListPage;
