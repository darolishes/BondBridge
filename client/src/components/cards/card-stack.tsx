import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { Card } from "@shared/schema";
import { ConversationCard } from "@/components/cards/conversation-card";
import { CardControls } from "@/components/cards/card-controls";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CardStackProps {
  cards: Card[];
}

export function CardStack({ cards }: CardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { toast } = useToast();
  
  const cardX = useMotionValue(0);
  const cardRotation = useTransform(cardX, [-200, 200], [-10, 10]);
  
  const saveCardMutation = useMutation({
    mutationFn: async (cardId: number) => {
      const res = await apiRequest("POST", "/api/saved-cards", { cardId });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/saved-cards"] });
      toast({
        title: "Card saved",
        description: "The card has been added to your saved collection."
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving card",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    
    if (dir === "right") {
      // Save the card when swiped right
      saveCardMutation.mutate(cards[currentIndex].id);
    }
    
    // Move to the next card after a short delay
    setTimeout(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= cards.length - 1 ? 0 : prevIndex + 1
      );
      setDirection(null);
      cardX.set(0);
    }, 300);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      handleSwipe("right");
    } else if (info.offset.x < -100) {
      handleSwipe("left");
    }
  };
  
  const handleCardAction = (action: "reject" | "favorite" | "accept") => {
    if (action === "reject") {
      handleSwipe("left");
    } else if (action === "accept") {
      handleSwipe("right");
    } else if (action === "favorite") {
      // In a real implementation, this might have separate logic from "accept"
      saveCardMutation.mutate(cards[currentIndex].id);
      
      toast({
        title: "Added to favorites",
        description: "This card has been added to your favorites."
      });
    }
  };

  if (!cards.length) {
    return (
      <div className="card-stack relative flex items-center justify-center h-[calc(100vh-220px)]">
        <p className="text-gray-600 text-center">No cards available.</p>
      </div>
    );
  }

  // Select current card and next two cards for the stack
  const currentCard = cards[currentIndex % cards.length];
  const nextCard = cards[(currentIndex + 1) % cards.length];
  const thirdCard = cards[(currentIndex + 2) % cards.length];

  return (
    <div className="card-stack relative flex items-center justify-center h-[calc(100vh-220px)]">
      {/* Third card (bottom of stack) */}
      <div className="card absolute w-[85%] max-w-sm -mt-2 -ml-2 opacity-90 scale-[0.96]">
        <ConversationCard card={thirdCard} />
      </div>
      
      {/* Second card (middle of stack) */}
      <div className="card absolute w-[85%] max-w-sm -mt-1 -ml-1 opacity-95 scale-[0.98]">
        <ConversationCard card={nextCard} />
      </div>
      
      {/* Current card (top of stack) - swipeable */}
      <motion.div
        className="card absolute w-[85%] max-w-sm z-10"
        style={{ x: cardX, rotate: cardRotation }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={direction ? { 
      x: direction === "left" ? -500 : 500, 
      y: Math.random() > 0.5 ? -100 : 100,
      rotate: direction === "left" ? -30 : 30 
    } : {}}
      >
        <ConversationCard 
          card={currentCard} 
          onSave={() => saveCardMutation.mutate(currentCard.id)} 
        />
      </motion.div>
      
      {/* Card controls */}
      <CardControls onAction={handleCardAction} />
    </div>
  );
}
