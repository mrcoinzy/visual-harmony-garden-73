
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip 
} from "recharts";

type FinanceChartProps = {
  isLoading?: boolean;
  data: Array<{
    name: string;
    amount: number;
  }>;
};

const FinanceChart = ({ isLoading, data }: FinanceChartProps) => {
  // If loading or no data, show placeholder
  if (isLoading) {
    return (
      <Card className="border-none bg-quickfix-dark-gray shadow-md animate-pulse col-span-2 h-[400px]">
        <CardHeader>
          <div className="h-6 bg-gray-700 rounded w-1/4"></div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-gray-500">Adatok betöltése...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-quickfix-dark-gray shadow-md animate-fade-in col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-200">Pénzügyi áttekintés</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            amount: {
              theme: {
                light: "#FFD700",
                dark: "#EBCB8B"
              }
            }
          }}
          className="h-[300px] w-full"
        >
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EBCB8B" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EBCB8B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value} Ft`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area 
              type="monotone" 
              dataKey="amount" 
              stroke="#EBCB8B" 
              fillOpacity={1} 
              fill="url(#colorAmount)" 
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FinanceChart;
