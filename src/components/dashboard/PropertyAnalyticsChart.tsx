
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

// More realistic mock data with consistent scale
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
    <ChartContainer config={config} className="w-full h-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 20,
            left: 16,
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
            width={40}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload?.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Month
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {label}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Views
                        </span>
                        <span className="font-bold">
                          {payload[0].value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
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
      </ResponsiveContainer>
    </ChartContainer>
  );
}
