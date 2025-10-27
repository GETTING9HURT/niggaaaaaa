"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CornerDownLeft, Loader2, Mic, User, Bot, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { medicinalKnowledgeChatbot } from '@/ai/flows/medicinal-knowledge-chatbot';
import { useToast } from '@/hooks/use-toast';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export function KnowledgeChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const handleQuery = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await medicinalKnowledgeChatbot({ query });
      const botMessage: Message = { role: 'bot', content: response.answer };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Failed to get a response from the chatbot. Please try again.',
      });
      const errorMessage: Message = { role: 'bot', content: "Sorry, I couldn't process that. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      handleQuery(query);
      // Optional: clean up the URL
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, [searchParams]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleQuery(input);
  };

  return (
    <div className="h-full flex flex-col border rounded-lg shadow-inner">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-lg max-w-md">
              <p className="font-semibold">PharmaVaidya Bot</p>
              <p className="text-sm">Hello! How can I help you learn about medicinal plants today?</p>
            </div>
          </div>
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'bot' && (
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-md ${
                  message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}
              >
                {message.role === 'bot' && <p className="font-semibold">PharmaVaidya Bot</p>}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <Avatar>
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarFallback><Bot /></AvatarFallback>
              </Avatar>
              <div className="bg-muted p-3 rounded-lg max-w-md">
                <p className="font-semibold">PharmaVaidya Bot</p>
                <div className="flex items-center gap-2 text-sm">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g., What are the uses of Tulsi?"
            className="pr-24"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button type="button" size="icon" variant="ghost" disabled={isLoading}>
              <Mic className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <CornerDownLeft className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
