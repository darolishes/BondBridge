import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card as CardType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, ExternalLink } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  
  // Map difficulty to appropriate color
  const difficultyColor = {
    "Deep": "bg-[#4ECDC4]",
    "Connecting": "bg-[#FFD166]",
    "Fun": "bg-[#FF6B6B]"
  }[card.difficulty as string] || "bg-[#4ECDC4]";

  return (
    <Card className="bg-secondary rounded-xl shadow-md overflow-hidden">
      <CardContent className="p-4">
        <div className="mb-2 flex justify-between items-start">
          <span className={`px-2 py-0.5 ${difficultyColor} text-white text-xs font-medium rounded-full`}>
            {card.difficulty}
          </span>
          <button 
            className="text-[#FF6B6B] transition-colors"
            onClick={handleRemove}
            disabled={removeSavedCardMutation.isPending}
          >
            <Bookmark className="h-4 w-4" fill="#FF6B6B" />
          </button>
        </div>
        <p className="text-lg font-medium mb-2">{card.content}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">#{card.tag}</span>
          <button className="text-xs text-[#FF6B6B] font-medium flex items-center gap-1">
            <span>Use Now</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
