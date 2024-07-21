"use client";
import React from "react";
import Image from "next/image";
import Chip from "./Chip";
import { DollarSign, BarChart2, GripVertical } from "lucide-react";
import { WatchListButton } from "./WatchListButton";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

interface CoinCardProps {
  coin: CoinData;
  isDragging?: boolean;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, isDragging = false }) => {
  const chipVariant = coin.price_change_percentage_24h >= 0 ? "profit" : "loss";
  const weeklyChipVariant =
    coin.price_change_percentage_7d_in_currency >= 0 ? "profit" : "loss";

  return (
    <div
      className={`bg-card rounded-lg shadow-md p-4 flex flex-col border hover:shadow-lg transition-shadow duration-300 `}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Image
            src={coin.image}
            alt={coin.name}
            width={32}
            height={32}
            className="rounded-full mr-3"
          />
          <div>
            <h2 className="text-base font-bold sm:text-lg">{coin.name}</h2>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded sm:text-sm">
          Rank #{coin.market_cap_rank}
        </div>
        <div className="cursor-move hidden sm:block">
          <GripVertical className="w-6 h-6 text-muted-foreground" />
        </div>
        <div className="block sm:hidden">
          <WatchListButton
            id={coin.id}
            name={coin.name}
            price_change_percentage_24h={coin.price_change_percentage_24h}
            symbol={coin.symbol}
          />
        </div>
      </div>
      <div className="flex justify-between items-end mb-4">
        <div>
          <span className="text-xl font-bold sm:text-2xl">
            ${coin.current_price.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <Chip
            variant={chipVariant}
            text={`${coin.price_change_percentage_24h.toFixed(2)}%`}
          />
          <span className="text-xs text-muted-foreground mt-1">24h change</span>
        </div>
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex items-start mb-2">
          <DollarSign className="w-4 h-4 mr-2 text-muted-foreground mt-1" />
          <div>
            <span className="text-xs text-muted-foreground sm:text-sm">
              Market Cap
            </span>
            <p className="text-sm font-semibold sm:text-base">
              ${coin.market_cap.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <BarChart2 className="w-4 h-4 mr-2 text-muted-foreground mt-1" />
          <div>
            <span className="text-xs text-muted-foreground sm:text-sm">
              Volume (24h)
            </span>
            <p className="text-sm font-semibold sm:text-base">
              ${coin.total_volume.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <span className="text-xs text-muted-foreground sm:text-sm">
            24h Low / High
          </span>
          <p className="text-sm font-semibold sm:text-base">
            ${coin.low_24h.toLocaleString()} / ${coin.high_24h.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Chip
            variant={weeklyChipVariant}
            text={`${coin.price_change_percentage_7d_in_currency.toFixed(2)}%`}
          />
          <span className="text-xs text-muted-foreground mt-1">7d change</span>
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
