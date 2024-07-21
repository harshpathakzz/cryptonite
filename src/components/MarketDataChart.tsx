"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useErrorHandling } from "@/hooks/useErrorHandling";
import { Skeleton } from "@/components/Skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCoinMarketChart } from "@/lib/api";
import GraphTooltip from "@/components/GraphTooltip";
import GraphDot from "@/components/GraphDot";

interface Interval {
  label: string;
  days: number;
}

interface DataType {
  label: string;
  key: "prices" | "market_caps" | "total_volumes";
}

const intervals: Interval[] = [
  { label: "1D", days: 1 },
  { label: "1W", days: 7 },
  { label: "1M", days: 30 },
  { label: "1Y", days: 365 },
];

const dataTypes: DataType[] = [
  { label: "Price", key: "prices" },
  { label: "Market Cap", key: "market_caps" },
  { label: "Volume", key: "total_volumes" },
];

interface ChartData {
  date: string;
  value: number;
}

interface MarketData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface MarketDataChartProps {
  coinId: string;
}

export default function MarketDataChart({ coinId }: MarketDataChartProps) {
  const [interval, setInterval] = useState<Interval>(intervals[0]);
  const [dataType, setDataType] = useState<DataType>(dataTypes[0]);

  const { data, isLoading, error, isError } = useQuery<MarketData>({
    queryKey: ["marketData", coinId, interval.days],
    queryFn: async () => {
      const marketData = await getCoinMarketChart(coinId, interval.days);
      return marketData;
    },
    gcTime: 3600000, //Cache time of 1 hour
    staleTime: 55000, //Stale time of 55 seconds
    refetchInterval: 5 * 60000, //Refetch every 60 seconds
  });

  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  const chartData: ChartData[] = data
    ? data[dataType.key].map(([timestamp, value]: [number, number]) => ({
        date: new Date(timestamp).toLocaleDateString(),
        value: value,
      }))
    : [];

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        {intervals.map((int) => (
          <button
            key={int.label}
            onClick={() => setInterval(int)}
            disabled={isLoading}
            className={`mx-2 px-4 py-2 border rounded ${
              interval.label === int.label
                ? "bg-accent hover:text-accent-foreground"
                : "border border-input bg-background shadow-sm hover:bg-accent"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {int.label}
          </button>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        {dataTypes.map((type) => (
          <button
            key={type.label}
            onClick={() => setDataType(type)}
            disabled={isLoading}
            className={`mx-2 px-4 py-2 border rounded ${
              dataType.label === type.label
                ? "bg-accent hover:text-accent-foreground"
                : ""
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {type.label}
          </button>
        ))}
      </div>
      {isLoading ? (
        <Skeleton className="h-[400px] w-full" />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<GraphTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              dot={<GraphDot />}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
