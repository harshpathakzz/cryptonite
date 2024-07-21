"use client";
import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchCoin } from "@/lib/api";
import useDebounce from "@/hooks/useDebounce";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import Link from "next/link";
import Image from "next/image";

interface Coin {
  id: string;
  name: string;
  thumb: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 500);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["searchCoin", debouncedQuery],
    queryFn: () => searchCoin(debouncedQuery),
    enabled: !!debouncedQuery,
    gcTime: 3600000, //Cache time of 1 hour
    staleTime: 1800000, //Stale time of 30 min
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  return (
    <div className="flex flex-col w-full relative" ref={searchBarRef}>
      <div className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for a coin..."
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-10"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014 12H0c0 3.042 1.135 5.82 3 7.938l3-2.647zM20 12a8 8 0 01-8 8v4c6.627 0 12-5.373 12-12h-4zm-2-5.291A8.003 8.003 0 0120 12h4c0-3.042-1.135-5.82-3-7.938l-3 2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
      {isFocused && data && (
        <div className="absolute top-[2.5rem] w-full bg-primary-foreground max-h-[30vh] overflow-y-auto shadow-md rounded-md mt-1 z-10">
          {data.coins.map((coin: Coin) => (
            <Link href={`/coins/${coin.id}`} key={coin.id}>
              <div
                className="flex flex-row items-center px-3 py-2 cursor-pointer hover:bg-secondary"
                onClick={() => {
                  setQuery(coin.name);
                  setIsFocused(false);
                }}
              >
                <Image
                  src={coin.thumb}
                  alt={coin.name}
                  width={16}
                  height={16}
                  className="rounded-full mr-4"
                />
                {coin.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
