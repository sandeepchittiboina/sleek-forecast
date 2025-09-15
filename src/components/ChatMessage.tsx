import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in slide-in-from-bottom-2 duration-300",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-4 py-3 rounded-2xl backdrop-blur-sm shadow-soft",
        isUser 
          ? "bg-chat-user text-primary-foreground rounded-br-md" 
          : "bg-chat-bot text-foreground border border-border/20 rounded-bl-md"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        <div className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};