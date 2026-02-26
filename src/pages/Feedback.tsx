import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import CustomerFeedbackForm from "@/components/CustomerFeedbackForm";
import { cn } from "@/lib/utils";

const Feedback = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className={cn("transition-all duration-300", sidebarCollapsed ? "ml-16" : "ml-60")}>
        <DashboardHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} alertCount={3} />

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Customer Feedback</h2>
            <p className="text-sm text-muted-foreground">Collect and review customer experience ratings</p>
          </div>

          <div className="max-w-lg">
            <CustomerFeedbackForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Feedback;
