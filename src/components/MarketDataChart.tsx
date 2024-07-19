"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  DotProps,
  Dot,
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
  const [interval, setInterval] = useState<Interval>(intervals[1]);
  const [dataType, setDataType] = useState<DataType>(dataTypes[0]);

  const { data, isLoading, error } = useQuery<MarketData>({
    queryKey: ["marketData", coinId, interval.days],
    queryFn: async () => {
      const marketData = await getCoinMarketChart(coinId, interval.days);
      return marketData;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {(error as Error).message}</div>;

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
            className={`mx-2 px-4 py-2 border rounded ${
              interval === int
                ? "bg-accent hover:text-accent-foreground"
                : "border border-input bg-background shadow-sm hover:bg-accent"
            }`}
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
            className={`mx-2 px-4 py-2 border rounded ${
              dataType === type ? "bg-accent hover:text-accent-foreground" : ""
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<GraphTooltip />} />
          {/* <Tooltip /> */}

          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            dot={<GraphDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
