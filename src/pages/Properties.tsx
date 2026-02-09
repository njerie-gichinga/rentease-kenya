import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Home, MoreHorizontal } from "lucide-react";

const properties = [
  {
    id: "1",
    name: "Sunrise Apartments",
    location: "Kilimani, Nairobi",
    type: "Apartment",
    units: 6,
    occupied: 5,
  },
  {
    id: "2",
    name: "Market Stalls - Gikomba",
    location: "Gikomba, Nairobi",
    type: "Stalls",
    units: 4,
    occupied: 4,
  },
  {
    id: "3",
    name: "Karibu Bedsitters",
    location: "Rongai, Kajiado",
    type: "Bedsitter",
    units: 2,
    occupied: 0,
  },
];

const Properties = () => {
  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Properties</h1>
            <p className="text-sm text-muted-foreground">Manage your rental properties and units</p>
          </div>
          <Button size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Add Property
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => {
            const occupancy = p.units > 0 ? Math.round((p.occupied / p.units) * 100) : 0;
            return (
              <div key={p.id} className="rounded-xl border bg-card p-4 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-card-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.location}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                    {p.type}
                  </span>
                  <span className="text-muted-foreground">
                    {p.occupied}/{p.units} occupied
                  </span>
                </div>
                {/* Occupancy bar */}
                <div className="mt-2 h-1.5 rounded-full bg-muted">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all"
                    style={{ width: `${occupancy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Properties;
