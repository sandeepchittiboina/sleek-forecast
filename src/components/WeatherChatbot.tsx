import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { Card } from "@/components/ui/card";
import { Cloud, Sun, CloudRain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const WeatherChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your weather assistant. Ask me about weather in any city or location!",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the n8n webhook
      const response = await fetch("https://sandeepchittiboina.app.n8n.cloud/webhook-test/d3d366c9-533b-44ad-bbef-14c0fd630a48", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: result || "I received your message but didn't get a response. Please try again!",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to weather service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="flex gap-1">
          <Sun className="h-6 w-6 text-yellow-500 animate-pulse" />
          <Cloud className="h-6 w-6 text-primary animate-bounce" style={{animationDelay: "0.2s"}} />
          <CloudRain className="h-6 w-6 text-blue-500 animate-pulse" style={{animationDelay: "0.4s"}} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Weather Assistant</h1>
          <p className="text-sm text-muted-foreground">Get instant weather updates for any location</p>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col bg-glass/30 backdrop-blur-md border-border/20 shadow-glass overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-chat-bot border border-border/20 px-4 py-3 rounded-2xl rounded-bl-md backdrop-blur-sm shadow-soft">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.1s"}} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: "0.2s"}} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border/20 bg-glass/20">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </Card>
    </div>
  );
};