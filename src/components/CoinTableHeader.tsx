import React from "react";

export const CoinTableHeader: React.FC = () => {
  return (
    <thead className="w-full">
      <tr className="bg-secondary text-secondary-foreground">
        <th className="px-4 py-2 text-left">Rank</th>
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-right">Price</th>
        <th className="px-4 py-2 text-right">24h Change</th>
        <th className="px-4 py-2 text-right">7d Change</th>
        <th className="px-4 py-2 text-right">Market Cap</th>
        <th className="px-4 py-2 text-right">Volume (24h)</th>
        <th className="px-4 py-2 text-right">24h Low / High</th>
      </tr>
    </thead>
  );
};

export default CoinTableHeader;
