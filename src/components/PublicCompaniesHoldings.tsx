"use client";
import { useState } from "react";
import { getPublicCompaniesHoldings } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

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

  const { isLoading, error, data } = useQuery({
    queryKey: ["publicCompaniesHoldings", selectedCrypto],
    queryFn: () => getPublicCompaniesHoldings(selectedCrypto),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setSelectedCrypto("bitcoin")}
          className={`mr-2 px-4 py-2 rounded ${
            selectedCrypto === "bitcoin"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
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
        >
          ETH
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-background">
          <thead>
            <tr className="bg-background text-foreground uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Company</th>
              <th className="py-3 px-6 text-left">Symbol</th>
              <th className="py-3 px-6 text-left">Country</th>
              <th className="py-3 px-6 text-right">
                Total Holdings ({selectedCrypto === "bitcoin" ? "BTC" : "ETH"})
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
    </div>
  );
}
