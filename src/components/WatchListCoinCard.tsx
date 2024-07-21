"use client";

import React from "react";
import Image from "next/image";
import Chip from "./Chip";
import { DollarSign, BarChart2 } from "lucide-react";
import { WatchListButton } from "./WatchListButton";
import { formatDollarAmount, formatPercentage } from "@/utils/formatters";

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
}

const WatchListCoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const chipVariant = coin.price_change_percentage_24h >= 0 ? "profit" : "loss";
  const weeklyChipVariant =
    coin.price_change_percentage_7d_in_currency >= 0 ? "profit" : "loss";

  return (
    <div className="bg-card rounded-lg shadow-md p-4 flex flex-col border border-card-foreground/20 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-card-foreground/10">
        <div className="flex items-center">
          <Image
            src={coin.image}
            alt={coin.name}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <h2 className="text-lg font-bold">{coin.name}</h2>
            <span className="text-sm text-muted-foreground">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded">
            Rank #{coin.market_cap_rank}
          </div>
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
          <span className="text-2xl font-bold">
            {formatDollarAmount(coin.current_price)}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <Chip
            variant={chipVariant}
            text={formatPercentage(coin.price_change_percentage_24h)}
          />
          <span className="text-xs text-muted-foreground mt-1">24h change</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-start">
          <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
          <div>
            <span className="text-sm text-muted-foreground">Market Cap</span>
            <p className="text-base font-semibold">
              {formatDollarAmount(coin.market_cap)}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <BarChart2 className="w-5 h-5 mr-2 text-muted-foreground" />
          <div>
            <span className="text-sm text-muted-foreground">Volume (24h)</span>
            <p className="text-base font-semibold">
              {formatDollarAmount(coin.total_volume)}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-end pt-4 border-t border-card-foreground/10">
        <div>
          <span className="text-sm text-muted-foreground">24h Low / High</span>
          <p className="text-base font-semibold">
            {formatDollarAmount(coin.low_24h)} /{" "}
            {formatDollarAmount(coin.high_24h)}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <Chip
            variant={weeklyChipVariant}
            text={formatPercentage(coin.price_change_percentage_7d_in_currency)}
          />
          <span className="text-xs text-muted-foreground mt-1">7d change</span>
        </div>
      </div>
    </div>
  );
};

export default WatchListCoinCard;
