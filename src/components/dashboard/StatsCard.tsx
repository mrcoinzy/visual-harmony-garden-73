
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  className
}: StatsCardProps) => {
  return (
    <Card className={cn("border-none bg-quickfix-dark-gray shadow-md animate-fade-in", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        {icon && <div className="text-quickfix-yellow">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-quickfix-yellow">{value}</div>
        {description && (
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard;
