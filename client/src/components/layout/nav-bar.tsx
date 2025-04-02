import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { MessageSquareHeart, Bookmark, User } from "lucide-react";
import { motion } from "framer-motion";

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

  // Define icons with their active and inactive states with updated pastel colors
  const tabIcons = {
    cards: {
      icon: MessageSquareHeart,
      activeColor: "bg-primary",
      borderColor: "border-[#a5e5d0]",
      label: "Cards"
    },
    saved: {
      icon: Bookmark,
      activeColor: "bg-accent",
      borderColor: "border-[#ddbcea]",
      label: "Saved"
    },
    profile: {
      icon: User,
      activeColor: "bg-[#D1F2E5]",
      borderColor: "border-[#a5e5d0]",
      label: "Profile"
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 flex justify-around items-center border-t border-gray-200 z-50 shadow-sm">
      {(Object.keys(tabIcons) as Array<keyof typeof tabIcons>).map(tab => {
        const isActive = activeTab === tab;
        const TabIcon = tabIcons[tab].icon;
        
        return (
          <motion.button 
            key={tab}
            className={cn(
              "relative flex flex-col items-center py-1.5 px-5 rounded-xl transition-all",
              isActive ? "text-gray-800" : "text-gray-400 hover:text-gray-600"
            )}
            onClick={() => handleTabChange(tab)}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.span 
                className={cn(
                  "absolute inset-0 rounded-xl -z-10 border", 
                  tabIcons[tab].activeColor,
                  tabIcons[tab].borderColor
                )}
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <TabIcon className={cn("h-5 w-5", isActive ? "stroke-[2px]" : "stroke-[1.5px]")} />
            <span className={cn(
              "text-xs mt-1 font-medium",
              isActive ? "opacity-100" : "opacity-80"
            )}>
              {tabIcons[tab].label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
