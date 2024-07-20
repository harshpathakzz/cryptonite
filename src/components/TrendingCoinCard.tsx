import React from "react";
import Image from "next/image";
import Chip from "@/components/Chip";
import { useDraggable } from "@dnd-kit/core";
import { DollarSign, BarChart2, GripVertical } from "lucide-react";

interface TrendingCoinCardProps {
  coin: {
    item: {
      id: string;
      name: string;
      symbol: string;
      thumb: string;
      market_cap_rank: number;
      data: {
        price_change_percentage_24h: { usd: number };
        market_cap: number;
        total_volume: number;
        sparkline: string;
      };
    };
  };
  isDragging?: boolean;
}

const TrendingCoinCard: React.FC<TrendingCoinCardProps> = ({
  coin,
  isDragging = false,
}) => {
  const priceChange = coin.item.data.price_change_percentage_24h.usd;
  const priceChangeVariant = priceChange >= 0 ? "profit" : "loss";

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: coin.item.id,
    data: coin,
  });

  const style =
    transform && !isDragging
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-background rounded-lg shadow-md p-4 border w-2/3 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Image
            src={coin.item.thumb}
            alt={coin.item.name}
            width={24}
            height={24}
            className="mr-2"
          />
          <h2 className="text-xl font-semibold">{coin.item.name}</h2>
          <span className="ml-2 text-gray-500">{coin.item.symbol}</span>
        </div>
        <div {...attributes} {...listeners} className="cursor-move">
          <GripVertical className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        Rank: {coin.item.market_cap_rank || "N/A"}
      </p>
      <div className="flex items-center mb-2">
        <span className="text-sm mr-2">24h Change:</span>
        <Chip
          variant={priceChangeVariant}
          text={`${priceChange.toFixed(2)}%`}
        />
      </div>
      <div className="flex items-start mb-2">
        <DollarSign className="w-4 h-4 mr-2 text-muted-foreground mt-1" />
        <div>
          <span className="text-xs text-muted-foreground">Market Cap</span>
          <p className="text-sm font-semibold">
            ${(coin.item.data.market_cap || 0).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="flex items-start mb-4">
        <BarChart2 className="w-4 h-4 mr-2 text-muted-foreground mt-1" />
        <div>
          <span className="text-xs text-muted-foreground">Volume (24h)</span>
          <p className="text-sm font-semibold">
            ${(coin.item.data.total_volume || 0).toLocaleString()}
          </p>
        </div>
      </div>
      {coin.item.data.sparkline && (
        <Image
          src={coin.item.data.sparkline}
          alt={`${coin.item.name} price chart`}
          width={200}
          height={50}
          className="w-full h-auto"
        />
      )}
    </div>
  );
};

export default TrendingCoinCard;
