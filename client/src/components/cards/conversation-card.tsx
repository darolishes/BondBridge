import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card as CardType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, MessageCircleHeart, Tag, ArrowRight, ChevronDown } from "lucide-react";
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
  
  const handleViewRelated = () => {
    if (onViewRelated) {
      onViewRelated(card);
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
      "bg-white rounded-3xl shadow-md overflow-hidden h-full relative border border-gray-200",
      "after:absolute after:inset-0 after:rounded-3xl after:blur-sm after:opacity-5 after:-z-10",
      isExpanded && "pb-6"
    )}>
      {/* Card content */}
      <CardContent className="p-7 flex flex-col h-full relative z-10">
        <div className="mb-6 flex justify-between items-start">
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-4 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 shadow-sm border",
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
              "transition-all p-2 rounded-full border",
              isSaved 
                ? "text-accent bg-accent/10 border-accent/20" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50 border-gray-200"
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
        
        {/* Follow-up questions would be shown here if card has any */}
        {card.followUpQuestions && card.followUpQuestions.length > 0 && isExpanded && (
          <motion.div 
            className="mt-6 space-y-3 px-4 py-3 bg-primary/5 rounded-xl border border-primary/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-medium text-gray-700">Follow-up Questions:</h4>
            <ul className="space-y-2">
              {card.followUpQuestions.map((question, index) => (
                <li key={index} className="text-sm text-gray-600 pl-3 border-l-2 border-primary">
                  {question}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <Tag className={`h-3.5 w-3.5 mr-1.5 ${categoryColor}`} />
            <span className="text-sm text-gray-500 font-medium">#{card.tag}</span>
          </div>
          <motion.button 
            className="text-sm font-medium flex items-center gap-1 px-3 py-1 rounded-full 
              bg-accent/5 hover:bg-accent/10 transition-colors text-gray-700 border border-accent/20"
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
      </CardContent>
      
      {/* Expanded section with related cards */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-7 pt-1 overflow-hidden"
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
                    className="text-left justify-start h-auto py-3 border-accent/20 bg-accent/5 hover:border-accent/40 hover:bg-accent/10"
                    onClick={() => onViewRelated?.(relatedCard)}
                  >
                    <div>
                      <p className="text-gray-800 font-medium">{relatedCard.content}</p>
                      <div className="flex items-center mt-1">
                        <Tag className="h-3 w-3 mr-1.5 text-accent" />
                        <span className="text-xs text-gray-500">#{relatedCard.tag}</span>
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
    </Card>
  );
}
