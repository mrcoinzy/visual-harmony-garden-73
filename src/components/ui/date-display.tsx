
import { format } from "date-fns";
import { hu } from "date-fns/locale";

interface DateDisplayProps {
  date: string | Date;
  format?: string;
  className?: string;
}

export function DateDisplay({ 
  date, 
  format: formatString = "yyyy-MM-dd HH:mm", 
  className 
}: DateDisplayProps) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  
  return (
    <time 
      dateTime={dateObj.toISOString()} 
      className={className}
    >
      {format(dateObj, formatString, { locale: hu })}
    </time>
  );
}
