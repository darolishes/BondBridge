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
  
  // Map difficulty to appropriate colors and gradients
  const difficultyStyles = {
    "Deep": {
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-500/10 via-purple-600/5 to-transparent",
      accent: "border-indigo-500/30",
      icon: "text-indigo-300",
      glow: "after:bg-indigo-500/20"
    },
    "Connecting": {
      gradient: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-400/10 via-orange-500/5 to-transparent",
      accent: "border-amber-400/30",
      icon: "text-amber-200",
      glow: "after:bg-amber-400/20"
    },
    "Fun": {
      gradient: "from-rose-400 to-pink-600",
      bgGradient: "from-rose-400/10 via-pink-600/5 to-transparent",
      accent: "border-rose-400/30",
      icon: "text-rose-200",
      glow: "after:bg-rose-400/20"
    }
  };
  
  const difficultyStyle = difficultyStyles[card.difficulty as keyof typeof difficultyStyles] || difficultyStyles.Deep;
  
  // Map category to icon color
  const categoryColor = {
    "personal": "text-purple-400",
    "relationship": "text-rose-400",
    "family": "text-amber-400",
    "work": "text-emerald-400",
    "fun": "text-blue-400",
  }[card.category.toLowerCase()] || "text-purple-400";

  return (
    <Card className={cn(
      "backdrop-blur-lg bg-gradient-to-br from-white/10 via-white/5 to-transparent",
      "border-white/20 rounded-3xl shadow-xl overflow-hidden h-full relative",
      "after:absolute after:inset-0 after:rounded-3xl after:blur-2xl after:opacity-20 after:-z-10",
      difficultyStyle.glow
    )}>
      {/* Subtle animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-b ${difficultyStyle.bgGradient} opacity-10`}></div>
      
      {/* Card content */}
      <CardContent className="p-7 flex flex-col h-full relative z-10">
        <div className="mb-6 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={`px-4 py-1.5 bg-gradient-to-r ${difficultyStyle.gradient} text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5`}>
              <MessageCircleHeart className={`h-3.5 w-3.5 ${difficultyStyle.icon}`} />
              <span>{card.difficulty}</span>
            </span>
          </div>
          <motion.button 
            className={cn(
              "transition-all p-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10",
              isSaved ? "text-rose-400 border-rose-400/30" : "text-white/70 hover:text-white hover:bg-white/10"
            )}
            onClick={handleSave}
            whileTap={{ scale: 0.9 }}
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
          <p className="text-center text-2xl font-heading font-semibold leading-relaxed text-white drop-shadow-sm">
            {card.content}
          </p>
        </motion.div>
        
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-white/10">
          <div className="flex items-center">
            <Tag className={`h-3.5 w-3.5 mr-1.5 ${categoryColor}`} />
            <span className="text-sm text-white/70 font-medium">#{card.tag}</span>
          </div>
          <motion.button 
            className={`text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-full 
              bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white`}
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
