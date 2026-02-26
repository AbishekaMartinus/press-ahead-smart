import { useState } from "react";
import { FolderKanban, Users, ListTodo, ShieldCheck } from "lucide-react";
import AppSidebar from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import StatCard from "@/components/StatCard";
import ProjectOverviewChart from "@/components/ProjectOverviewChart";
import RecentProjects from "@/components/RecentProjects";
import RecentActivity from "@/components/RecentActivity";
import RiskAlertsPanel from "@/components/RiskAlertsPanel";
import StaffFeedbackModal from "@/components/StaffFeedbackModal";
import CustomerFeedbackForm from "@/components/CustomerFeedbackForm";
import type { RiskAlert } from "@/components/RiskAlertsPanel";
import { cn } from "@/lib/utils";

const Index = () => {
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
          {/* Welcome */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Welcome to Shan Management System</h2>
            <p className="text-sm text-muted-foreground">Here is an overview of your data:</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard icon={FolderKanban} label="Total Projects" value={84} />
            <StatCard icon={Users} label="Active Clients" value={51} />
            <StatCard icon={ListTodo} label="Ongoing Tasks" value={128} />
            <StatCard icon={ShieldCheck} label="Pending Approvals" value={9} />
          </div>

          {/* Charts + Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
            <div className="lg:col-span-3">
              <ProjectOverviewChart />
            </div>
            <div className="lg:col-span-2">
              <RecentProjects />
            </div>
          </div>

          {/* Risk Alerts + Activity + Customer Feedback */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <RiskAlertsPanel onFeedback={handleFeedback} />
            </div>
            <div>
              <RecentActivity />
            </div>
            <div>
              <CustomerFeedbackForm />
            </div>
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

export default Index;
