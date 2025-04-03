import { useMutation } from "@tanstack/react-query";
import { Card as CardType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, ExternalLink, MessageCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SavedCardItemProps {
  card: CardType;
}

export function SavedCardItem({ card }: SavedCardItemProps) {
  const { toast } = useToast();
  
  const removeSavedCardMutation = useMutation({
    mutationFn: async (cardId: number) => {
      const res = await apiRequest("DELETE", `/api/saved-cards/${cardId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-cards"] });
      toast({
        title: "Card removed",
        description: "The card has been removed from your saved collection."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error removing card",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleRemove = () => {
    removeSavedCardMutation.mutate(card.id);
  };
  
  // Map difficulty to appropriate pastel colors
  const difficultyStyles = {
    "Deep": {
      bgColor: "bg-accent",
      borderColor: "border-[#ddbcea]",
    },
    "Connecting": {
      bgColor: "bg-[#FFEEB3]",
      borderColor: "border-[#FFD166]",
    },
    "Fun": {
      bgColor: "bg-primary",
      borderColor: "border-[#a5e5d0]",
    }
  };
  
  const difficultyStyle = difficultyStyles[card.difficulty as keyof typeof difficultyStyles] || difficultyStyles.Deep;

  // Map category to new pastel icon colors
  const categoryColor = {
    "personal": "text-purple-500",
    "relationship": "text-pink-500",
    "family": "text-amber-500",
    "work": "text-emerald-500",
    "fun": "text-blue-500",
  }[card.category.toLowerCase()] || "text-purple-500";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <CardContent className="p-5">
          <div className="mb-3 flex justify-between items-start">
            <span className={cn(
              "px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1.5 border",
              difficultyStyle.bgColor,
              difficultyStyle.borderColor,
              "text-gray-800"
            )}>
              {card.difficulty}
            </span>
            <button 
              className="text-gray-400 hover:text-pink-500 transition-colors p-1 rounded-full hover:bg-gray-50"
              onClick={handleRemove}
              disabled={removeSavedCardMutation.isPending}
            >
              <Bookmark className="h-5 w-5" fill="currentColor" />
            </button>
          </div>
          
          <p className="text-lg font-medium mb-4 text-gray-800 leading-relaxed">{card.content}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className={`h-3 w-3 mr-1.5 ${categoryColor}`} />
              <span className="text-xs text-gray-500">#{card.tag}</span>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 text-xs font-medium border border-gray-100">
              <span>Use Now</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
