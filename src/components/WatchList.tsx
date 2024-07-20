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
    <div className="w-full bg-background border rounded-md h-[60vh] flex flex-col">
      <h2 className="text-xl font-bold p-4 sticky top-0 bg-background z-10 border-b">
        Watchlist
      </h2>
      <div ref={setNodeRef} className="flex-1 overflow-y-auto p-4">
        <ul>
          {watchlist.map((item) => (
            <li key={item.id} className="mb-2">
              <Link href={`/coins/${item.id}`}>
                <div className="w-full flex justify-between items-center bg-background p-2 rounded-lg hover:bg-accent">
                  <span>{item.name}</span>
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
