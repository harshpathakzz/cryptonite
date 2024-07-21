"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoin } from "@/lib/api";
import Image from "next/image";
import parse from "html-react-parser";
import MarketDataChart from "@/components/MarketDataChart";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { DollarSign, BarChart3, Coins, ArrowUp, ArrowDown } from "lucide-react";
import PriceCard from "@/components/PriceCard";
import InfoCard from "@/components/InfoCard";
import CoinPageSkeleton from "@/components/CoinPageSkeleton";
import { WatchListButton } from "@/components/WatchListButton";
import {
  formatDollarAmount,
  formatPercentage,
  formatLargeNumber,
  formatBigAmount,
} from "@/utils/formatters";

interface CoinPageProps {
  params: {
    id: string;
  };
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    ath: {
      usd: number;
    };
    ath_change_percentage: {
      usd: number;
    };
    atl: {
      usd: number;
    };
    atl_change_percentage: {
      usd: number;
    };
  };
  market_cap_rank: number;
  description: {
    en: string;
  };
}

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const id = params.id;
  const { data, isLoading, error, isError } = useQuery<CoinData, Error>({
    queryKey: ["getCoin", id],
    queryFn: () => getCoin(id),
  });

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {isLoading ? (
        <CoinPageSkeleton />
      ) : (
        data && (
          <>
            <div className="bg-card rounded-lg shadow-md p-6 flex flex-col border m-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center mb-4">
                  <Image
                    src={data.image.large}
                    alt={data.name}
                    width={100}
                    height={100}
                    className="rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold">{data.name}</h2>
                    <span className="text-lg text-muted-foreground">
                      ({data.symbol.toUpperCase()})
                    </span>
                  </div>
                </div>
                <div className="mr-5">
                  <WatchListButton
                    id={data.id}
                    name={data.name}
                    price_change_percentage_24h={
                      data.market_data.price_change_percentage_24h
                    }
                    symbol={data.symbol}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <PriceCard
                  label="Current Price"
                  value={formatDollarAmount(data.market_data.current_price.usd)}
                  change={formatPercentage(
                    data.market_data.price_change_percentage_24h
                  )}
                />
                <InfoCard
                  label="Market Cap"
                  value={formatDollarAmount(data.market_data.market_cap.usd)}
                  subValue={`Rank #${data.market_cap_rank}`}
                  icon={<BarChart3 className="w-5 h-5" />}
                />
                <InfoCard
                  label="24h Trading Volume"
                  value={formatDollarAmount(data.market_data.total_volume.usd)}
                  icon={<DollarSign className="w-5 h-5" />}
                />
                <InfoCard
                  label="Circulating Supply"
                  value={`${formatBigAmount(
                    data.market_data.circulating_supply
                  )} ${data.symbol.toUpperCase()}`}
                  subValue={`${formatPercentage(
                    (data.market_data.circulating_supply /
                      data.market_data.total_supply) *
                      100
                  )} of total supply`}
                  icon={<Coins className="w-5 h-5" />}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <InfoCard
                  label="All-Time High"
                  value={formatDollarAmount(data.market_data.ath.usd)}
                  subValue={`${formatPercentage(
                    data.market_data.ath_change_percentage.usd
                  )} from ATH`}
                  icon={<ArrowUp className="w-5 h-5" />}
                />
                <InfoCard
                  label="All-Time Low"
                  value={formatDollarAmount(data.market_data.atl.usd)}
                  subValue={`${formatPercentage(
                    data.market_data.atl_change_percentage.usd
                  )} from ATL`}
                  icon={<ArrowDown className="w-5 h-5" />}
                />
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Price Chart (7 Days)</h3>
              <MarketDataChart coinId={id} />
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">About {data.name}</h3>
              <div className="bg-card rounded-lg shadow-md p-6 border">
                {parse(data.description.en)}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default CoinPage;
