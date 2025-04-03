import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

interface ToggleSwitchProps {
  label: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ToggleSwitch({ label, checked, onCheckedChange }: ToggleSwitchProps) {
  // Generate a unique ID based on the content if it's a string, otherwise use a fallback
  const id = typeof label === 'string' 
    ? `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`
    : `toggle-${Math.random().toString(36).substr(2, 9)}`;
    
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={id} className="text-white">{label}</Label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
