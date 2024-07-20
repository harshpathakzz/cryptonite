import React from "react";
import Image from "next/image";
import Chip from "./Chip";
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from "lucide-react";

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

const CoinCard: React.FC<{ coin: CoinData }> = ({ coin }) => {
  console.log("Coin", coin);
  const chipVariant = coin.price_change_percentage_24h >= 0 ? "profit" : "loss";
  const weeklyChipVariant =
    coin.price_change_percentage_7d_in_currency >= 0 ? "profit" : "loss";

  return (
    <div className="bg-card rounded-lg shadow-md p-4 sm:p-6 flex flex-col border hover:shadow-lg transition-shadow duration-300">
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
            <h2 className="text-lg sm:text-xl font-bold">{coin.name}</h2>
            <span className="text-xs sm:text-sm text-muted-foreground">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-xs sm:text-sm font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded">
          Rank #{coin.market_cap_rank}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-2xl sm:text-3xl font-bold">
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

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-start">
          <DollarSign className="w-4 h-4 mr-2 text-muted-foreground mt-1" />
          <div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Market Cap
            </span>
            <p className="text-sm sm:text-base font-semibold">
              ${coin.market_cap.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-start">
          <BarChart2 className="w-4 h-4 mr-2 text-muted-foreground mt-1" />
          <div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Volume (24h)
            </span>
            <p className="text-sm sm:text-base font-semibold">
              ${coin.total_volume.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div>
          <span className="text-xs sm:text-sm text-muted-foreground">
            24h Low / High
          </span>
          <p className="text-sm sm:text-base font-semibold">
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
