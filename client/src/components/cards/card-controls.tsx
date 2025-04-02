import { X, Heart, Check, ThumbsDown, Bookmark } from "lucide-react";
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
          "relative p-5 rounded-full text-white transition-all",
          "bg-white/10 backdrop-blur-md border border-white/10",
          "hover:bg-rose-500/20 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/20"
        )}
        onClick={() => onAction("reject")}
        aria-label="Reject card"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Skip</span>
      </motion.button>
      
      <motion.button 
        className={cn(
          "relative p-6 rounded-full text-white transition-all z-10",
          "bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30",
          "hover:shadow-xl hover:shadow-indigo-500/40 hover:from-indigo-600 hover:to-violet-700"
        )}
        onClick={() => onAction("favorite")}
        aria-label="Favorite card"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bookmark className="h-7 w-7" />
        <span className="sr-only">Save</span>
        <div className="absolute inset-0 rounded-full bg-indigo-400 blur-xl opacity-30 -z-10"></div>
      </motion.button>
      
      <motion.button 
        className={cn(
          "relative p-5 rounded-full text-white transition-all",
          "bg-white/10 backdrop-blur-md border border-white/10",
          "hover:bg-emerald-500/20 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/20"
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
