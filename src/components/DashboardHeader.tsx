import { Menu, Bell, ChevronDown, AlertTriangle, Clock, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface RiskAlert {
  id: string;
  jobName: string;
  risk: "low" | "medium" | "high";
  message: string;
  timestamp: Date;
}

const riskConfig = {
  low: { bg: "bg-risk-low/10", border: "border-risk-low/30", text: "text-risk-low", label: "LOW" },
  medium: { bg: "bg-risk-medium/10", border: "border-risk-medium/30", text: "text-risk-medium", label: "MED" },
  high: { bg: "bg-risk-high/10", border: "border-risk-high/30", text: "text-risk-high", label: "HIGH" },
};

const recentAlerts: RiskAlert[] = [
  { id: "1", jobName: "Banner Print #1042", risk: "high", message: "Machine B3 overloaded — 92% capacity.", timestamp: new Date() },
  { id: "2", jobName: "Vinyl Wrap #1038", risk: "medium", message: "Historical delay rate: 35%.", timestamp: new Date(Date.now() - 60000) },
  { id: "3", jobName: "Business Cards #1055", risk: "low", message: "On track. No risk factors detected.", timestamp: new Date(Date.now() - 120000) },
];

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  alertCount: number;
}

const DashboardHeader = ({ onToggleSidebar, alertCount }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      <button onClick={onToggleSidebar} className="text-muted-foreground hover:text-foreground transition-colors">
        <Menu size={20} />
      </button>

      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                  {alertCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
            <div className="p-3 border-b border-border flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">Risk Alerts</h4>
              <button
                onClick={() => navigate("/notifications")}
                className="text-xs text-primary hover:underline"
              >
                View all
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto divide-y divide-border">
              {recentAlerts.map((alert) => {
                const cfg = riskConfig[alert.risk];
                return (
                  <div key={alert.id} className="p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", cfg.bg, cfg.text)}>
                        {cfg.label}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock size={9} /> {alert.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-foreground">{alert.jobName}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{alert.message}</p>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

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
