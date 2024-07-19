import React from "react";
import Image from "next/image";
import Chip from "./Chip";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: { price: number[] };
}

const CoinCard: React.FC<{ coin: CoinData }> = ({ coin }) => {
  const chipvariant = coin.price_change_percentage_24h >= 0 ? "profit" : "loss";

  return (
    <div className="bg-card rounded-lg shadow-md p-4 flex flex-col border m-2">
      <div className="flex items-center mb-2">
        <Image
          src={coin.image}
          alt={coin.name}
          width={32}
          height={32}
          className="rounded-full mr-2"
        />
        <h2 className="text-lg font-bold">{coin.name}</h2>
        <span className="text-sm text-muted-foreground ml-2">
          ({coin.symbol.toUpperCase()})
        </span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-bold">
          ${coin.current_price.toLocaleString()}
        </span>
        <Chip
          variant={chipvariant}
          text={`${coin.price_change_percentage_24h.toFixed(4)}%`}
        />
      </div>
      <div className="text-sm text-muted-foreground mb-2">
        Market Cap Rank: #{coin.market_cap_rank}
      </div>
      <div className="text-sm text-muted-foreground">
        Market Cap: ${coin.market_cap.toLocaleString()}
      </div>
    </div>
  );
};

export default CoinCard;
