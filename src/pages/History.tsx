
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DateDisplay } from "@/components/ui/date-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Bot, Wrench, Search, Filter, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for AI interactions
const aiInteractions = [
  {
    id: 1,
    topic: "Vízszivárgás probléma",
    date: "2023-09-10T14:30:00",
    summary: "Tanácsot kértem egy csaptelep szivárgásának javításához",
    resolved: true
  },
  {
    id: 2,
    topic: "Elektromos hiba diagnosztizálása",
    date: "2023-09-15T10:45:00",
    summary: "Segítséget kértem egy elektromos kapcsoló hibájának felderítéséhez",
    resolved: true
  },
  {
    id: 3,
    topic: "Festési tanácsadás",
    date: "2023-09-20T16:20:00",
    summary: "Információt kértem a megfelelő falfesték kiválasztásához",
    resolved: false
  },
  {
    id: 4,
    topic: "Parketta karbantartás",
    date: "2023-09-25T09:15:00",
    summary: "Tanácsot kértem a parketta megfelelő tisztításához és karbantartásához",
    resolved: true
  }
];

// Mock data for professional works
const professionalWorks = [
  {
    id: 1,
    title: "Vízvezeték javítás",
    date: "2023-10-05T10:00:00",
    endDate: "2023-10-05T12:30:00",
    location: "Bp, Petőfi u. 12",
    professional: {
      name: "Kovács János",
      avatar: "/assets/avatar-1.png",
      rating: 4.8
    },
    status: "Befejezve",
    cost: 25000
  },
  {
    id: 2,
    title: "Elektromos rendszer felülvizsgálata",
    date: "2023-10-10T14:00:00",
    endDate: "2023-10-10T17:30:00",
    location: "Bp, Kossuth tér 5",
    professional: {
      name: "Nagy Béla",
      avatar: "/assets/avatar-2.png",
      rating: 4.5
    },
    status: "Befejezve",
    cost: 35000
  },
  {
    id: 3,
    title: "Bútor összeszerelés",
    date: "2023-10-15T09:00:00",
    endDate: null,
    location: "Bp, Árpád út 45",
    professional: {
      name: "Szabó Péter",
      avatar: "/assets/avatar-3.png",
      rating: 4.6
    },
    status: "Folyamatban",
    cost: 18000
  },
  {
    id: 4,
    title: "Festési munkálatok",
    date: "2023-10-20T08:00:00",
    endDate: null,
    location: "Bp, Deák Ferenc u. 8",
    professional: {
      name: "Tóth Katalin",
      avatar: "/assets/avatar-4.png",
      rating: 4.9
    },
    status: "Ütemezve",
    cost: 75000
  }
];

interface HistoryProps {
  onBack?: () => void;
}

const History: React.FC<HistoryProps> = ({ onBack }) => {
  const [timeFilter, setTimeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter AI interactions based on selected filters
  const filteredAiInteractions = aiInteractions.filter(item => {
    if (timeFilter === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(item.date) >= oneMonthAgo;
    }
    return true;
  }).filter(item => {
    if (statusFilter === "resolved") return item.resolved;
    if (statusFilter === "unresolved") return !item.resolved;
    return true;
  });
  
  // Filter professional works based on selected filters
  const filteredProfessionalWorks = professionalWorks.filter(item => {
    if (timeFilter === "month") {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return new Date(item.date) >= oneMonthAgo;
    }
    return true;
  }).filter(item => {
    if (statusFilter === "completed") return item.status === "Befejezve";
    if (statusFilter === "in-progress") return item.status === "Folyamatban";
    if (statusFilter === "scheduled") return item.status === "Ütemezve";
    return true;
  });
  
  return (
    <div className="animate-fade-in">
      {onBack && (
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="mb-4"
        >
          Vissza
        </Button>
      )}
      
      <Card className="border-none shadow-md bg-quickfix-dark-gray">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-quickfix-yellow flex items-center gap-2">
            <HistoryIcon className="h-5 w-5" />
            Előzmények
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-300">Szűrés:</span>
            </div>
            
            <Select defaultValue="all" onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <SelectValue placeholder="Időszak" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">Összes</SelectItem>
                <SelectItem value="month">Utolsó 30 nap</SelectItem>
                <SelectItem value="week">Utolsó 7 nap</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all" onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                <SelectValue placeholder="Státusz" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">Összes státusz</SelectItem>
                <SelectItem value="resolved">Megoldott</SelectItem>
                <SelectItem value="unresolved">Folyamatban</SelectItem>
                <SelectItem value="completed">Befejezett</SelectItem>
                <SelectItem value="in-progress">Folyamatban lévő</SelectItem>
                <SelectItem value="scheduled">Ütemezett</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-gray-800 mb-4">
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Beszélgetések
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Szakember Munkák
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai">
              <div className="grid gap-4">
                {filteredAiInteractions.length > 0 ? (
                  filteredAiInteractions.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-200">{item.topic}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.resolved ? 'bg-green-900 text-green-300' : 'bg-orange-900 text-orange-300'
                        }`}>
                          {item.resolved ? 'Megoldva' : 'Folyamatban'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{item.summary}</p>
                      <div className="flex items-center justify-between">
                        <DateDisplay date={item.date} className="text-xs text-gray-500" />
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-950 p-0">
                          Részletek
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Nincsenek találatok</h3>
                    <p className="text-gray-400">A keresési feltételeknek megfelelő beszélgetések nem találhatók</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="professional">
              <div className="grid gap-4">
                {filteredProfessionalWorks.length > 0 ? (
                  filteredProfessionalWorks.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-700 text-gray-300">
                              {item.professional.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                            {item.professional.avatar && <AvatarImage src={item.professional.avatar} />}
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-gray-200">{item.title}</h3>
                            <p className="text-xs text-gray-400">{item.professional.name} ({item.professional.rating}★)</p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'Befejezve' 
                            ? 'bg-green-900 text-green-300' 
                            : item.status === 'Folyamatban' 
                            ? 'bg-orange-900 text-orange-300' 
                            : 'bg-blue-900 text-blue-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Helyszín</p>
                          <p className="text-gray-300">{item.location}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Kezdés</p>
                          <DateDisplay date={item.date} format="yyyy-MM-dd HH:mm" className="text-gray-300" />
                        </div>
                        {item.endDate && (
                          <div>
                            <p className="text-xs text-gray-500">Befejezés</p>
                            <DateDisplay date={item.endDate} format="yyyy-MM-dd HH:mm" className="text-gray-300" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500">Költség</p>
                          <p className="text-gray-300">{item.cost.toLocaleString()} Ft</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-950">
                          Részletek
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Wrench className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Nincsenek találatok</h3>
                    <p className="text-gray-400">A keresési feltételeknek megfelelő munkák nem találhatók</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
