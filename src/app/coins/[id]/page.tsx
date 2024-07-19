"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCoin } from "@/lib/api";
import Image from "next/image";
import parse from "html-react-parser";
import MarketDataChart from "@/components/MarketDataChart";

interface CoinPageProps {
  params: {
    id: string;
  };
}

const CoinPage: React.FC<CoinPageProps> = ({ params }) => {
  const id = params.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["getCoin", id],
    queryFn: () => getCoin(id),
  });
  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="p-4 max-w-2xl mx-auto">
          <div className="bg-card rounded-lg shadow-md p-4 flex flex-col border m-2">
            <div className="flex items-center mb-2">
              <Image
                src={data.image.large}
                alt={data.name}
                width={100}
                height={100}
                className="rounded-full mr-2"
              />
              <h2 className="text-lg font-bold">{data.name}</h2>
              <span className="text-sm text-muted-foreground ml-2">
                ({data.symbol.toUpperCase()})
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold">
                ${data.market_data.current_price.usd.toLocaleString()}
              </span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              Market Cap Rank: #{data.market_cap_rank}
            </div>
            <div className="text-sm text-muted-foreground">
              Market Cap: ${data.market_data.market_cap.usd.toLocaleString()}
            </div>
          </div>
          <div>
            <MarketDataChart coinId={id} />
          </div>
          <div>
            <h3 className="text-lg font-bold mt-4">Description</h3>
            <p>{parse(data.description.en)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinPage;
