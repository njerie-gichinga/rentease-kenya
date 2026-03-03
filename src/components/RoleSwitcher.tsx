import { ArrowLeftRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function RoleSwitcher() {
  const { roles, role, switchRole } = useAuth();
  const navigate = useNavigate();

  if (roles.length < 2) return null;

  const otherRole = role === "landlord" ? "tenant" : "landlord";
  const label = otherRole === "tenant" ? "Tenant Portal" : "Landlord Dashboard";

  const handleSwitch = () => {
    switchRole(otherRole);
    navigate(otherRole === "tenant" ? "/tenant-portal" : "/dashboard", { replace: true });
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      <ArrowLeftRight className="h-4 w-4" />
      <span>Switch to {label}</span>
    </button>
  );
}
