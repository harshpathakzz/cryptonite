import React from "react";

interface InfoCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  subValue,
  icon,
}) => (
  <div className="bg-card rounded-lg shadow p-4 border">
    <div className="flex items-center mb-2">
      {icon}
      <h4 className="text-sm text-muted-foreground ml-2">{label}</h4>
    </div>
    <div className="text-xl font-bold">{value}</div>
    {subValue && (
      <div className="text-sm text-muted-foreground mt-1">{subValue}</div>
    )}
  </div>
);

export default InfoCard;
