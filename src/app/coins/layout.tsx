"use client";
import React, { useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import Header from "@/components/Header";
import WatchList from "@/components/WatchList";
import { useWatchlistStore } from "@/store/watchListStore";
import CoinCard from "@/components/CoinCard";
import TrendingCoinCard from "@/components/TrendingCoinCard";
import { Toaster } from "sonner";
import Nav from "@/components/Nav";

export default function CoinsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { addToWatchlist } = useWatchlistStore();
  const [activeCoin, setActiveCoin] = useState<any>(null);

  const handleDragStart = (event: any) => {
    setActiveCoin(event.active.data.current);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && over.id === "watchlist") {
      if (active.data.current.item) {
        addToWatchlist({
          id: active.id,
          name: active.data.current.item.name,
          price_change_percentage_24h:
            active.data.current.item.data.price_change_percentage_24h.usd,
          symbol: active.data.current.item.symbol,
        });
      } else {
        addToWatchlist({
          id: active.id,
          name: active.data.current.name,
          price_change_percentage_24h:
            active.data.current.price_change_percentage_24h,
          symbol: active.data.current.symbol,
        });
      }
    }
    setActiveCoin(null);
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <Nav />
      <div className="flex">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <div className="w-full p-4 sm:w-2/3">{children}</div>
          <div className="w-1/3 p-4 hidden sm:block ">
            <div className="sticky top-24 right-5">
              <WatchList />
            </div>
          </div>
          <DragOverlay>
            {activeCoin ? (
              activeCoin.item ? (
                <TrendingCoinCard coin={activeCoin} isDragging />
              ) : (
                <CoinCard coin={activeCoin} isDragging />
              )
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      {/* <Toaster richColors /> */}
    </section>
  );
}
