import { WeatherChatbot } from "@/components/WeatherChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-sky-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute top-32 right-20 w-16 h-16 bg-white/5 rounded-full animate-bounce" style={{animationDelay: "1s"}} />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse" style={{animationDelay: "2s"}} />
        <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{animationDelay: "0.5s"}} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <WeatherChatbot />
      </div>
    </div>
  );
};

export default Index;
