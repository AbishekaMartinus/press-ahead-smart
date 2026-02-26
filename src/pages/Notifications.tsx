import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import RiskAlertsPanel from "@/components/RiskAlertsPanel";
import StaffFeedbackModal from "@/components/StaffFeedbackModal";
import type { RiskAlert } from "@/components/RiskAlertsPanel";
import { cn } from "@/lib/utils";

const Notifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [feedbackAlert, setFeedbackAlert] = useState<RiskAlert | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleFeedback = (alert: RiskAlert) => {
    setFeedbackAlert(alert);
    setFeedbackOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-16" : "ml-60")}>
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} alertCount={3} />

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Notifications</h2>
            <p className="text-sm text-muted-foreground">AI-powered risk alerts and delay predictions</p>
          </div>

          <div className="max-w-3xl">
            <RiskAlertsPanel onFeedback={handleFeedback} />
          </div>
        </main>
      </div>

      <StaffFeedbackModal
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        alert={feedbackAlert}
      />
    </div>
  );
};

export default Notifications;
