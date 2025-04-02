import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavBar } from "@/components/layout/nav-bar";
import { CardStack } from "@/components/cards/card-stack";
import { CategoryFilter } from "@/components/cards/category-filter";
import { Card } from "@shared/schema";
import { Loader2 } from "lucide-react";

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

      <main className="flex-grow overflow-hidden relative">
        <div className="px-4 py-3 bg-primary text-secondary">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-heading font-semibold text-lg">Conversation Cards</h2>
          </div>
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[calc(100vh-220px)]">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center h-[calc(100vh-220px)] text-white">
            <p>Error loading cards. Please try again.</p>
          </div>
        ) : cards && cards.length > 0 ? (
          <CardStack cards={cards} />
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-220px)] text-white">
            <p>No cards found for this category.</p>
          </div>
        )}
      </main>

      <NavBar activeTab="cards" />
    </div>
  );
}
