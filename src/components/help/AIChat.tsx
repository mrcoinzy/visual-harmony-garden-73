import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  image?: string;
}

interface AIChatProps {
  onBack: () => void;
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
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      toast.success('Kép sikeresen kiválasztva');
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && !selectedImage) || processing) return;

    setProcessing(true);
    let imageBase64 = '';

    try {
      if (selectedImage) {
        imageBase64 = await convertImageToBase64(selectedImage);
      }

      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        sender: 'user',
        timestamp: new Date(),
        image: imageBase64 || undefined,
      };

      setMessages(prev => [...prev, userMessage]);

      const response = await fetch('https://api.brave.com/llama/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Brave-Key': process.env.BRAVE_API_KEY || '',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that helps users with their questions and problems.'
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content + (msg.image ? '\n[Image attached]' : ''),
            })),
            {
              role: 'user',
              content: input + (imageBase64 ? '\n[Image:' + imageBase64.substring(0, 100) + '...]' : ''),
            },
          ],
          temperature: 0.7,
          stream: false
        }),
      });

      if (!response.ok) {
        const errorText = `Hiba történt az AI válasz generálása közben. HTTP státusz kód: ${response.status}`;
        throw new Error(errorText);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: data.choices?.[0]?.message?.content || 'Sajnálom, nem tudtam értelmezni a választ.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setInput('');
      setSelectedImage(null);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = (error instanceof Error) ? error.message : 'Ismeretlen hiba történt az AI-val.';
      toast.error(`Hiba történt: ${errorMessage}`);

      const errorResponse: Message = {
        id: Date.now().toString(),
        content: `Elnézést, technikai probléma lépett fel: ${errorMessage}. Kérem próbálja újra később.`,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setProcessing(false);
    }
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
          <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600">
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
                  <Avatar className="h-6 w-6 mr-2 mt-0.5 bg-gradient-to-br from-blue-500 to-purple-600">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Feltöltött kép"
                      className="max-w-xs rounded-lg mb-2"
                    />
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.sender === 'user' && (
                  <Avatar className="h-6 w-6 ml-2 mt-0.5 bg-quickfix-dark">
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
        <div className="flex gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            ref={fileInputRef}
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-400 hover:text-white"
          >
            <ImagePlus className="h-5 w-5" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Írja be üzenetét..."
            className="flex-1"
            disabled={processing}
          />
          <Button type="submit" disabled={processing}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
        {selectedImage && (
          <div className="mt-2 text-sm text-gray-400">
            Kiválasztott kép: {selectedImage.name}
          </div>
        )}
      </form>
    </div>
  );
};

export default AIChat;