
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdvertisementProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  company: string;
}

// Példa hirdetés komponens
const Advertisement = ({ 
  title = "Profi szerszámok kedvezménnyel", 
  description = "Szerezze be a legjobb szerszámokat 20% kedvezménnyel! Kizárólag szakembereknek.", 
  imageUrl = "https://images.unsplash.com/photo-1581147036324-c47a03ff9d20?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
  linkUrl = "#", 
  company = "ToolMaster"
}: Partial<AdvertisementProps>) => {
  return (
    <Card className="border-none overflow-hidden relative bg-gradient-to-br from-quickfix-dark-gray to-gray-900 shadow-md animate-fade-in col-span-2">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <CardContent className="relative z-20 p-6 flex flex-col h-full justify-end">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-quickfix-yellow">
          Hirdetés • {company}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 mb-4">{description}</p>
        <Button 
          className="w-fit bg-quickfix-yellow hover:bg-quickfix-yellow/90 text-black font-medium btn-glow"
          onClick={() => window.open(linkUrl, '_blank')}
        >
          Megnézem <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Advertisement;
