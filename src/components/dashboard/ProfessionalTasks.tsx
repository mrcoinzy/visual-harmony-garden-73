
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tool, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Minta adatok - éles környezetben API-ból jönne
const tasks = [
  { id: 1, title: "Vízvezeték szerelés", date: "2023-09-20", status: "completed", professional: "Nagy József" },
  { id: 2, title: "Klíma javítás", date: "2023-09-18", status: "pending", professional: "Kis Péter" },
  { id: 3, title: "Bútorösszeszerelés", date: "2023-09-05", status: "completed", professional: "Szabó János" },
];

const ProfessionalTasks = () => {
  return (
    <Card className="border-none bg-quickfix-dark-gray shadow-md animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-200">Szakember feladatok</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => window.location.hash = 'professional-help'}>
          Összes <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="flex items-start space-x-4 p-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => window.location.hash = 'professional-help'}
            >
              <div className="mt-0.5">
                <Tool className="h-4 w-4 text-quickfix-yellow" />
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-200">{task.title}</p>
                  <div className={cn(
                    "flex items-center text-xs",
                    task.status === "completed" ? "text-green-400" : "text-amber-400"
                  )}>
                    {task.status === "completed" ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Kész</>
                    ) : (
                      <><Clock className="h-3 w-3 mr-1" /> Folyamatban</>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400">Szakember: {task.professional}</p>
                <p className="text-xs text-gray-500">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalTasks;
