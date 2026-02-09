import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Search, Phone, Mail, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const tenants = [
  { id: "1", name: "Mary Wanjiku", phone: "0712 345 678", email: "mary@email.com", unit: "A-101", property: "Sunrise Apartments", rent: "KES 15,000", status: "active" },
  { id: "2", name: "James Odhiambo", phone: "0723 456 789", email: "james@email.com", unit: "B-203", property: "Sunrise Apartments", rent: "KES 12,000", status: "active" },
  { id: "3", name: "Grace Muthoni", phone: "0734 567 890", email: "grace@email.com", unit: "A-104", property: "Sunrise Apartments", rent: "KES 18,000", status: "active" },
  { id: "4", name: "Peter Kamau", phone: "0745 678 901", email: "peter@email.com", unit: "C-301", property: "Market Stalls - Gikomba", rent: "KES 15,000", status: "overdue" },
];

const Tenants = () => {
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const { toast } = useToast();

  const filtered = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.unit.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Invite sent!", description: "Tenant will receive an email with sign-up instructions." });
    setInviteOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Tenants</h1>
            <p className="text-sm text-muted-foreground">Manage tenants and send invitations</p>
          </div>
          <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                Invite Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Invite a Tenant</DialogTitle>
                <DialogDescription>
                  Send an invitation to set up their RentWise account and link them to a unit.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInvite} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label>Full name</Label>
                  <Input placeholder="Tenant's name" required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label>Email</Label>
                    <Input type="email" placeholder="tenant@email.com" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Phone (M-Pesa)</Label>
                    <Input type="tel" placeholder="0712 345 678" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Assign to unit</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Select a unit…</option>
                    <option>Sunrise Apartments – A-102 (Vacant)</option>
                    <option>Karibu Bedsitters – B-1 (Vacant)</option>
                    <option>Karibu Bedsitters – B-2 (Vacant)</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Send Invitation
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tenants…"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tenant List */}
        <div className="space-y-3">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Home className="h-3 w-3" />{t.unit} · {t.property}</span>
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{t.phone}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:text-right">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.rent}</p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      t.status === "active"
                        ? "bg-primary/10 text-primary"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {t.status}
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

export default Tenants;
