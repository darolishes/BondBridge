import { cn } from "@/lib/utils";

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
  
  return (
    <div className="flex gap-2 overflow-x-auto py-2 no-scrollbar">
      {categories.map((category) => (
        <button 
          key={category}
          className={cn(
            "whitespace-nowrap px-4 py-1.5 rounded-full text-sm",
            selectedCategory === category 
              ? "bg-[#FF6B6B] text-white font-medium" 
              : "bg-primary border border-gray-500 text-secondary"
          )}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
