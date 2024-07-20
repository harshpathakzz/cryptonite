import React from "react";
import Image from "next/image";
import Chip from "./Chip";
import { TrendingUp, TrendingDown } from "lucide-react";

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

export const CoinTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-secondary text-secondary-foreground">
        <th className="px-4 py-2 text-left">Rank</th>
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-right">Price</th>
        <th className="px-4 py-2 text-right">24h Change</th>
        <th className="px-4 py-2 text-right">7d Change</th>
        <th className="px-4 py-2 text-right">Market Cap</th>
        <th className="px-4 py-2 text-right">Volume (24h)</th>
        <th className="px-4 py-2 text-right">24h Low / High</th>
      </tr>
    </thead>
  );
};

const CoinTableRow: React.FC<{ coin: CoinData }> = ({ coin }) => {
  const chipVariant24h =
    coin.price_change_percentage_24h >= 0 ? "profit" : "loss";
  const chipVariant7d =
    coin.price_change_percentage_7d_in_currency >= 0 ? "profit" : "loss";

  return (
    <tr className="border-b hover:bg-muted/50 transition-colors duration-200">
      <td className="px-4 py-2 text-sm">{coin.market_cap_rank}</td>
      <td className="px-4 py-2">
        <div className="flex items-center">
          <Image
            src={coin.image}
            alt={coin.name}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <div>
            <span className="font-medium">{coin.name}</span>
            <span className="text-xs text-muted-foreground ml-1">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
      </td>
      <td className="px-4 py-2 text-right font-medium">
        ${coin.current_price.toLocaleString()}
      </td>
      <td className="px-4 py-2 text-right">
        <Chip
          variant={chipVariant24h}
          text={`${coin.price_change_percentage_24h.toFixed(2)}%`}
        />
      </td>
      <td className="px-4 py-2 text-right">
        <Chip
          variant={chipVariant7d}
          text={`${coin.price_change_percentage_7d_in_currency.toFixed(2)}%`}
        />
      </td>
      <td className="px-4 py-2 text-right">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td className="px-4 py-2 text-right">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="px-4 py-2 text-right">
        ${coin.low_24h.toLocaleString()} / ${coin.high_24h.toLocaleString()}
      </td>
    </tr>
  );
};

export default CoinTableRow;
