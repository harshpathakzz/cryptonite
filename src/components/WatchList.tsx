"use client";
import React from "react";
import { useWatchlistStore } from "@/store/watchListStore";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Chip from "@/components/Chip";

export default function Watchlist() {
  const { watchlist, removeFromWatchlist, addToWatchlist } =
    useWatchlistStore();

  return (
    <div
      className="bg-card rounded-lg shadow-md p-4 flex flex-col border border-card-foreground/20 hover:shadow-lg transition-all duration-300"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const rawData = e.dataTransfer.getData("text/plain");
        console.log("Raw dropped data:", rawData);

        try {
          const incomingCoin = JSON.parse(rawData);

          if (
            incomingCoin &&
            typeof incomingCoin === "object" &&
            "id" in incomingCoin
          ) {
            addToWatchlist(incomingCoin);
            console.log("Added to watchlist:", incomingCoin);
          } else {
            console.error("Invalid coin data format");
          }
        } catch (error) {
          console.error("Error parsing dropped data:", error);
        }
      }}
    >
      <h2 className="text-xl font-bold p-4 sticky top-0 bg-background z-10 border-b">
        Watchlist
      </h2>
      <div className="flex-1 overflow-y-auto p-4">
        <ul>
          {watchlist.map((item) => (
            <li key={item.id} className="mb-2">
              <Link href={`/coins/${item.id}`}>
                <div className="w-full flex justify-between items-center bg-background p-2 rounded-lg hover:bg-accent">
                  <span>{item.symbol.toUpperCase()}</span>
                  <Chip
                    text={`${item.price_change_percentage_24h.toFixed(2)}%`}
                    variant={
                      item.price_change_percentage_24h >= 0 ? "profit" : "loss"
                    }
                  />
                  <Trash2
                    size={24}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeFromWatchlist(item.id);
                    }}
                    color="red"
                    className="cursor-pointer"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
