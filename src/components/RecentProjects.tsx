import { Button } from "@/components/ui/button";

const projects = [
  { name: "Marketing Campaign", client: "Client Alpha", due: "Due 2d ago", color: "bg-primary" },
  { name: "Website Development", client: "Client Beta", due: "Due 12 days", color: "bg-risk-medium" },
  { name: "Social Media Strategy", client: "Client Gamma", due: "Due 2d left", color: "bg-risk-low" },
  { name: "Branding & Design", client: "Client Delta", due: "Due 10 days", color: "bg-muted-foreground" },
];

const RecentProjects = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Projects</h3>
      <div className="space-y-4">
        {projects.map((p) => (
          <div key={p.name} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.client} · {p.due}</p>
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-4">
              VIEW
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
