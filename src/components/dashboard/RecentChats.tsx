
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Conversation = {
  id: string;
  title: string;
  date: string;
  preview: string;
};

type RecentChatsProps = {
  isLoading?: boolean;
  conversations: Conversation[];
  onNavigate: (page: string) => void;
};

const RecentChats = ({ isLoading, conversations, onNavigate }: RecentChatsProps) => {
  if (isLoading) {
    return (
      <Card className="border-none bg-quickfix-dark-gray shadow-md animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="h-5 bg-gray-700 rounded w-1/3"></div>
          <div className="h-5 bg-gray-700 rounded w-1/6"></div>
        </CardHeader>
        <CardContent className="px-2">
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start space-x-4 p-3 rounded-md bg-gray-800/40">
                <div className="h-4 w-4 rounded-full bg-gray-700"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-full"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // If no conversations, show empty state
  if (conversations.length === 0) {
    return (
      <Card className="border-none bg-quickfix-dark-gray shadow-md animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-gray-200">Korábbi AI beszélgetések</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('ai-help')}>
            Új beszélgetés <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="px-2 py-8 text-center text-gray-400">
          <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p>Nincsenek korábbi beszélgetések.</p>
          <p className="text-sm mt-2">Kezdjen egy új beszélgetést a mesterséges intelligencia segítővel!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none bg-quickfix-dark-gray shadow-md animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-gray-200">Korábbi AI beszélgetések</CardTitle>
        <Button variant="ghost" size="sm" onClick={() => onNavigate('ai-help')}>
          Összes <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-4">
          {conversations.map((chat) => (
            <div 
              key={chat.id} 
              className="flex items-start space-x-4 p-3 rounded-md hover:bg-gray-800 transition-colors cursor-pointer" 
              onClick={() => onNavigate('ai-help')}
            >
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
