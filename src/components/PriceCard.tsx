import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface PriceCardProps {
  label: string;
  value: string;
  change: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ label, value, change }) => {
  const changeValue = parseFloat(change);

  return (
    <div className="bg-card rounded-lg shadow p-4 border ">
      <h4 className="text-sm text-muted-foreground mb-1">{label}</h4>
      <div className="flex items-center flex-col sm:flex-row">
        <div className="text-2xl font-bold mr-2">{value}</div>
        <div
          className={`flex items-center ${
            changeValue >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {changeValue >= 0 ? (
            <ArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 mr-1" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
