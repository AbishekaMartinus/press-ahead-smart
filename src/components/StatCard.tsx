import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
}

const StatCard = ({ icon: Icon, label, value, className }: StatCardProps) => {
  return (
    <div className={cn("bg-card rounded-lg border border-border p-5 flex items-center gap-4", className)}>
      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon size={22} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
