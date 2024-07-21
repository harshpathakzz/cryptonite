"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useWatchlistStore } from "@/store/watchListStore";
import { getWatchListCoins } from "@/lib/api";
import Link from "next/link";
import WatchListCoinCard from "@/components/WatchListCoinCard";

const WatchListPage = () => {
  const watchlist = useWatchlistStore((state) => state.watchlist);
  const watchlistIds = watchlist.map((item) => item.id);

  const { isLoading, error, data } = useQuery({
    queryKey: ["exploreCoins", watchlistIds],
    queryFn: () => getWatchListCoins(watchlistIds),
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p className="text-center text-lg text-gray-600 dark:text-gray-400">
          Your watchlist is empty. Add some coins to track!
        </p>
      ) : (
        <div className="space-y-6 ">
          {data?.map((coin: any) => (
            <Link href={`/coins/${coin.id}`} key={coin.id} className="block">
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
