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
  image?: string; // Added image property
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false); // Add processing state

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true); // Set processing to true

    if (!input.trim() && !selectedImage) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
      image: selectedImage ? URL.createObjectURL(selectedImage) : undefined, // Add image URL if available
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null); // Clear selected image

    try {
      const response = await fetch('https://api.llama.bravebrowser.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Brave-API-Key': process.env.BRAVE_API_KEY || '',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            { role: 'user', content: input }
          ],
          model: 'llama-2-7b-chat',
          max_tokens: 800,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Az AI válasza nem érkezett meg');
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.choices[0].message.content,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast.error('Hiba történt az AI válasz generálása közben');
      console.error('AI Error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-quickfix-dark-gray rounded-xl overflow-hidden border border-gray-800 transition-all duration-300">
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
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
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
                  {message.image && (
                    <img src={message.image} alt="User Image" className="h-24 w-24 rounded-md" />
                  )}
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
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Írja be a problémáját..."
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </label>
            <Button
              type="submit"
              size="icon"
              className="bg-quickfix-yellow hover:bg-quickfix-yellow/90"
              disabled={processing}
            >
              <Send className="h-5 w-5 text-quickfix-dark" />
            </Button>
          </div>
          {selectedImage && (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{selectedImage.name}</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-red-400 hover:text-red-300"
              >
                Törlés
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AIChat;