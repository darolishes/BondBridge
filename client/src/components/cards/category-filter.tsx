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
    "Self-reflection"
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
  const categoryStyles: Record<string, { bg: string, border: string, textColor: string }> = {
    "All": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Relationships": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Self-reflection": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Family": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Work": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Intimacy": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Childhood": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Future": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Desires": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Values": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Travel": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Spirituality": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    },
    "Fears": { 
      bg: "bg-white", 
      border: "border-gray-200",
      textColor: "text-gray-800"
    }
  };

  // Progress bar style based on selectedCategory
  const getProgressWidth = (category: string) => {
    switch(category) {
      case "All": return "w-full";
      case "Relationships": return "w-2/3";
      case "Self-reflection": return "w-1/3";
      default: return "w-0";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto py-1 no-scrollbar">
        {categoriesToDisplay.map((category) => {
          const isSelected = selectedCategory === category;
          const style = categoryStyles[category] || categoryStyles["All"];
          
          return (
            <motion.button 
              key={category}
              className={cn(
                "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all border shadow-sm",
                isSelected 
                  ? `${style.bg} ${style.textColor} border-primary/50` 
                  : `${style.bg} text-gray-500 ${style.border} hover:bg-gray-50`
              )}
              onClick={() => onCategoryChange(category)}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {category}
            </motion.button>
          );
        })}
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200/60 rounded-full overflow-hidden mt-1 mb-4">
        <div className={`h-full bg-gradient-to-r from-primary/60 to-primary ${getProgressWidth(selectedCategory)}`}></div>
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
