import { Menu, Bell, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  alertCount: number;
}

const DashboardHeader = ({ onToggleSidebar, alertCount }: DashboardHeaderProps) => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <button onClick={onToggleSidebar} className="text-muted-foreground hover:text-foreground transition-colors">
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-4">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={20} />
          {alertCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
              {alertCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-foreground">
            UK
          </div>
          <span className="text-sm font-medium text-foreground hidden md:block">United Kerry</span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
