import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { month: "Jan", jobs: 18 },
  { month: "Feb", jobs: 25 },
  { month: "Mar", jobs: 60 },
  { month: "Apr", jobs: 72 },
  { month: "May", jobs: 68 },
  { month: "Jun", jobs: 75 },
  { month: "Jul", jobs: 82 },
];

const ProjectOverviewChart = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground">Project Overview</h3>
      <p className="text-sm text-primary font-medium mb-4">Monthly Statistics</p>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Area type="monotone" dataKey="jobs" stroke="hsl(var(--primary))" fill="url(#colorJobs)" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectOverviewChart;
