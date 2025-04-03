import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CardStack } from "@/components/cards/card-stack";
import { CategoryFilter } from "@/components/cards/category-filter";
import { ThemeSelector } from "@/components/cards/theme-selector";
import { Card } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, Search, Filter, Menu, X, User, BookmarkIcon } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const { user, logoutMutation } = useAuth();
  
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

  const handleLogout = () => {
    logoutMutation.mutate();
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
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
        
        <div className="flex items-center gap-2">
          <motion.button 
            className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </header>

      {/* Slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="absolute top-[72px] right-5 w-64 bg-white rounded-2xl shadow-lg border border-gray-200 z-50"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-primary/20 p-2 rounded-full">
                  <User className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user?.email}</p>
                  <p className="text-xs text-gray-500">Account</p>
                </div>
              </div>
            </div>
            <div className="p-2">
              <Link href="/profile">
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Profile</span>
                </a>
              </Link>
              <Link href="/saved">
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                  <BookmarkIcon className="h-4 w-4" />
                  <span className="text-sm">Saved Cards</span>
                </a>
              </Link>
              <button 
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                onClick={handleLogout}
              >
                <X className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow overflow-hidden relative">
        <motion.div 
          className="px-5 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-xl text-gray-800">Conversation Cards</h2>
            <div className="flex items-center gap-2">
              <motion.button 
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50"
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-4 w-4" />
              </motion.button>
              <motion.button 
                className="flex items-center gap-1 p-2 rounded-full bg-white border border-gray-200 text-gray-500 shadow-sm hover:bg-gray-50"
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
              </motion.button>
            </div>
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
    </div>
  );
}
