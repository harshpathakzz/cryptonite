"use client";
import React, { useState } from "react";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";
import Header from "@/components/Header";
import WatchList from "@/components/WatchList";
import { useWatchlistStore } from "@/store/watchListStore";
import CoinCard from "@/components/CoinCard";

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
      addToWatchlist({ id: active.id, name: active.data.current.name });
    }
    setActiveCoin(null);
  };

  return (
    <section className="min-h-screen flex flex-col">
      <Header />
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
            {activeCoin ? <CoinCard coin={activeCoin} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}
