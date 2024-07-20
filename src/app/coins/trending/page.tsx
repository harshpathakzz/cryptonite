"use client";
import { useQuery } from "@tanstack/react-query";
import { getTrendingCoins } from "@/lib/api";
import Image from "next/image";

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
            <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.map((coin: any) => (
                <li
                  key={coin.item.id}
                  className="bg-background rounded-lg shadow-md p-4"
                >
                  <div className="flex items-center mb-2">
                    <Image
                      src={coin.item.thumb}
                      alt={coin.item.name}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <h2 className="text-xl font-semibold">{coin.item.name}</h2>
                    <span className="ml-2 text-gray-500">
                      {coin.item.symbol}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Rank: {coin.item.market_cap_rank || "N/A"}
                  </p>
                  <p className="text-sm mb-2">
                    24h Change:
                    <span
                      className={
                        (coin.item.data?.price_change_percentage_24h?.usd ||
                          0) >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {(
                        coin.item.data?.price_change_percentage_24h?.usd || 0
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                  <p className="text-sm mb-2">
                    Market Cap: $
                    {(coin.item.data.market_cap || 0).toLocaleString()}
                  </p>
                  <p className="text-sm mb-4">
                    Volume: $
                    {(coin.item.data.total_volume || 0).toLocaleString()}
                  </p>
                  {coin.item.data.sparkline && (
                    <Image
                      src={coin.item.data.sparkline}
                      alt={`${coin.item.name} price chart`}
                      width={200}
                      height={50}
                      className="w-full h-auto"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
