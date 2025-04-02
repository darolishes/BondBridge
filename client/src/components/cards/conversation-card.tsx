import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@shared/schema";
import { Bookmark, MessageCircle, Heart, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ConversationCardProps {
  card: CardType;
  onSave?: () => void;
  onViewRelated?: (card: CardType) => void;
  expanded?: boolean;
}

export function ConversationCard({ card, onSave, onViewRelated, expanded = false }: ConversationCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  const handleSave = () => {
    setIsSaved(true);
    if (onSave) {
      onSave();
    }
  };
  
  // Fetch related cards if we're expanded
  const { data: relatedCards, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["/api/related-cards", card.id],
    queryFn: async () => {
      const res = await fetch(`/api/related-cards/${card.id}`);
      if (!res.ok) return [];
      return res.json();
    },
    enabled: isExpanded,
  });
  
  // Map difficulty to appropriate pastel colors
  const difficultyStyles = {
    "Deep": {
      bgColor: "bg-accent",
      tagColor: "text-gray-800",
      icon: "text-gray-700"
    },
    "Connecting": {
      bgColor: "bg-[#FFEEB3]",
      tagColor: "text-gray-800",
      icon: "text-gray-700"
    },
    "Fun": {
      bgColor: "bg-primary",
      tagColor: "text-gray-800",
      icon: "text-gray-700"
    }
  };
  
  const difficultyStyle = difficultyStyles[card.difficulty as keyof typeof difficultyStyles] || {
    bgColor: "bg-[#FFEEB3]",
    tagColor: "text-gray-800",
    icon: "text-gray-700"
  };

  return (
    <div className={cn(
      "bg-white rounded-3xl shadow-md overflow-hidden h-full relative",
      isExpanded && "pb-6"
    )}>
      <div className="p-6 flex flex-col h-full relative z-10">
        <div className="mb-6 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-4 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 shadow-sm",
              difficultyStyle.bgColor,
              difficultyStyle.tagColor
            )}>
              <MessageCircle className={`h-3.5 w-3.5 ${difficultyStyle.icon}`} />
              <span>{card.difficulty || "Connecting"}</span>
            </span>
          </div>
          <motion.button 
            className={cn(
              "transition-all p-2 rounded-full",
              isSaved 
                ? "text-accent bg-accent/10" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            )}
            onClick={handleSave}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
          </motion.button>
        </div>
        
        <motion.div 
          className="flex-grow flex items-center justify-center px-3 py-6"
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
            <Heart className="h-3.5 w-3.5 mr-1.5 text-pink-500" />
            <span className="text-sm text-gray-500 font-medium">#{card.tag || "Relationships"}</span>
          </div>
          <motion.button 
            className="text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-full 
              bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 border border-gray-200"
            whileHover={{ x: 3 }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <span>Hide Details</span>
                <ChevronDown className="h-3 w-3" />
              </>
            ) : (
              <>
                <span>Related</span>
                <ArrowRight className="h-3 w-3" />
              </>
            )}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-7 pt-1 pb-5 overflow-hidden"
          >
            <h4 className="text-sm font-medium text-gray-700 mb-3">Related Topics:</h4>
            
            {isLoadingRelated ? (
              <div className="py-4 flex justify-center">
                <ChevronDown className="h-5 w-5 animate-bounce text-gray-300" />
              </div>
            ) : relatedCards && relatedCards.length > 0 ? (
              <div className="grid grid-cols-1 gap-2 pb-3">
                {relatedCards.map((relatedCard: CardType) => (
                  <Button
                    key={relatedCard.id}
                    variant="outline"
                    size="sm"
                    className="text-left justify-start h-auto py-3 border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                    onClick={() => onViewRelated?.(relatedCard)}
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{relatedCard.content}</p>
                      <div className="flex items-center mt-1">
                        <Heart className="h-3 w-3 mr-1.5 text-pink-500" />
                        <span className="text-xs text-gray-500">#{relatedCard.tag || "Relationships"}</span>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic py-2 px-3 bg-gray-50 rounded-lg border border-gray-200">No related cards found for this topic.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
