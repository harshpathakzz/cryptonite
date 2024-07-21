import { TooltipProps } from "recharts";
import { formatDollarAmount, formatPercentage } from "@/utils/formatters";

interface BarToolTipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const BarToolTip: React.FC<BarToolTipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border-muted-foreground p-2 rounded-lg shadow">
        <p className="font-bold">{label}</p>
        {payload.map((pld, index) => {
          const isPercentage = pld.dataKey === "percentage";
          const label = isPercentage ? "Market Cap " : "Market Cap";
          const value = isPercentage
            ? formatPercentage(pld.value)
            : formatDollarAmount(pld.value);

          return (
            <p key={index} style={{ color: pld.color }}>
              {label}: {value}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export default BarToolTip;
