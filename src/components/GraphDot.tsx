"use client";

import { DotProps, Dot } from "recharts";
import { useState } from "react";

const GraphDot = (props: DotProps) => {
  const { cx, cy, ...rest } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <Dot
      {...rest}
      cx={cx}
      cy={cy}
      r={hovered ? 4 : 0}
      opacity={hovered ? 1 : 0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

export default GraphDot;
