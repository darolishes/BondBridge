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

  // Define icons with their active and inactive states
  const tabIcons = {
    cards: {
      icon: MessageSquareHeart,
      activeColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
      label: "Cards"
    },
    saved: {
      icon: Bookmark,
      activeColor: "bg-gradient-to-r from-pink-500 to-rose-500",
      label: "Saved"
    },
    profile: {
      icon: User,
      activeColor: "bg-gradient-to-r from-emerald-400 to-teal-500",
      label: "Profile"
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg px-4 py-4 flex justify-around items-center border-t border-white/10 z-50">
      {(Object.keys(tabIcons) as Array<keyof typeof tabIcons>).map(tab => {
        const isActive = activeTab === tab;
        const TabIcon = tabIcons[tab].icon;
        
        return (
          <motion.button 
            key={tab}
            className={cn(
              "relative flex flex-col items-center py-1 px-5 rounded-2xl transition-all",
              isActive ? "text-white" : "text-white/50 hover:text-white/80"
            )}
            onClick={() => handleTabChange(tab)}
            whileTap={{ scale: 0.9 }}
          >
            {isActive && (
              <motion.span 
                className={`absolute inset-0 ${tabIcons[tab].activeColor} rounded-2xl -z-10 opacity-80`}
                layoutId="activeTab"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.2 }}
              />
            )}
            <TabIcon className={cn("h-5 w-5", isActive ? "stroke-[2.5px]" : "stroke-[1.5px]")} />
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
