
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
      id: 'welcome',
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

      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userMessage: Message = {
        id: messageId,
        content: input,
        sender: 'user',
        timestamp: new Date(),
        image: imageBase64 || undefined,
      };

      setMessages(prev => [...prev, userMessage]);

      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OpenAI API kulcs nincs beállítva. Kérjük, ellenőrizze a környezeti változókat.');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI assistant that helps users with their questions in Hungarian language."
            },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content + (msg.image ? '\n[Image attached]' : ''),
            })),
            {
              role: "user",
              content: input + (imageBase64 ? '\n[Image:' + imageBase64.substring(0, 100) + '...]' : ''),
            }
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        // Ha OpenAI nem működik, próbáljuk meg a Brave Search API-t
        try {
          const braveApiKey = import.meta.env.VITE_BRAVE_SEARCH_API_KEY;
          if (!braveApiKey) {
            throw new Error('Brave Search API kulcs nincs beállítva');
          }

          const braveResponse = await fetch('https://api.search.brave.com/res/v1/text/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Subscription-Token': braveApiKey,
            },
            body: JSON.stringify({
              query: input,
              language: "hu"
            }),
          });

          if (!braveResponse.ok) {
            throw new Error('Brave Search API hiba');
          }

          const braveData = await braveResponse.json();
          return {
            choices: [{
              message: {
                content: braveData.text || 'Sajnálom, nem tudtam választ generálni.'
              }
            }]
          };
        } catch (braveError) {
          // Ha mindkét API hibás, dobjuk az eredeti OpenAI hibát
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `API hiba: ${response.status} - ${errorData.error?.message || 'Ismeretlen hiba történt'}`
          );
        }
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        content: data.choices[0].message.content || 'Sajnálom, nem tudtam értelmezni a választ.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setInput('');
      setSelectedImage(null);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = error instanceof Error && error.message.includes('429') 
          ? 'Az AI szolgáltatás átmenetileg nem elérhető a nagy terhelés miatt. Kérjük, próbálja újra néhány perc múlva.'
          : error instanceof Error ? error.message : 'Ismeretlen hiba történt';
      toast.error(`Hiba történt: ${errorMessage}`);

      const errorResponse: Message = {
        id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
    <div className="flex flex-col h-full bg-quickfix-dark">
      <div className="flex items-center p-4 border-b border-gray-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">QuickFix AI Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.sender === 'user'
                  ? 'flex-row-reverse'
                  : 'flex-row'
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {message.sender === 'user' ? 'U' : 'AI'}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Uploaded content"
                    className="mt-2 max-w-sm rounded"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
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
