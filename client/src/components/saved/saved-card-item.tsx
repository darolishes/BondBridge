import { useMutation } from "@tanstack/react-query";
import { Card as CardType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, ExternalLink, MessageCircle } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
  
  // Map difficulty to appropriate gradient
  const difficultyGradient = {
    "Deep": "from-indigo-500 to-purple-600",
    "Connecting": "from-amber-400 to-orange-500",
    "Fun": "from-rose-400 to-pink-600"
  }[card.difficulty as string] || "from-emerald-500 to-teal-600";

  // Map category to appropriate icon color
  const categoryColor = {
    "personal": "text-purple-400",
    "relationship": "text-rose-400",
    "family": "text-amber-400",
    "work": "text-emerald-400",
    "fun": "text-blue-400",
  }[card.category.toLowerCase()] || "text-purple-400";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-4"
    >
      <Card className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-md overflow-hidden">
        <CardContent className="p-5">
          <div className="mb-3 flex justify-between items-start">
            <span className={`px-3 py-1 bg-gradient-to-r ${difficultyGradient} text-white text-xs font-medium rounded-full shadow-sm`}>
              {card.difficulty}
            </span>
            <button 
              className="text-white/70 hover:text-white transition-colors"
              onClick={handleRemove}
              disabled={removeSavedCardMutation.isPending}
            >
              <Bookmark className="h-5 w-5" fill="currentColor" />
            </button>
          </div>
          <p className="text-lg font-medium mb-3 text-white leading-relaxed">{card.content}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle className={`h-3 w-3 mr-1 ${categoryColor}`} />
              <span className="text-xs text-white/60">#{card.tag}</span>
            </div>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-medium">
              <span>Use Now</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
