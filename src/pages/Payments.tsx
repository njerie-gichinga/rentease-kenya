import DashboardLayout from "@/components/DashboardLayout";
import { CreditCard, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const payments = [
  { id: "1", tenant: "Mary Wanjiku", unit: "A-101", amount: "KES 15,000", date: "2026-02-07", method: "M-Pesa", ref: "SHK3A8B2F1", status: "completed" },
  { id: "2", tenant: "James Odhiambo", unit: "B-203", amount: "KES 12,000", date: "2026-02-06", method: "M-Pesa", ref: "SHK4C9D3E2", status: "completed" },
  { id: "3", tenant: "Grace Muthoni", unit: "A-104", amount: "KES 18,000", date: "2026-02-05", method: "Cash", ref: "CASH-0205", status: "completed" },
  { id: "4", tenant: "Peter Kamau", unit: "C-301", amount: "KES 15,000", date: "2026-02-03", method: "M-Pesa", ref: "SHK1F7G5H3", status: "pending" },
  { id: "5", tenant: "Ann Njeri", unit: "A-103", amount: "KES 15,000", date: "2026-02-01", method: "M-Pesa", ref: "SHK9J2K8L4", status: "completed" },
];

const Payments = () => {
  const [search, setSearch] = useState("");

  const filtered = payments.filter(
    (p) =>
      p.tenant.toLowerCase().includes(search.toLowerCase()) ||
      p.ref.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-sm text-muted-foreground">Track M-Pesa and cash payments</p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by tenant or reference…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="rounded-xl border bg-card shadow-card overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Tenant</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Unit</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Amount</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Method</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Ref</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-card-foreground">{p.tenant}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.unit}</td>
                    <td className="px-4 py-3 font-semibold text-card-foreground">{p.amount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.method}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.ref}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${p.status === "completed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y sm:hidden">
            {filtered.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{p.tenant}</p>
                  <p className="text-xs text-muted-foreground">Unit {p.unit} · {p.method} · {p.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">{p.amount}</p>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${p.status === "completed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
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

export default Payments;
