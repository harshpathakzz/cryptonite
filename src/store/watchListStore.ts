import { create } from "zustand";
import { persist } from "zustand/middleware";

type WatchlistItem = {
  id: string;
  name: string;
};

type WatchlistStore = {
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: string) => void;
};

export const useWatchlistStore = create(
  persist<WatchlistStore>(
    (set) => ({
      watchlist: [],
      addToWatchlist: (item) =>
        set((state) => {
          if (
            state.watchlist.some(
              (watchlistItem) => watchlistItem.id === item.id
            )
          ) {
            return state;
          }
          return {
            watchlist: [item, ...state.watchlist],
          };
        }),
      removeFromWatchlist: (id) =>
        set((state) => ({
          watchlist: state.watchlist.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "watchlist-storage-dnd",
    }
  )
);
