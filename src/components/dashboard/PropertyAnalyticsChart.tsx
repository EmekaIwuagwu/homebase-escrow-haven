
import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  {
    name: "Jan",
    views: 1200,
  },
  {
    name: "Feb",
    views: 1900,
  },
  {
    name: "Mar",
    views: 1500,
  },
  {
    name: "Apr",
    views: 2200,
  },
  {
    name: "May",
    views: 2800,
  },
  {
    name: "Jun",
    views: 2600,
  },
];

const config = {
  views: {
    label: "Property Views",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
};

export function PropertyAnalyticsChart() {
  return (
    <ChartContainer config={config} className="aspect-[4/3] w-full">
      <AreaChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          padding={{ left: 16, right: 16 }}
          fontSize={12}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          fontSize={12}
          padding={{ top: 16 }}
        />
        <Tooltip
          content={(props) => (
            <ChartTooltipContent
              {...props}
              indicator="line"
              formatter={(value) => [`${value}`, "Views"]}
            />
          )}
        />
        <Area
          type="monotone"
          dataKey="views"
          fill="url(#colorViews)"
          fillOpacity={0.1}
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
        <defs>
          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.6}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
      </AreaChart>
    </ChartContainer>
  );
}
