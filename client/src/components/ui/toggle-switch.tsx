import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleSwitchProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ToggleSwitch({ label, checked, onCheckedChange }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor={`toggle-${label}`} className="text-gray-700">{label}</Label>
      <Switch
        id={`toggle-${label}`}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
