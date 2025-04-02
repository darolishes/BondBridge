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
  
  // Map categories to pastel colors - mint green (primary) and lavender (accent)
  const categoryStyles: Record<string, { bg: string, border: string }> = {
    "All": { 
      bg: "bg-white", 
      border: "border-gray-300" 
    },
    "Relationships": { 
      bg: "bg-accent/30", 
      border: "border-accent/50" 
    },
    "Self-reflection": { 
      bg: "bg-primary/30", 
      border: "border-primary/50" 
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
      bg: "bg-accent/20", 
      border: "border-accent/40" 
    },
    "Work": { 
      bg: "bg-primary/20", 
      border: "border-primary/40" 
    },
    "Intimacy": { 
      bg: "bg-accent/40", 
      border: "border-accent/60" 
    },
    "Childhood": { 
      bg: "bg-primary/40", 
      border: "border-primary/60" 
    },
    "Future": { 
      bg: "bg-accent/50", 
      border: "border-accent/70" 
    },
    "Desires": { 
      bg: "bg-primary/50", 
      border: "border-primary/70" 
    },
    "Values": { 
      bg: "bg-accent/60", 
      border: "border-accent/80" 
    },
    "Travel": { 
      bg: "bg-primary/60", 
      border: "border-primary/80" 
    },
    "Spirituality": { 
      bg: "bg-accent/70", 
      border: "border-accent/90" 
    },
    "Fears": { 
      bg: "bg-primary/70", 
      border: "border-primary/90" 
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
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 py-1.5 px-4 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
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
