
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wrench } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Vízvezeték javítás",
    status: "Folyamatban",
    professional: {
      name: "Kovács János",
      avatar: "/assets/avatar-1.png"
    },
    date: "2023-10-15"
  },
  {
    id: 2,
    title: "Elektromos hiba elhárítás",
    status: "Befejezve",
    professional: {
      name: "Nagy Béla",
      avatar: "/assets/avatar-2.png"
    },
    date: "2023-10-10"
  },
  {
    id: 3,
    title: "Bútor összeszerelés",
    status: "Ütemezve",
    professional: {
      name: "Szabó Péter",
      avatar: "/assets/avatar-3.png"
    },
    date: "2023-10-18"
  }
];

const ProfessionalTasks = () => {
  return (
    <Card className="col-span-2 border-none bg-quickfix-dark-gray shadow-md h-full animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-quickfix-yellow flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Szakember feladatok
        </CardTitle>
        <a href="#" className="text-sm text-blue-400 hover:underline">
          Összes megtekintése
        </a>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gray-700 text-gray-300">
                    {task.professional.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                  {task.professional.avatar && <AvatarImage src={task.professional.avatar} />}
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium text-gray-200">{task.title}</h4>
                  <p className="text-xs text-gray-400">{task.professional.name}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.status === 'Befejezve' 
                    ? 'bg-green-900 text-green-300' 
                    : task.status === 'Folyamatban' 
                    ? 'bg-orange-900 text-orange-300' 
                    : 'bg-blue-900 text-blue-300'
                }`}>
                  {task.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{task.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalTasks;
