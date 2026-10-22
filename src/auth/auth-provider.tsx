import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { AppState, Platform } from "react-native";
import type { Session } from "@supabase/supabase-js";
import { supabase, supabaseConfigError } from "@/lib/supabase";
import { authErrorMessage } from "./errors";

type AuthState = {
  session: Session | null;
  loading: boolean;
  startupError: string | null;
  retry: () => void;
  signOut: () => Promise<void>;
};
const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [startupError, setStartupError] = useState<string | null>(
    supabaseConfigError,
  );
  const [attempt, setAttempt] = useState(0);
  const signingOut = useRef(false);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let active = true;
    let authChanged = false;
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((event, next) => {
      if (!active || event === "INITIAL_SESSION") return;
      authChanged = true;
      setSession(next);
      setStartupError(null);
      setLoading(false);
    });
    void client.auth
      .getSession()
      .then(({ data, error }) => {
        if (!active || authChanged) return;
        if (error) setStartupError(authErrorMessage(error));
        else setSession(data.session);
        setLoading(false);
      })
      .catch((error: unknown) => {
        if (!active || authChanged) return;
        setStartupError(authErrorMessage(error));
        setLoading(false);
      });

    const refresh = (state: string) => {
      if (state === "active") void client.auth.startAutoRefresh();
      else void client.auth.stopAutoRefresh();
    };
    const appState =
      Platform.OS !== "web"
        ? AppState.addEventListener("change", refresh)
        : null;
    if (Platform.OS !== "web") refresh(AppState.currentState);
    return () => {
      active = false;
      subscription.unsubscribe();
      appState?.remove();
      if (Platform.OS !== "web") void client.auth.stopAutoRefresh();
    };
  }, [attempt]);

  const retry = () => {
    if (supabaseConfigError) return;
    setStartupError(null);
    setLoading(true);
    setAttempt((value) => value + 1);
  };
  const signOut = async () => {
    if (!supabase || signingOut.current) return;
    signingOut.current = true;
    try {
      // End this device's session, leaving other devices unaffected.
      const { error } = await supabase.auth.signOut({ scope: "local" });
      if (error) throw error;
      setSession(null);
    } finally {
      signingOut.current = false;
    }
  };
  return (
    <AuthContext.Provider
      value={{ session, loading, startupError, retry, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider.");
  return context;
}
