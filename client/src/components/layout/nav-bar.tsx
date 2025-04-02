import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Layers, Bookmark, User } from "lucide-react";

interface NavBarProps {
  activeTab: "cards" | "saved" | "profile";
}

export function NavBar({ activeTab }: NavBarProps) {
  const [_, setLocation] = useLocation();

  const handleTabChange = (tab: string) => {
    const routes: Record<string, string> = {
      "cards": "/",
      "saved": "/saved",
      "profile": "/profile"
    };
    
    setLocation(routes[tab]);
  };

  return (
    <nav className="bg-primary text-secondary px-2 py-3 flex justify-around items-center border-t border-blue-900">
      <button 
        className={cn(
          "flex flex-col items-center p-2",
          activeTab === "cards" ? "text-[#FF6B6B]" : "text-gray-400"
        )}
        onClick={() => handleTabChange("cards")}
      >
        <Layers className="h-5 w-5" />
        <span className="text-xs mt-1">Cards</span>
      </button>
      
      <button 
        className={cn(
          "flex flex-col items-center p-2",
          activeTab === "saved" ? "text-[#FF6B6B]" : "text-gray-400"
        )}
        onClick={() => handleTabChange("saved")}
      >
        <Bookmark className="h-5 w-5" />
        <span className="text-xs mt-1">Saved</span>
      </button>
      
      <button 
        className={cn(
          "flex flex-col items-center p-2",
          activeTab === "profile" ? "text-[#FF6B6B]" : "text-gray-400"
        )}
        onClick={() => handleTabChange("profile")}
      >
        <User className="h-5 w-5" />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </nav>
  );
}
