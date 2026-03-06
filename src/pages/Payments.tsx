import DashboardLayout from "@/components/DashboardLayout";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Payments = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, units!inner(unit_number, tenant_id, properties!inner(name))")
        .order("payment_date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const tenantIds = payments.filter((p) => p.tenant_id).map((p) => p.tenant_id!);
  const { data: profiles = [] } = useQuery({
    queryKey: ["payment-profiles", tenantIds],
    queryFn: async () => {
      if (tenantIds.length === 0) return [];
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", tenantIds);
      if (error) throw error;
      return data;
    },
    enabled: tenantIds.length > 0,
  });

  const enriched = payments.map((p) => {
    const profile = profiles.find((pr) => pr.user_id === p.tenant_id);
    return {
      ...p,
      tenant_name: profile?.full_name || "Unknown",
      unit_number: (p.units as any)?.unit_number || "",
      property_name: (p.units as any)?.properties?.name || "",
      method: p.mpesa_ref ? "M-Pesa" : "Cash",
    };
  });

  const hasFilters = search || filterStatus !== "all" || filterMethod !== "all" || sortBy !== "newest";

  const filtered = useMemo(() => {
    let result = [...enriched];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.tenant_name.toLowerCase().includes(q) ||
          (p.mpesa_ref || "").toLowerCase().includes(q) ||
          p.unit_number.toLowerCase().includes(q) ||
          p.property_name.toLowerCase().includes(q)
      );
    }

    if (filterStatus !== "all") {
      result = result.filter((p) => p.status === filterStatus);
    }

    if (filterMethod !== "all") {
      result = result.filter((p) => p.method === filterMethod);
    }

    if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.payment_date).getTime() - new Date(b.payment_date).getTime());
    } else if (sortBy === "amount_high") {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "amount_low") {
      result.sort((a, b) => a.amount - b.amount);
    }

    return result;
  }, [enriched, search, filterStatus, filterMethod, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("all");
    setFilterMethod("all");
    setSortBy("newest");
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Payments</h1>
          <p className="text-sm text-muted-foreground">Track M-Pesa and cash payments</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tenant, unit, ref…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterMethod} onValueChange={setFilterMethod}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Method" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="M-Pesa">M-Pesa</SelectItem>
              <SelectItem value="Cash">Cash</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="amount_high">Amount ↓</SelectItem>
              <SelectItem value="amount_low">Amount ↑</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>

        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading payments…</p>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border bg-card p-8 text-center shadow-card">
            <p className="text-sm text-muted-foreground">
              {hasFilters ? "No payments match your filters." : "No payments recorded yet."}
            </p>
          </div>
        ) : (
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
                      <td className="px-4 py-3 font-medium text-card-foreground">{p.tenant_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.unit_number}</td>
                      <td className="px-4 py-3 font-semibold text-card-foreground">KES {p.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{p.method}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{p.mpesa_ref || "—"}</td>
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
                    <p className="text-sm font-medium text-card-foreground">{p.tenant_name}</p>
                    <p className="text-xs text-muted-foreground">Unit {p.unit_number} · {p.method} · {p.payment_date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-card-foreground">KES {p.amount.toLocaleString()}</p>
                    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${p.status === "completed" ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"}`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Payments;
