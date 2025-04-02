import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { CardStack } from "@/components/cards/card-stack";
import { CategoryFilter } from "@/components/cards/category-filter";
import { Card } from "@shared/schema";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const { data: cards, isLoading, isError } = useQuery<Card[]>({
    queryKey: ["/api/cards", selectedCategory],
    queryFn: async ({ queryKey }) => {
      const [_, category] = queryKey;
      const url = `/api/cards${category !== "All" ? `?category=${category}` : ""}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch cards");
      return res.json();
    }
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-20">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-indigo-600/30 to-transparent -z-10"></div>

      <header className="px-5 py-4 flex justify-between items-center bg-transparent">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl shadow-lg mr-3 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl text-white tracking-tight">BondBridge</h1>
            <p className="text-white/70 text-xs">Connecting through conversation</p>
          </div>
        </motion.div>
        
        <motion.button 
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white"
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </motion.button>
      </header>

      <main className="flex-grow overflow-hidden relative">
        <motion.div 
          className="px-5 py-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-xl">Conversation Cards</h2>
            <button className="text-white/70 hover:text-white transition-colors text-sm font-medium">
              My Topics
            </button>
          </div>
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-280px)]">
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-[calc(100vh-280px)] text-white">
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 max-w-xs text-center">
              <p className="text-white/80">Error loading cards. Please try again.</p>
              <button className="mt-3 text-accent font-medium">Retry</button>
            </div>
          </div>
        ) : cards && cards.length > 0 ? (
          <CardStack cards={cards} />
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-280px)] text-white">
            <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 max-w-xs text-center">
              <p className="text-white/80">No cards found for this category.</p>
              <button 
                className="mt-3 text-accent font-medium"
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
