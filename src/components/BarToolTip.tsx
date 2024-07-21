import { TooltipProps } from "recharts";

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
        {payload.map((pld, index) => (
          <p key={index} style={{ color: pld.color }}>
            {pld.name === "percentage" ? "Market Cap %" : "Market Cap"}:
            {pld.name === "percentage"
              ? ` ${pld.value.toFixed(2)}%`
              : ` ${pld.value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default BarToolTip;
