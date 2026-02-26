import { useEffect, useState } from "react";
import { AlertTriangle, X, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskAlert {
  id: string;
  jobName: string;
  risk: "low" | "medium" | "high";
  message: string;
  timestamp: Date;
}

const mockAlerts: RiskAlert[] = [
  { id: "1", jobName: "Banner Print #1042", risk: "high", message: "Machine B3 overloaded — 92% capacity. Estimated 4hr delay.", timestamp: new Date() },
  { id: "2", jobName: "Vinyl Wrap #1038", risk: "medium", message: "Job complexity above avg. Historical delay rate: 35%.", timestamp: new Date(Date.now() - 60000) },
  { id: "3", jobName: "Business Cards #1055", risk: "low", message: "On track. No risk factors detected.", timestamp: new Date(Date.now() - 120000) },
];

const riskConfig = {
  low: { bg: "bg-risk-low/10", border: "border-risk-low/30", text: "text-risk-low", label: "LOW RISK" },
  medium: { bg: "bg-risk-medium/10", border: "border-risk-medium/30", text: "text-risk-medium", label: "MEDIUM RISK" },
  high: { bg: "bg-risk-high/10", border: "border-risk-high/30", text: "text-risk-high", label: "HIGH RISK" },
};

interface RiskAlertsPanelProps {
  onFeedback: (alert: RiskAlert) => void;
}

const RiskAlertsPanel = ({ onFeedback }: RiskAlertsPanelProps) => {
  const [alerts, setAlerts] = useState<RiskAlert[]>(mockAlerts);
  const [newAlert, setNewAlert] = useState<string | null>(null);

  // Simulate a new high-risk alert arriving after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const alert: RiskAlert = {
        id: "4",
        jobName: "Large Format #1060",
        risk: "high",
        message: "Rush order + machine queue full. 95% delay probability.",
        timestamp: new Date(),
      };
      setAlerts(prev => [alert, ...prev]);
      setNewAlert(alert.id);
      setTimeout(() => setNewAlert(null), 3000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = (id: string) => setAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Risk Alerts</h3>
        </div>
        <span className="text-xs text-muted-foreground">AI-powered detection</span>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts.map((alert) => {
          const cfg = riskConfig[alert.risk];
          return (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg border transition-all",
                cfg.bg, cfg.border,
                newAlert === alert.id && "animate-slide-in-right"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", cfg.bg, cfg.text)}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} /> {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{alert.jobName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.message}</p>
                </div>
                <div className="flex items-center gap-1">
                  {alert.risk !== "low" && (
                    <button
                      onClick={() => onFeedback(alert)}
                      className="text-[10px] font-medium text-primary hover:underline px-2 py-1"
                    >
                      Verify
                    </button>
                  )}
                  <button onClick={() => dismiss(alert.id)} className="text-muted-foreground hover:text-foreground">
                    <X size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type { RiskAlert };
export default RiskAlertsPanel;
