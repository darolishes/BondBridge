import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { CardStack } from "@/components/cards/card-stack";
import { CategoryFilter } from "@/components/cards/category-filter";
import { ThemeSelector } from "@/components/cards/theme-selector";
import { Card } from "@shared/schema";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Search, Filter } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  const { data: cards, isLoading, isError } = useQuery<Card[]>({
    queryKey: ["/api/cards", selectedCategory, selectedThemeId],
    queryFn: async ({ queryKey }) => {
      const [_, category, themeId] = queryKey;
      
      let url = "/api/cards";
      const params = new URLSearchParams();
      
      if (category !== "All") {
        params.append("category", category as string);
      }
      
      if (themeId) {
        params.append("themeId", themeId.toString());
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch cards");
      return res.json();
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleThemeChange = (themeId: number | null) => {
    setSelectedThemeId(themeId);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-20">
      {/* Subtle background gradient */}
      <div className="absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-primary/30 to-transparent -z-10"></div>

      <header className="px-5 py-4 flex justify-between items-center bg-transparent">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center bg-primary p-2 rounded-xl shadow-sm mr-3 text-gray-700 border border-[#a5e5d0]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl text-gray-800 tracking-tight">BondBridge</h1>
            <p className="text-gray-500 text-xs">Connecting through conversation</p>
          </div>
        </motion.div>
        
        <motion.button 
          className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50"
          whileTap={{ scale: 0.95 }}
        >
          <Search className="h-5 w-5" />
        </motion.button>
      </header>

      <main className="flex-grow overflow-hidden relative">
        <motion.div 
          className="px-5 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-xl text-gray-800">Conversation Cards</h2>
            <button 
              className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
          />
          
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 bg-white rounded-lg border border-gray-100 shadow-sm p-4"
            >
              <ThemeSelector
                selectedThemeId={selectedThemeId}
                onThemeChange={handleThemeChange}
              />
            </motion.div>
          )}
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-280px)]">
            <div className="rounded-xl bg-white p-8 border border-gray-100 shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-[calc(100vh-280px)]">
            <div className="rounded-xl bg-white p-8 border border-gray-100 shadow-sm max-w-xs text-center">
              <p className="text-gray-600">Error loading cards. Please try again.</p>
              <button className="mt-3 text-accent font-medium">Retry</button>
            </div>
          </div>
        ) : cards && cards.length > 0 ? (
          <CardStack cards={cards} />
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-280px)]">
            <div className="rounded-xl bg-white p-8 border border-gray-100 shadow-sm max-w-xs text-center">
              <p className="text-gray-600">No cards found for this category.</p>
              <button 
                className="mt-3 px-4 py-2 rounded-full bg-primary text-gray-800 font-medium border border-[#a5e5d0]"
                onClick={() => handleCategoryChange("All")}
              >
                View all cards
              </button>
            </div>
          </div>
        )}
      </main>

      <NavBar activeTab="cards" />
    </div>
  );
}
