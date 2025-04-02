import { X, Heart, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardControlsProps {
  onAction: (action: "reject" | "favorite" | "accept") => void;
}

export function CardControls({ onAction }: CardControlsProps) {
  return (
    <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 items-center">
      <button 
        className="bg-white p-4 rounded-full shadow-lg text-gray-700 hover:bg-gray-200 transition-colors"
        onClick={() => onAction("reject")}
        aria-label="Reject card"
      >
        <X className="h-5 w-5" />
      </button>
      
      <button 
        className="bg-white p-4 rounded-full shadow-lg text-[#FF6B6B] hover:bg-gray-200 transition-colors"
        onClick={() => onAction("favorite")}
        aria-label="Favorite card"
      >
        <Heart className="h-5 w-5" />
      </button>
      
      <button 
        className="bg-white p-4 rounded-full shadow-lg text-[#4ECDC4] hover:bg-gray-200 transition-colors"
        onClick={() => onAction("accept")}
        aria-label="Accept card"
      >
        <Check className="h-5 w-5" />
      </button>
    </div>
  );
}
