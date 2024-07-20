"use client";
import { useQuery } from "@tanstack/react-query";
import { exploreCoins } from "@/lib/api";
import React, { useState } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import CoinCard from "@/components/CoinCard";

export default function ExplorePage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["exploreCoins", pageNumber],
    queryFn: () => exploreCoins(pageNumber),
  });

  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setPageNumber(newPage);
    }
  };

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
            <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.map((coin: any) => (
                <CoinCard key={coin.id} coin={coin} />
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
