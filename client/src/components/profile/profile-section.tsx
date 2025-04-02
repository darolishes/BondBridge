import { ReactNode } from "react";

interface ProfileSectionProps {
  title: string;
  children: ReactNode;
}

export function ProfileSection({ title, children }: ProfileSectionProps) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h4 className="font-heading font-semibold mb-3">{title}</h4>
      {children}
    </div>
  );
}
