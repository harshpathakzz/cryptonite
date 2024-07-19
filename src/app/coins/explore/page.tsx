"use client";

import { useQuery } from "@tanstack/react-query";
import { exploreCoins } from "@/lib/api";
import React, { useState, useEffect } from "react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import CoinCard from "@/components/CoinCard";

export default function ExplorePage() {
  const [pageNumber, setPageNumber] = useState(1);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["exploreCoins", pageNumber],
    queryFn: () => exploreCoins(pageNumber),
  });

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setPageNumber(newPage);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <div>
          <ul className="list-none p-0">
            {data?.map((coin: any) => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </ul>
          {isFetching ? <p>Updating...</p> : null}
        </div>
      )}
      <div className="flex items-center justify-between gap-4 mb-4 ">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
          className=""
        >
          <CircleChevronLeft size={24} />
        </button>
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={isFetching}
          className=""
        >
          <CircleChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
