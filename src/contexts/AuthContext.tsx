import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: AppRole | null;
  roles: AppRole[];
  loading: boolean;
  switchRole: (role: AppRole) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  roles: [],
  loading: true,
  switchRole: () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [activeRole, setActiveRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    const fetched = (data ?? []).map((r) => r.role);
    setRoles(fetched);
    // Restore saved preference or pick first
    const saved = localStorage.getItem("rentwise_active_role") as AppRole | null;
    if (saved && fetched.includes(saved)) {
      setActiveRole(saved);
    } else {
      setActiveRole(fetched[0] ?? null);
    }
  };

  const switchRole = useCallback((role: AppRole) => {
    setActiveRole(role);
    localStorage.setItem("rentwise_active_role", role);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user) {
          setTimeout(() => fetchRoles(session.user.id), 0);
        } else {
          setRoles([]);
          setActiveRole(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchRoles(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setRoles([]);
    setActiveRole(null);
    localStorage.removeItem("rentwise_active_role");
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, role: activeRole, roles, loading, switchRole, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
