
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Bot, Wrench, ShoppingBag, Calendar, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { DateDisplay } from "@/components/ui/date-display";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for notifications
const mockNotifications = [
  {
    id: 1,
    type: "professional",
    title: "Szakember megérkezett",
    description: "Kovács János megérkezett a helyszínre a vízvezeték javításhoz.",
    date: "2023-10-14T10:30:00",
    read: false,
    professional: {
      name: "Kovács János",
      avatar: "/assets/avatar-1.png"
    },
    action: "Megtekintés"
  },
  {
    id: 2,
    type: "ai",
    title: "AI válaszolt a kérdésére",
    description: "Az AI asszisztens választ adott a falfestés előkészítésével kapcsolatos kérdésére.",
    date: "2023-10-13T15:45:00",
    read: true,
    action: "Olvasás"
  },
  {
    id: 3,
    type: "professional",
    title: "Munka befejezve",
    description: "Nagy Béla befejezte az elektromos rendszer felülvizsgálatát.",
    date: "2023-10-12T17:20:00",
    read: false,
    professional: {
      name: "Nagy Béla",
      avatar: "/assets/avatar-2.png"
    },
    action: "Értékelés"
  },
  {
    id: 4,
    type: "advertisement",
    title: "Új ajánlat érkezett",
    description: "Új kedvezményes ajánlat érkezett: 20% kedvezmény minden szerszámra a ToolMaster üzletekben.",
    date: "2023-10-11T09:10:00",
    read: true,
    action: "Megnézés"
  },
  {
    id: 5,
    type: "professional",
    title: "Időpont megerősítés",
    description: "Szabó Péter megerősítette a bútor összeszerelés időpontját (2023.10.15 09:00).",
    date: "2023-10-10T14:15:00",
    read: true,
    professional: {
      name: "Szabó Péter",
      avatar: "/assets/avatar-3.png"
    },
    action: "Naptárhoz adás"
  },
  {
    id: 6,
    type: "ai",
    title: "Emlékeztető",
    description: "Emlékeztető: Holnap érkezik a festő. Kérjük, készítse elő a helyszínt.",
    date: "2023-10-09T18:30:00",
    read: false,
    action: "Megtekintés"
  },
  {
    id: 7,
    type: "advertisement",
    title: "Új szolgáltatások",
    description: "Új szolgáltatások érhetők el a platformon: lakberendezési tanácsadás és kertészeti munkák.",
    date: "2023-10-08T11:45:00",
    read: true,
    action: "Felfedezés"
  }
];

interface NotificationsProps {
  onBack?: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const [filter, setFilter] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [expandedNotifications, setExpandedNotifications] = useState<number[]>([]);
  
  // Filter notifications based on selected filter
  const filteredNotifications = mockNotifications
    .filter(notification => {
      if (filter === "all") return true;
      return notification.type === filter;
    })
    .filter(notification => {
      if (showUnreadOnly) return !notification.read;
      return true;
    });
  
  // Toggle notification expanded state
  const toggleExpand = (id: number) => {
    setExpandedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    // In a real app, we would update this in the backend
    console.log(`Marking notification ${id} as read`);
  };
  
  // Delete notification
  const deleteNotification = (id: number) => {
    // In a real app, we would delete this from the backend
    console.log(`Deleting notification ${id}`);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "professional":
        return <Wrench className="h-5 w-5 text-blue-400" />;
      case "ai":
        return <Bot className="h-5 w-5 text-green-400" />;
      case "advertisement":
        return <ShoppingBag className="h-5 w-5 text-purple-400" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };
  
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
            <Bell className="h-5 w-5" />
            Értesítések
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 items-center mb-4">
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                <SelectValue placeholder="Típus szerint" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="all">Összes értesítés</SelectItem>
                <SelectItem value="professional">Szakember</SelectItem>
                <SelectItem value="ai">AI asszisztens</SelectItem>
                <SelectItem value="advertisement">Hirdetések</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              className={`${showUnreadOnly ? 'bg-quickfix-yellow text-quickfix-dark' : 'bg-gray-700 text-gray-300'}`}
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            >
              {showUnreadOnly ? 'Olvasatlan értesítések' : 'Összes értesítés'}
            </Button>
          </div>
          
          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => {
                const isExpanded = expandedNotifications.includes(notification.id);
                
                return (
                  <div 
                    key={notification.id} 
                    className={`bg-gray-800 rounded-lg border ${notification.read ? 'border-gray-700' : 'border-quickfix-yellow'} hover:border-gray-600 transition-colors overflow-hidden`}
                  >
                    <div className="flex items-start p-4 cursor-pointer" onClick={() => toggleExpand(notification.id)}>
                      <div className="mr-3 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className={`font-medium ${notification.read ? 'text-gray-300' : 'text-white'}`}>
                            {notification.title}
                          </h3>
                          <DateDisplay 
                            date={notification.date} 
                            format="MM.dd HH:mm" 
                            className="text-xs text-gray-400 ml-2 shrink-0" 
                          />
                        </div>
                        
                        <p className={`text-sm ${isExpanded ? '' : 'line-clamp-1'} ${notification.read ? 'text-gray-400' : 'text-gray-300'}`}>
                          {notification.description}
                        </p>
                        
                        {notification.type === "professional" && notification.professional && (
                          <div className={`flex items-center gap-2 mt-2 ${isExpanded ? '' : 'hidden'}`}>
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-gray-700 text-gray-300 text-xs">
                                {notification.professional.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                              {notification.professional.avatar && <AvatarImage src={notification.professional.avatar} />}
                            </Avatar>
                            <span className="text-xs text-gray-400">{notification.professional.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center ml-2">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-gray-700 mt-2">
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-gray-400 hover:text-gray-300"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Olvasottnak jelölés
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-400 hover:text-red-300 hover:bg-red-950"
                              onClick={() => deleteNotification(notification.id)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Törlés
                            </Button>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
                          >
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-gray-800 rounded-lg">
                <Bell className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <h3 className="text-lg font-medium text-gray-300 mb-2">Nincsenek értesítések</h3>
                <p className="text-gray-400">Jelenleg nincsenek a feltételeknek megfelelő értesítések</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
