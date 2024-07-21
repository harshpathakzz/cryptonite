"use client";
import { useQuery } from "@tanstack/react-query";
import { exploreCoins } from "@/lib/api";
import React, { useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import CoinCard from "@/components/CoinCard";
import Link from "next/link";
import { Skeleton } from "@/components/Skeleton";
import { useErrorHandling } from "@/hooks/useErrorHandling";
export default function ExplorePage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, error, data, isFetching, isError } = useQuery({
    queryKey: ["exploreCoins", pageNumber],
    queryFn: () => exploreCoins(pageNumber),
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setPageNumber(newPage);
    }
  };
  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full mx-auto">
        {isLoading ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 21 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <div className="w-full">
            <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((coin: any) => (
                <div
                  key={coin.id}
                  draggable={true}
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({
                        id: coin.id,
                        symbol: coin.symbol,
                        name: coin.name,
                        price_change_percentage_24h:
                          coin.price_change_percentage_24h,
                      })
                    );
                    console.log("dragging", coin.id);
                  }}
                  onDragEnd={() => {
                    console.log("Drag end");
                  }}
                >
                  <Link href={`/coins/${coin.id}`} key={coin.id}>
                    <CoinCard key={coin.id} coin={coin} />
                  </Link>
                </div>
              ))}
            </ul>
            {isFetching && <p className="text-center">Updating...</p>}
          </div>
        )}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handlePageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="p-2"
          >
            <CircleChevronLeft size={24} />
          </button>
          <span>Page {pageNumber}</span>
          <button
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={isFetching}
            className="p-2"
          >
            <CircleChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
