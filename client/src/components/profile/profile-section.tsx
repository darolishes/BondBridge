import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <div className="mb-6 border-b border-white/10 pb-6">
      <h4 className="font-heading font-semibold mb-4 text-white flex items-center">
        <div className="h-1 w-5 rounded bg-gradient-to-r from-accent to-accent/50 mr-2"></div>
        {title}
      </h4>
      {children}
    </div>
  );
}
