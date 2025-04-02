import { useState } from "react";
import { Card as CardType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationCardProps {
  card: CardType;
  onSave?: () => void;
}

export function ConversationCard({ card, onSave }: ConversationCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    setIsSaved(true);
    if (onSave) {
      onSave();
    }
  };
  
  // Map difficulty to appropriate color
  const difficultyColor = {
    "Deep": "bg-[#4ECDC4]",
    "Connecting": "bg-[#FFD166]",
    "Fun": "bg-[#FF6B6B]"
  }[card.difficulty as string] || "bg-[#4ECDC4]";
  
  return (
    <Card className="bg-secondary rounded-3xl shadow-xl overflow-hidden h-full">
      <div className="shine-effect rounded-3xl absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4 flex justify-between items-start">
          <span className={`px-3 py-1 ${difficultyColor} text-white text-xs font-medium rounded-full`}>
            {card.difficulty}
          </span>
          <button 
            className={cn(
              "transition-colors",
              isSaved ? "text-[#FF6B6B]" : "text-gray-400 hover:text-[#FF6B6B]"
            )}
            onClick={handleSave}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "#FF6B6B" : "none"} />
          </button>
        </div>
        <div className="flex-grow flex items-center justify-center p-4">
          <p className="text-center text-2xl font-heading font-semibold leading-relaxed">
            {card.content}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-400">#{card.tag}</span>
          <button className="text-sm text-[#FF6B6B] font-medium">
            View related
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
