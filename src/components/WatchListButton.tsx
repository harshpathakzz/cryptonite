"use client";
import React, { MouseEvent } from "react";
import { Star } from "lucide-react";
import { useWatchlistStore } from "@/store/watchListStore";
import { toast } from "sonner";

interface WatchListButtonProps {
  id: string;
  name: string;
  price_change_percentage_24h: number;
  symbol: string;
}

export const WatchListButton: React.FC<WatchListButtonProps> = ({
  id,
  name,
  price_change_percentage_24h,
  symbol,
}) => {
  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useWatchlistStore();
  const isInWatchlist = watchlist.some((item) => item.id === id);

  const handleClick = (e: MouseEvent<SVGElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWatchlist) {
      removeFromWatchlist(id);
      toast.info(`${name} removed from watchlist`);
    } else {
      addToWatchlist({ id, name, price_change_percentage_24h, symbol });
      toast.success(`${name} removed from watchlist`);
    }
  };

  return (
    <Star
      onClick={handleClick}
      className={`w-8 h-8 cursor-pointer transition-transform hover:scale-110 ${
        isInWatchlist
          ? "text-yellow-400 fill-current"
          : "text-gray-600 stroke-current"
      }`}
      aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    />
  );
};
