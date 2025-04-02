import { X, Check, Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardControlsProps {
  onAction: (action: "reject" | "favorite" | "accept") => void;
}

export function CardControls({ onAction }: CardControlsProps) {
  return (
    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-5 items-center">
      <motion.button 
        className={cn(
          "relative p-5 rounded-full transition-all bg-white",
          "text-gray-500",
          "hover:bg-gray-50 hover:text-gray-700"
        )}
        onClick={() => onAction("reject")}
        aria-label="Skip card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Skip</span>
      </motion.button>
      
      <motion.button 
        className={cn(
          "relative p-6 rounded-full transition-all z-10 bg-accent",
          "text-gray-700",
          "hover:bg-[#e9d1f0]"
        )}
        onClick={() => onAction("favorite")}
        aria-label="Save card"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bookmark className="h-7 w-7" />
        <span className="sr-only">Save</span>
      </motion.button>
      
      <motion.button 
        className={cn(
          "relative p-5 rounded-full transition-all bg-primary",
          "text-gray-700",
          "hover:bg-[#c2f0df]"
        )}
        onClick={() => onAction("accept")}
        aria-label="Accept card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Check className="h-6 w-6" />
        <span className="sr-only">Accept</span>
      </motion.button>
    </div>
  );
}
