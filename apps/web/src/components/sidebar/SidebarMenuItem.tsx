import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "react-router";

interface SidebarMenuItemProps {
  activeIcon: ReactNode;
  inActiveIcon: ReactNode;
  label: string;
  url?: string;
  isLogout?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

export default function SidebarMenuItem({
  activeIcon,
  inActiveIcon,
  label,
  url,
  isLogout = false,
  onClick,
  isActive = false,
}: SidebarMenuItemProps) {
  if (isLogout) {
    return (
      <div
        className="flex items-center justify-start gap-3 text-sm cursor-pointer hover:bg-kmitl-primary/10 p-[10px] rounded-xl"
        onClick={onClick}
      >
        {inActiveIcon}
        <p>{label}</p>
      </div>
    );
  }

  return (
    <Link
      to={url || ""}
      className={cn(
        "flex items-center justify-start gap-3 text-sm cursor-pointer hover:bg-kmitl-primary/10 p-[10px] rounded-xl",
        {
          "bg-kmitl-primary/10 text-kmitl-primary font-bold": isActive,
        }
      )}
    >
      {isActive ? activeIcon : inActiveIcon}
      <p>{label}</p>
    </Link>
  );
}
