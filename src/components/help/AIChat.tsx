
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface AIChatProps {
  onBack: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = ({ onBack }: AIChatProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Üdvözöljük! Miben segíthetek Önnek ma?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Köszönöm a kérdését! Megpróbálok segíteni ebben a problémában. Kérem, adjon meg több részletet, hogy pontosabb választ adhassak.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-quickfix-dark-gray rounded-xl overflow-hidden border border-gray-800">
      <div className="flex items-center p-4 border-b border-gray-800 bg-quickfix-dark">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="mr-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center">
          <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <AvatarFallback>QF</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium text-white">QuickFix AI</p>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-quickfix-yellow text-quickfix-dark ml-auto' 
                  : 'bg-gray-800 text-white'
              }`}
            >
              <div className="flex items-start">
                {message.sender === 'ai' && (
                  <Avatar className="h-6 w-6 mr-2 mt-0.5 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-6 w-6 ml-2 mt-0.5 bg-quickfix-dark text-white">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-quickfix-dark">
        <div className="flex items-center">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Írja be üzenetét..."
            className="flex-grow bg-gray-800 border-gray-700 text-white focus-within:ring-quickfix-yellow focus:border-quickfix-yellow"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="ml-2 bg-quickfix-yellow text-quickfix-dark hover:bg-quickfix-yellow/90"
            disabled={!input.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AIChat;
