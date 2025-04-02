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
    // Bottom menu removed as per user's request
    <></>
  );
}
