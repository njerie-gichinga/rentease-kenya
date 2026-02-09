import { Building2, CreditCard, Home, Wrench, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";

const TenantPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">RentWise</span>
          </Link>
          <Button variant="ghost" size="sm">
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            Sign out
          </Button>
        </div>
      </header>

      {/* Install banner */}
      <div className="border-b bg-primary/5 px-4 py-2.5 text-center text-sm text-primary">
        📱 <strong>Add to Home Screen</strong> for quick access — tap <em>Share → Add to Home Screen</em>
      </div>

      <div className="container max-w-2xl space-y-6 py-6">
        {/* Unit info */}
        <div className="rounded-xl border bg-card p-5 shadow-card">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Home className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-card-foreground">Unit A-101</h1>
              <p className="text-sm text-muted-foreground">Sunrise Apartments · Kilimani, Nairobi</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-3 grid-cols-2">
          <StatsCard title="Rent Due" value="KES 15,000" subtitle="Due Feb 28" icon={CreditCard} />
          <StatsCard title="Status" value="Paid" subtitle="Last: Feb 7" icon={CreditCard} />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-3 grid-cols-2">
          <Button className="h-auto flex-col gap-1.5 py-4" size="lg">
            <CreditCard className="h-5 w-5" />
            <span className="text-sm font-medium">Pay Rent</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-1.5 py-4" size="lg">
            <Wrench className="h-5 w-5" />
            <span className="text-sm font-medium">Request Repair</span>
          </Button>
        </div>

        {/* Payment history */}
        <div className="rounded-xl border bg-card shadow-card">
          <div className="border-b px-4 py-3">
            <h2 className="font-display text-sm font-semibold text-card-foreground">Payment History</h2>
          </div>
          <div className="divide-y">
            {[
              { month: "February 2026", amount: "KES 15,000", date: "Feb 7", status: "completed" },
              { month: "January 2026", amount: "KES 15,000", date: "Jan 5", status: "completed" },
              { month: "December 2025", amount: "KES 15,000", date: "Dec 3", status: "completed" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{p.month}</p>
                  <p className="text-xs text-muted-foreground">Paid {p.date} via M-Pesa</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">{p.amount}</p>
                  <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantPortal;
