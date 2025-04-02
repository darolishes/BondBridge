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
  
  // Map categories to pastel colors
  const categoryStyles: Record<string, { bg: string, border: string }> = {
    "All": { 
      bg: "bg-white", 
      border: "border-gray-200" 
    },
    "Relationships": { 
      bg: "bg-accent", 
      border: "border-[#ddbcea]" 
    },
    "Self-reflection": { 
      bg: "bg-[#D1E7FF]", 
      border: "border-[#B8D3F2]" 
    },
    "Fun": { 
      bg: "bg-[#FFEEB3]", 
      border: "border-[#FFD166]" 
    },
    "Growth": { 
      bg: "bg-primary", 
      border: "border-[#a5e5d0]" 
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const style = categoryStyles[category];
        
        return (
          <motion.button 
            key={category}
            className={cn(
              "whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium shadow-sm transition-all border",
              isSelected 
                ? `${style.bg} text-gray-800 ${style.border}` 
                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
            )}
            onClick={() => onCategoryChange(category)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
}
