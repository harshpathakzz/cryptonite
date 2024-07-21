"use client";
import { useState } from "react";
import { getPublicCompaniesHoldings } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/Skeleton";

import { useErrorHandling } from "@/hooks/useErrorHandling";

interface Company {
  name: string;
  symbol: string;
  country: string;
  total_holdings: number;
  total_entry_value_usd: number;
  total_current_value_usd: number;
}

type CryptoType = "bitcoin" | "ethereum";

export default function PublicCompaniesHoldings() {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>("bitcoin");

  const { isLoading, error, data, isError } = useQuery({
    queryKey: ["publicCompaniesHoldings", selectedCrypto],
    queryFn: () => getPublicCompaniesHoldings(selectedCrypto),
    gcTime: 3600000, //Cache time of 1 hour
    staleTime: 55000, //Stale time of 55 seconds
    refetchInterval: 5 * 60000, //Refetch every 60 seconds
  });

  useErrorHandling(isError, error);

  if (error) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <button
          onClick={() => setSelectedCrypto("bitcoin")}
          className={`mr-2 px-4 py-2 rounded ${
            selectedCrypto === "bitcoin"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
          disabled={isLoading}
        >
          BTC
        </button>
        <button
          onClick={() => setSelectedCrypto("ethereum")}
          className={`px-4 py-2 rounded ${
            selectedCrypto === "ethereum"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
          disabled={isLoading}
        >
          ETH
        </button>
      </div>
      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      )}

      {data && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-background">
            <thead>
              <tr className="bg-background text-foreground uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Company</th>
                <th className="py-3 px-6 text-left">Symbol</th>
                <th className="py-3 px-6 text-left">Country</th>
                <th className="py-3 px-6 text-right">
                  Total Holdings ({selectedCrypto === "bitcoin" ? "BTC" : "ETH"}
                  )
                </th>
                <th className="py-3 px-6 text-right">Entry Value (USD)</th>
                <th className="py-3 px-6 text-right">Current Value (USD)</th>
              </tr>
            </thead>
            <tbody className="text-secondary-foreground text-sm font-light">
              {data.companies.map((company: Company, index: number) => (
                <tr key={index} className="border-b border hover:bg-secondary">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {company.name}
                  </td>
                  <td className="py-3 px-6 text-left">{company.symbol}</td>
                  <td className="py-3 px-6 text-left">{company.country}</td>
                  <td className="py-3 px-6 text-right">
                    {company.total_holdings.toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-right">
                    ${company.total_entry_value_usd.toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-right">
                    ${company.total_current_value_usd.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
