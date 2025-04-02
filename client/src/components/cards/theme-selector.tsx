import { useQuery } from "@tanstack/react-query";
import { CardTheme } from "@shared/schema";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ThemeSelectorProps {
  selectedThemeId: number | null;
  onThemeChange: (themeId: number | null) => void;
}

export function ThemeSelector({ selectedThemeId, onThemeChange }: ThemeSelectorProps) {
  const { data: themes, isLoading, error } = useQuery<CardTheme[]>({
    queryKey: ["/api/card-themes"],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !themes) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        Unable to load themes. Please try again later.
      </div>
    );
  }

  return (
    <div className="py-3">
      <h3 className="text-sm font-medium mb-3 text-gray-700">Filter by Theme</h3>
      <div className="flex flex-wrap gap-2">
        <motion.button
          key="all-themes"
          className={cn(
            "px-4 py-2 rounded-md text-xs font-medium shadow-sm transition-all border",
            selectedThemeId === null
              ? "bg-white text-gray-800 border-gray-200"
              : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
          )}
          onClick={() => onThemeChange(null)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          layout
        >
          All Themes
        </motion.button>

        {themes.map((theme) => {
          const isSelected = selectedThemeId === theme.id;
          
          return (
            <motion.button
              key={theme.id}
              className={cn(
                "px-4 py-2 rounded-md text-xs font-medium shadow-sm transition-all border",
                isSelected
                  ? "text-gray-800 border-gray-300"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
              )}
              style={{
                backgroundColor: isSelected && theme.color ? theme.color as string : undefined,
                borderColor: isSelected && theme.color ? theme.color as string : undefined,
              }}
              onClick={() => onThemeChange(theme.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              layout
            >
              {theme.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}