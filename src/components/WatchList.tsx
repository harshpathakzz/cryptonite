"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useWatchlistStore } from "@/store/watchListStore";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function Watchlist() {
  const { setNodeRef } = useDroppable({ id: "watchlist" });
  const { watchlist, removeFromWatchlist } = useWatchlistStore();

  return (
    <div
      ref={setNodeRef}
      className="w-full bg-background p-4 h-full border rounded-md max-h-[60vh] overflow-y-scroll"
    >
      <h2 className="text-xl font-bold mb-4">Watchlist</h2>
      <ul>
        {watchlist.map((item) => (
          <Link href={`/coins/${item.id}`} key={item.id}>
            <div
              key={item.id}
              className=" w-full flex justify-between items-center mb-2 bg-background p-2 rounded-lg hover:bg-accent"
            >
              <span>{item.name}</span>

              <Trash2
                size={24}
                onClick={(e) => {
                  removeFromWatchlist(item.id);
                  e.stopPropagation();
                }}
                color="red"
                className="cursor-pointer"
              />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
