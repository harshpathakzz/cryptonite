import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceCardProps {
  label: string;
  value: string;
  change: number;
}

const PriceCard: React.FC<PriceCardProps> = ({ label, value, change }) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <h4 className="text-sm text-muted-foreground mb-1">{label}</h4>
    <div className="flex items-center">
      <span className="text-2xl font-bold mr-2">{value}</span>
      <span
        className={`flex items-center ${
          change >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {change >= 0 ? (
          <ArrowUp className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDown className="w-4 h-4 mr-1" />
        )}
        {Math.abs(change).toFixed(2)}%
      </span>
    </div>
  </div>
);

export default PriceCard;
