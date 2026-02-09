import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import { Building2, Users, CreditCard, AlertTriangle, Plus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { title: "Properties", value: "3", subtitle: "12 total units", icon: Building2 },
  { title: "Tenants", value: "9", subtitle: "3 vacant units", icon: Users },
  { title: "Collected", value: "KES 285,000", subtitle: "This month", icon: CreditCard },
  { title: "Overdue", value: "KES 45,000", subtitle: "2 tenants", icon: AlertTriangle },
];

const recentPayments = [
  { tenant: "Mary Wanjiku", unit: "A-101", amount: "KES 15,000", date: "Feb 7", method: "M-Pesa", status: "completed" },
  { tenant: "James Odhiambo", unit: "B-203", amount: "KES 12,000", date: "Feb 6", method: "M-Pesa", status: "completed" },
  { tenant: "Grace Muthoni", unit: "A-104", amount: "KES 18,000", date: "Feb 5", method: "Cash", status: "completed" },
  { tenant: "Peter Kamau", unit: "C-301", amount: "KES 15,000", date: "Feb 3", method: "M-Pesa", status: "pending" },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back. Here's your rental overview.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to="/properties">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                Add Property
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/tenants">
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                Invite Tenant
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <StatsCard key={s.title} {...s} />
          ))}
        </div>

        {/* Recent Payments */}
        <div className="rounded-xl border bg-card shadow-card">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="font-display text-sm font-semibold text-card-foreground">Recent Payments</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/payments" className="text-xs">View all</Link>
            </Button>
          </div>
          <div className="divide-y">
            {recentPayments.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{p.tenant}</p>
                  <p className="text-xs text-muted-foreground">
                    Unit {p.unit} · {p.method} · {p.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">{p.amount}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      p.status === "completed"
                        ? "bg-primary/10 text-primary"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
