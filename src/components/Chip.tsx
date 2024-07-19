import React from "react";
import { cn } from "@/utils/cn";

interface ChipProps {
  variant?: "profit" | "loss" | "default";
  text: string;
}

const Chip: React.FC<ChipProps> = ({ variant = "default", text }) => {
  console.log("Rendered chip");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-1 text-sm font-semibold",
        {
          "bg-profit text-profitText": variant === "profit",
          "bg-loss text-lossText": variant === "loss",
          "bg-foreground text-primary-foreground": variant === "default",
        }
      )}
    >
      {variant === "profit" && <span className="mr-1">▲</span>}
      {variant === "loss" && <span className="mr-1">▼</span>}
      {text}
    </span>
  );
};

export default Chip;
