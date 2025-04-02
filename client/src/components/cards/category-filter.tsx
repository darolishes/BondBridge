import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  
  // Primary categories (always visible)
  const primaryCategories = [
    "All", 
    "Relationships", 
    "Self-reflection", 
    "Fun", 
    "Growth"
  ];
  
  // Extended categories (shown when expanded)
  const extendedCategories = [
    "Family",
    "Work",
    "Intimacy",
    "Childhood",
    "Future",
    "Desires",
    "Values",
    "Travel",
    "Spirituality",
    "Fears"
  ];

  // All categories to display based on toggle state
  const categoriesToDisplay = showAllCategories 
    ? [...primaryCategories, ...extendedCategories]
    : primaryCategories;
  
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
    },
    "Family": { 
      bg: "bg-[#FFCDD2]", 
      border: "border-[#EF9A9A]" 
    },
    "Work": { 
      bg: "bg-[#BBDEFB]", 
      border: "border-[#90CAF9]" 
    },
    "Intimacy": { 
      bg: "bg-[#F8BBD0]", 
      border: "border-[#F48FB1]" 
    },
    "Childhood": { 
      bg: "bg-[#DCEDC8]", 
      border: "border-[#C5E1A5]" 
    },
    "Future": { 
      bg: "bg-[#B3E5FC]", 
      border: "border-[#81D4FA]" 
    },
    "Desires": { 
      bg: "bg-[#E1BEE7]", 
      border: "border-[#CE93D8]" 
    },
    "Values": { 
      bg: "bg-[#C8E6C9]", 
      border: "border-[#A5D6A7]" 
    },
    "Travel": { 
      bg: "bg-[#FFF9C4]", 
      border: "border-[#FFF59D]" 
    },
    "Spirituality": { 
      bg: "bg-[#D1C4E9]", 
      border: "border-[#B39DDB]" 
    },
    "Fears": { 
      bg: "bg-[#FFCCBC]", 
      border: "border-[#FFAB91]" 
    }
  };

  // Ensure all categories have a style, fallback to primary color if not defined
  const getStyleForCategory = (category: string) => {
    return categoryStyles[category] || { 
      bg: "bg-primary", 
      border: "border-[#a5e5d0]" 
    };
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3 overflow-x-auto py-3 no-scrollbar">
        {categoriesToDisplay.map((category) => {
          const isSelected = selectedCategory === category;
          const style = getStyleForCategory(category);
          
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
      
      <div className="flex justify-center">
        <motion.button
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 py-1 px-3 rounded-full"
          onClick={() => setShowAllCategories(!showAllCategories)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAllCategories ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              <span>Show More Categories</span>
              <ChevronDown className="h-3 w-3" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
