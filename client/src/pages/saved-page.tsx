import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { SavedCardItem } from "@/components/saved/saved-card-item";
import { Card } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Bookmark, FolderHeart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SavedPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: savedCards, isLoading, isError } = useQuery<Card[]>({
    queryKey: ["/api/saved-cards"],
  });

  const filteredCards = savedCards?.filter(card => 
    card.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (card.tag && card.tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden pb-20">
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-pink-600/30 to-transparent -z-10"></div>

      <header className="px-5 py-4 flex justify-between items-center bg-transparent">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-rose-500 p-2 rounded-xl shadow-lg mr-3 text-white">
            <FolderHeart className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-2xl text-white tracking-tight">Saved Cards</h1>
            <p className="text-white/70 text-xs">Your collection of insights</p>
          </div>
        </motion.div>
      </header>

      <main className="flex-grow relative">
        <motion.div 
          className="px-5 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-white/50" />
            </div>
            <Input
              type="text"
              placeholder="Search your saved cards..."
              className="w-full bg-white/10 border-white/10 rounded-xl px-4 py-2.5 text-sm text-white pl-10 placeholder:text-white/50 focus:border-pink-500/50 focus:ring-pink-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-[calc(100vh-230px)]">
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10">
                <Loader2 className="h-8 w-8 animate-spin text-white/70" />
              </div>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-[calc(100vh-230px)] text-white">
              <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 max-w-xs text-center">
                <p className="text-white/80">Error loading saved cards. Please try again.</p>
                <button className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-medium text-sm shadow-lg">
                  Retry
                </button>
              </div>
            </div>
          ) : filteredCards && filteredCards.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 gap-4 overflow-y-auto pb-4 h-[calc(100vh-230px)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {filteredCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SavedCardItem card={card} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-230px)] text-white p-4">
              {savedCards && savedCards.length > 0 ? (
                <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 max-w-xs text-center">
                  <p className="text-white/80">No saved cards match your search.</p>
                  {searchQuery && (
                    <button 
                      className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium text-sm transition-colors"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                <div className="rounded-xl bg-white/5 backdrop-blur-sm p-8 border border-white/10 max-w-xs text-center flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center mb-4">
                    <Bookmark className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No saved cards yet</h3>
                  <p className="text-white/70 text-sm mb-4">Save cards you like to build your collection of conversation starters</p>
                  <motion.button 
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-medium text-sm shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span>Browse Cards</span>
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>

      <NavBar activeTab="saved" />
    </div>
  );
}
