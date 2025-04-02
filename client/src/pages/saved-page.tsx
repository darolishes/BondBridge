import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { SavedCardItem } from "@/components/saved/saved-card-item";
import { Card } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-primary">
      <header className="bg-primary text-secondary px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mr-2">
            <path d="M18 16.016V7.984a.984.984 0 0 0-.984-.984H6.984A.984.984 0 0 0 6 7.984v8.032c0 .544.44.984.984.984h10.032c.544 0 .984-.44.984-.984Z" />
            <path d="M6.984 7H17.016A.984.984 0 0 1 18 7.984V16.016a.984.984 0 0 1-.984.984H6.984A.984.984 0 0 1 6 16.016V7.984C6 7.44 6.44 7 6.984 7Z" />
            <path d="M15 2v5" />
            <path d="M9 2v5" />
            <path d="M9 18v4" />
            <path d="M15 18v4" />
            <path d="M9 12h6" />
          </svg>
          <h1 className="font-heading font-bold text-xl">BondBridge</h1>
        </div>
      </header>

      <main className="flex-grow relative">
        <div className="px-4 py-3 bg-primary text-secondary">
          <h2 className="font-heading font-semibold text-lg mb-2">Saved Cards</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search saved cards..."
              className="w-full bg-primary border border-gray-600 rounded-full px-4 py-2 text-sm text-secondary pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-180px)]">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-[calc(100vh-180px)] text-white">
            <p>Error loading saved cards. Please try again.</p>
          </div>
        ) : filteredCards && filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 p-4 overflow-y-auto h-[calc(100vh-180px)]">
            {filteredCards.map((card) => (
              <SavedCardItem key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)] text-white p-4">
            {savedCards && savedCards.length > 0 ? (
              <p>No saved cards match your search.</p>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 mb-4">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <p className="text-center">You haven't saved any cards yet. Swipe right on cards you like to save them here!</p>
              </>
            )}
          </div>
        )}
      </main>

      <NavBar activeTab="saved" />
    </div>
  );
}
