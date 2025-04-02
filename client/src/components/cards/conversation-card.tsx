import { useState } from "react";
import { Card as CardType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, MessageCircleHeart, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  
  // Map difficulty to appropriate pastel colors
  const difficultyStyles = {
    "Deep": {
      bgColor: "bg-accent",
      borderColor: "border-[#ddbcea]",
      tagColor: "text-gray-800",
      icon: "text-gray-700"
    },
    "Connecting": {
      bgColor: "bg-[#FFEEB3]",
      borderColor: "border-[#FFD166]",
      tagColor: "text-gray-800",
      icon: "text-gray-700"
    },
    "Fun": {
      bgColor: "bg-primary",
      borderColor: "border-[#a5e5d0]",
      tagColor: "text-gray-800",
      icon: "text-gray-700"
    }
  };
  
  const difficultyStyle = difficultyStyles[card.difficulty as keyof typeof difficultyStyles] || difficultyStyles.Deep;
  
  // Map category to icon color for the new pastel palette
  const categoryColor = {
    "personal": "text-purple-500",
    "relationship": "text-pink-500",
    "family": "text-amber-500",
    "work": "text-emerald-500",
    "fun": "text-blue-500",
  }[card.category.toLowerCase()] || "text-purple-500";

  return (
    <Card className={cn(
      "bg-white rounded-3xl shadow-sm overflow-hidden h-full relative border-gray-100",
      "after:absolute after:inset-0 after:rounded-3xl after:blur-sm after:opacity-5 after:-z-10"
    )}>
      {/* Card content */}
      <CardContent className="p-7 flex flex-col h-full relative z-10">
        <div className="mb-6 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-4 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 shadow-sm",
              difficultyStyle.bgColor,
              difficultyStyle.borderColor,
              difficultyStyle.tagColor
            )}>
              <MessageCircleHeart className={`h-3.5 w-3.5 ${difficultyStyle.icon}`} />
              <span>{card.difficulty}</span>
            </span>
          </div>
          <motion.button 
            className={cn(
              "transition-all p-2 rounded-full",
              isSaved ? "text-pink-500 bg-pink-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
            onClick={handleSave}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
        </div>
        
        <motion.div 
          className="flex-grow flex items-center justify-center px-2 py-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-2xl font-heading font-medium leading-relaxed text-gray-800">
            {card.content}
          </p>
        </motion.div>
        
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <Tag className={`h-3.5 w-3.5 mr-1.5 ${categoryColor}`} />
            <span className="text-sm text-gray-500 font-medium">#{card.tag}</span>
          </div>
          <motion.button 
            className="text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-full 
              bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 border border-gray-100"
            whileHover={{ x: 3 }}
          >
            <span>Related</span>
            <ArrowRight className="h-3 w-3" />
          </motion.button>
        </div>
      </CardContent>
    </Card>
  );
}
