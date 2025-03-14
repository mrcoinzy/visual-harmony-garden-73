
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MessageSquare, Send } from 'lucide-react';
import { DateDisplay } from "@/components/ui/date-display";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for contacts and messages
const contacts = [
  {
    id: 1,
    name: "Nagy Béla",
    avatar: "/assets/avatar-1.png",
    lastMessage: "Rendben, köszönöm a segítséget!",
    lastMessageTime: "2023-10-15T14:30:00",
    unread: 0,
    online: true
  },
  {
    id: 2,
    name: "Kovács Anna",
    avatar: "/assets/avatar-2.png",
    lastMessage: "Mikor érkezel a helyszínre?",
    lastMessageTime: "2023-10-14T09:45:00",
    unread: 2,
    online: false
  },
  {
    id: 3,
    name: "Szabó János",
    avatar: "/assets/avatar-3.png",
    lastMessage: "A munka elkészült, kérem nézze át.",
    lastMessageTime: "2023-10-13T16:20:00",
    unread: 0,
    online: true
  },
  {
    id: 4,
    name: "Tóth Katalin",
    avatar: "/assets/avatar-4.png",
    lastMessage: "Holnap 10 órakor megfelelő lenne?",
    lastMessageTime: "2023-10-12T18:15:00",
    unread: 1,
    online: false
  }
];

// Mock conversation data
const mockConversations = {
  1: [
    { id: 1, sender: "Nagy Béla", content: "Jó napot kívánok! A csappal kapcsolatban szeretnék segítséget kérni.", time: "2023-10-15T10:30:00", incoming: true },
    { id: 2, sender: "Me", content: "Üdvözlöm! Miben segíthetek pontosan?", time: "2023-10-15T10:35:00", incoming: false },
    { id: 3, sender: "Nagy Béla", content: "A fürdőszobai csap csöpög, és nem tudom megszüntetni.", time: "2023-10-15T10:40:00", incoming: true },
    { id: 4, sender: "Me", content: "Értem. Ezen a héten tudnék kimenni megnézni. Melyik nap lenne jó Önnek?", time: "2023-10-15T10:45:00", incoming: false },
    { id: 5, sender: "Nagy Béla", content: "Csütörtökön délelőtt megfelelne.", time: "2023-10-15T10:50:00", incoming: true },
    { id: 6, sender: "Me", content: "Rendben, feljegyeztem. Csütörtökön 10 óra körül érkeznék.", time: "2023-10-15T10:55:00", incoming: false },
    { id: 7, sender: "Nagy Béla", content: "Rendben, köszönöm a segítséget!", time: "2023-10-15T14:30:00", incoming: true },
  ],
  2: [
    { id: 1, sender: "Kovács Anna", content: "Jó napot! A megbeszélt időponttal kapcsolatban írok.", time: "2023-10-14T09:30:00", incoming: true },
    { id: 2, sender: "Me", content: "Üdvözlöm! Igen, miben segíthetek?", time: "2023-10-14T09:35:00", incoming: false },
    { id: 3, sender: "Kovács Anna", content: "Mikor érkezel a helyszínre?", time: "2023-10-14T09:45:00", incoming: true },
  ]
};

interface MessagesProps {
  onBack?: () => void;
}

const Messages: React.FC<MessagesProps> = ({ onBack }) => {
  const [selectedContact, setSelectedContact] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get conversation for selected contact
  const conversation = selectedContact ? mockConversations[selectedContact] || [] : [];
  
  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      // In a real app, we would send this message to a backend
      console.log(`Sending message to contact ${selectedContact}: ${newMessage}`);
      setNewMessage("");
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
            <MessageSquare className="h-5 w-5" />
            Üzenetek
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-gray-800">
              <TabsTrigger value="messages">Privát üzenetek</TabsTrigger>
              <TabsTrigger value="groups">Csoportos üzenetek</TabsTrigger>
            </TabsList>
            <TabsContent value="messages" className="mt-0">
              <div className="flex h-[70vh] border-t border-gray-800">
                {/* Contacts sidebar */}
                <div className="w-1/3 border-r border-gray-800">
                  <div className="p-3 border-b border-gray-800">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Keresés..."
                        className="pl-10 bg-gray-700 border-gray-600"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="overflow-y-auto h-[calc(70vh-57px)]">
                    {filteredContacts.map(contact => (
                      <div 
                        key={contact.id}
                        className={`flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer transition-colors ${selectedContact === contact.id ? 'bg-gray-700' : ''}`}
                        onClick={() => setSelectedContact(contact.id)}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gray-600 text-gray-300">
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                            {contact.avatar && <AvatarImage src={contact.avatar} />}
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-800"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-300 truncate">{contact.name}</h4>
                            <DateDisplay date={contact.lastMessageTime} format="MM.dd HH:mm" className="text-xs text-gray-400" />
                          </div>
                          <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                        </div>
                        {contact.unread > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-quickfix-yellow text-quickfix-dark text-xs font-medium">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Conversation area */}
                <div className="flex-1 flex flex-col">
                  {selectedContact ? (
                    <>
                      {/* Selected contact header */}
                      <div className="p-3 border-b border-gray-800 flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gray-600 text-gray-300">
                            {contacts.find(c => c.id === selectedContact)?.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                          {contacts.find(c => c.id === selectedContact)?.avatar && 
                            <AvatarImage src={contacts.find(c => c.id === selectedContact)?.avatar || ""} />
                          }
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-300">
                            {contacts.find(c => c.id === selectedContact)?.name}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {contacts.find(c => c.id === selectedContact)?.online ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                        {conversation.map(message => (
                          <div 
                            key={message.id} 
                            className={`flex ${message.incoming ? 'justify-start' : 'justify-end'}`}
                          >
                            <div 
                              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                message.incoming 
                                  ? 'bg-gray-700 text-gray-300 rounded-tl-none' 
                                  : 'bg-blue-600 text-white rounded-tr-none'
                              }`}
                            >
                              <p className="mb-1">{message.content}</p>
                              <DateDisplay 
                                date={message.time} 
                                format="yyyy-MM-dd HH:mm" 
                                className="text-xs opacity-70 text-right" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Message input */}
                      <div className="p-3 border-t border-gray-800 flex gap-2">
                        <Input
                          placeholder="Írja be üzenetét..."
                          className="bg-gray-700 border-gray-600"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          className="bg-quickfix-yellow hover:bg-quickfix-yellow/90 text-black"
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Küldés</span>
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                      <MessageSquare className="h-16 w-16 text-gray-500 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">Nincs kiválasztva beszélgetés</h3>
                      <p className="text-gray-400 mb-4">Válasszon ki egy kapcsolatot a bal oldali listából a beszélgetés megkezdéséhez</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="groups" className="mt-0">
              <div className="flex flex-col items-center justify-center text-center p-8 h-[60vh]">
                <MessageSquare className="h-16 w-16 text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Csoportos beszélgetések</h3>
                <p className="text-gray-400 mb-4">Ez a funkció hamarosan elérhető lesz!</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
