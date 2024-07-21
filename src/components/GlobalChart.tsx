"use client";

import { useErrorHandling } from "@/hooks/useErrorHandling";
import { useQuery } from "@tanstack/react-query";
import { getGlobalData } from "@/lib/api";
import { Skeleton } from "@/components/Skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import BarToolTip from "@/components/BarToolTip";

interface GlobalData {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: { [key: string]: number };
  total_volume: { [key: string]: number };
  market_cap_percentage: { [key: string]: number };
}

export default function GlobalChart() {
  const { isLoading, error, data, isError } = useQuery<GlobalData, Error>({
    queryKey: ["exploreCoins"],
    queryFn: async () => {
      const result = await getGlobalData();
      console.log("API Response:", result);
      return result;
    },
  });

  useErrorHandling(isError, error);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Global Crypto Statistics</h1>
        <div className="flex flex-wrap gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex-1 bg-transparent p-4 rounded shadow min-w-[200px]"
            >
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-10 w-1/2" />
            </div>
          ))}
        </div>
        <div className="bg-transparent p-4 rounded shadow">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!data || !data.market_cap_percentage || !data.total_market_cap) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error: Invalid data structure received from the API
      </div>
    );
  }

  const chartData = Object.entries(data.market_cap_percentage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, percentage]) => ({
      name,
      percentage,
      marketCap: data.total_market_cap.usd * (percentage / 100),
    }));

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Global Crypto Statistics</h1>
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 bg-background p-4 rounded shadow border min-w-[200px]">
          <h2 className="text-xl font-semibold mb-2">
            Active Cryptocurrencies
          </h2>
          <p className="text-2xl">
            {data.active_cryptocurrencies.toLocaleString()}
          </p>
        </div>
        <div className="flex-1 bg-transparent p-4 rounded shadow border min-w-[200px]">
          <h2 className="text-xl font-semibold mb-2">Markets</h2>
          <p className="text-2xl">{data.markets.toLocaleString()}</p>
        </div>
        <div className="flex-1 bg-transparent p-4 rounded shadow border min-w-[200px]">
          <h2 className="text-xl font-semibold mb-2">Total Market Cap (USD)</h2>
          <p className="text-2xl">
            $
            {data.total_market_cap.usd.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div className="flex-1 bg-transparent p-4 rounded shadow border min-w-[200px]">
          <h2 className="text-xl font-semibold mb-2">Total Volume (USD)</h2>
          <p className="text-2xl">
            $
            {data.total_volume.usd.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>
      <div className="bg-transparent p-4 rounded shadow ">
        <h2 className="text-xl font-semibold mb-4">
          Market Cap and Percentage (Top 10)
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip content={<BarToolTip />} />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="percentage"
                fill="#8884d8"
                name="Market Cap %"
                activeBar={false}
              />
              <Bar
                yAxisId="right"
                dataKey="marketCap"
                fill="#82ca9d"
                name="Market Cap"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
