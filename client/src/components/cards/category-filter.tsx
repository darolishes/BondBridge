import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories = [
    "All", 
    "Relationships", 
    "Self-reflection", 
    "Fun", 
    "Growth"
  ];
  
  // Map categories to gradient colors
  const categoryGradients: Record<string, string> = {
    "All": "from-blue-500 to-purple-600",
    "Relationships": "from-pink-500 to-rose-500",
    "Self-reflection": "from-indigo-500 to-blue-600",
    "Fun": "from-amber-400 to-orange-500",
    "Growth": "from-emerald-400 to-teal-600"
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
      {categories.map((category) => (
        <motion.button 
          key={category}
          className={cn(
            "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all",
            selectedCategory === category 
              ? `bg-gradient-to-r ${categoryGradients[category]} text-white` 
              : "bg-white/10 backdrop-blur-sm text-white/80 border border-white/10 hover:bg-white/20"
          )}
          onClick={() => onCategoryChange(category)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
