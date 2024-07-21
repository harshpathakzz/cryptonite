import React from "react";
import Image from "next/image";
import Chip from "@/components/Chip";
import { useDraggable } from "@dnd-kit/core";
import { WatchListButton } from "@/components/WatchListButton";
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
      ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
      : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-background rounded-lg shadow-md p-6 border w-full my-3${
        isDragging ? "opacity-95" : ""
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Image
                src={coin.item.thumb}
                alt={coin.item.name}
                width={40}
                height={40}
                className="mr-3"
              />
              <div>
                <h2 className="text-xl font-bold">{coin.item.name}</h2>
                <span className="text-sm text-gray-500">
                  {coin.item.symbol}
                </span>
              </div>
            </div>
            <div
              {...attributes}
              {...listeners}
              className="cursor-move hidden sm:block"
            >
              <GripVertical className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="block sm:hidden">
              <WatchListButton
                id={coin.item.id}
                name={coin.item.name}
                price_change_percentage_24h={
                  coin.item.data.price_change_percentage_24h.usd
                }
                symbol={coin.item.symbol}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-xs font-medium text-gray-500">Rank</span>
              <p className="text-lg font-semibold">
                {coin.item.market_cap_rank || "N/A"}
              </p>
            </div>
            <div>
              <span className="text-xs font-medium text-gray-500 mr-1">
                24h Change
              </span>
              <Chip
                variant={priceChangeVariant}
                text={`${priceChange.toFixed(2)}%`}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <span className="text-xs font-medium text-gray-500">
                  Market Cap
                </span>
                <p className="text-base font-semibold">
                  {(coin.item.data.market_cap || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <span className="text-xs font-medium text-gray-500">
                  Volume (24h)
                </span>
                <p className="text-base font-semibold">
                  {(coin.item.data.total_volume || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {coin.item.data.sparkline && (
          <div className="mt-6 md:mt-0 md:ml-6 md:w-1/3">
            <Image
              src={coin.item.data.sparkline}
              alt={`${coin.item.name} price chart`}
              width={200}
              height={50}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingCoinCard;
