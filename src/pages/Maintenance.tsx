import DashboardLayout from "@/components/DashboardLayout";
import { Wrench, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const requests = [
  { id: "1", tenant: "Mary Wanjiku", unit: "A-101", description: "Leaking kitchen tap", priority: "high", status: "pending", date: "Feb 6" },
  { id: "2", tenant: "James Odhiambo", unit: "B-203", description: "Broken window latch", priority: "medium", status: "in_progress", date: "Feb 4" },
  { id: "3", tenant: "Grace Muthoni", unit: "A-104", description: "Electrical socket not working", priority: "high", status: "completed", date: "Jan 28" },
];

const priorityStyles: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning/10 text-warning",
  low: "bg-muted text-muted-foreground",
};

const statusStyles: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  in_progress: "bg-info/10 text-info",
  completed: "bg-primary/10 text-primary",
};

const Maintenance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Maintenance</h1>
            <p className="text-sm text-muted-foreground">Track repair and maintenance requests</p>
          </div>
        </div>

        <div className="space-y-3">
          {requests.map((r) => (
            <div key={r.id} className="rounded-xl border bg-card p-4 shadow-card">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{r.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.tenant} · Unit {r.unit} · {r.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${priorityStyles[r.priority]}`}>
                    {r.priority}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusStyles[r.status]}`}>
                    {r.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Maintenance;
