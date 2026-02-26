import { Button } from "@/components/ui/button";

const activities = [
  { user: "Alex", action: 'completed a task "Design Logo"', time: "12 min ago", initials: "AX" },
  { user: "Sarah", action: 'added a new client "XYZ Corp"', time: "28 min ago", initials: "SA" },
  { user: "John", action: 'updated project "Marketing Campaign"', time: "1 hour ago", initials: "JO" },
];

const RecentActivity = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10 text-xs">
          ADD NEW
        </Button>
      </div>
      <div className="space-y-4">
        {activities.map((a, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
              {a.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-semibold">{a.user}</span> {a.action}
              </p>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
