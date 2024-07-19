import React from "react";

interface GraphTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const GraphTooltip: React.FC<GraphTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border-muted-foreground p-2 rounded-lg">
        <p className="text-muted-foreground">{label}</p>
        <p className="text-primary">
          {`${payload[0].name}: ${payload[0].value}`}
        </p>
      </div>
    );
  }

  return null;
};

export default GraphTooltip;
