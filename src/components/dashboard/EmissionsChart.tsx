
"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card } from "@/components/ui/card"
import { ChartTooltipContent } from "@/components/ui/chart" // Ensure ChartTooltipContent is exported from your chart components

const chartData = [
  { category: "Cooking", emissions: 120, fill: "hsl(var(--chart-1))" },
  { category: "Food", emissions: 250, fill: "hsl(var(--chart-2))" },
  { category: "Waste", emissions: 80, fill: "hsl(var(--chart-3))" },
  { category: "Clothing", emissions: 150, fill: "hsl(var(--chart-4))" },
  { category: "Necessities", emissions: 100, fill: "hsl(var(--chart-5))" },
];

export function EmissionsChart() {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="category" 
            tickLine={false} 
            axisLine={false} 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
          />
          <YAxis 
            tickLine={false} 
            axisLine={false} 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={12} 
            tickFormatter={(value) => `${value} kg`}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted)/0.5)" }}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="emissions" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
