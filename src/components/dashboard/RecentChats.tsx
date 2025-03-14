
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Minta adatok - éles környezetben API-ból jönne
const recentChats = [
  { id: 1, title: "Vízvezeték szerelés tanácsok", date: "2023-09-15", preview: "Hogyan javítsak meg egy csöpögő csapot?" },
  { id: 2, title: "Elektromos készülék probléma", date: "2023-09-12", preview: "A mosógépem nem centrifugál megfelelően..." },
  { id: 3, title: "Bútor összeszerelés", date: "2023-09-08", preview: "Az új szekrényem összeszerelésével kapcsolatban..." },
];

const RecentChats = () => {
  return (
    <Card className="border-none bg-quickfix-dark-gray shadow-md animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-200">Korábbi AI beszélgetések</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => window.location.hash = 'ai-help'}>
          Összes <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {recentChats.map((chat) => (
            <div key={chat.id} className="flex items-start space-x-4 p-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer" onClick={() => window.location.hash = 'ai-help'}>
              <div className="mt-0.5">
                <MessageSquare className="h-4 w-4 text-quickfix-yellow" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-200">{chat.title}</p>
                <p className="text-xs text-gray-400 line-clamp-1">{chat.preview}</p>
                <p className="text-xs text-gray-500">{chat.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentChats;
