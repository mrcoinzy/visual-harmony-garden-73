
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

// Minta adatok a grafikonhoz - éles környezetben API-ból jönne
const data = [
  { name: 'Jan', amount: 12400 },
  { name: 'Feb', amount: 9800 },
  { name: 'Mar', amount: 16200 },
  { name: 'Apr', amount: 18100 },
  { name: 'May', amount: 14500 },
  { name: 'Jun', amount: 19900 },
  { name: 'Jul', amount: 22400 }
];

const FinanceChart = () => {
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
