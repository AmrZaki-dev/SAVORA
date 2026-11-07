import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { authService } from "../services/authService";

/** Inactivity timeout: 30 minutes in milliseconds */
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

/** Events that count as user activity */
const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "scroll",
];

const AuthContext = createContext(null);

/**
 * Decode the JWT payload (base64url) and return its expiry timestamp in ms.
 * Returns null if the token is missing or malformed.
 */
function getTokenExpiry(token) {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** Returns true when the current token has already expired. */
function isTokenExpired(token) {
  const expiry = getTokenExpiry(token);
  if (!expiry) return false;
  return Date.now() >= expiry;
}

function clearStoredAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("lastActivity");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const expiryTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const lastActivityRef = useRef(Date.now());

  const isAuthenticated = !!user && !!token;
  const isAdmin = user?.role === "admin";

  const persistAuthSession = useCallback((userData, nextToken) => {
    localStorage.setItem("token", nextToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(nextToken);
    setUser(userData);
  }, []);

  const clearAuthSession = useCallback(() => {
    clearStoredAuth();

    if (expiryTimerRef.current) {
      clearInterval(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }

    if (inactivityTimerRef.current) {
      clearInterval(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    setToken(null);
    setUser(null);
  }, []);

  // Restore the logged-in user after page refresh.
  useEffect(() => {
    let mounted = true;

    const restoreAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        if (mounted) {
          setToken(null);
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const userData = await authService.getMe();

        if (mounted) {
          setUser(userData);
          setToken(savedToken);
        }
      } catch {
        clearStoredAuth();

        if (mounted) {
          setUser(null);
          setToken(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    restoreAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(
    async (email, password) => {
      const { user: userData, token: newToken } = await authService.login(
        email,
        password,
      );

      persistAuthSession(userData, newToken);
      return userData;
    },
    [persistAuthSession],
  );

  const register = useCallback(
    async (name, email, password) => {
      const { user: userData, token: newToken } = await authService.register(
        name,
        email,
        password,
      );

      persistAuthSession(userData, newToken);
      return userData;
    },
    [persistAuthSession],
  );

  const logout = useCallback(() => {
    clearAuthSession();
  }, [clearAuthSession]);

  /**
   * Auto-logout when the JWT expires.
   * A timeout handles the exact expiry time and a polling interval is used
   * as a backup when the tab is in the background.
   */
  useEffect(() => {
    if (expiryTimerRef.current) {
      clearInterval(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }

    if (!token) return;

    if (isTokenExpired(token)) {
      logout();
      window.location.href = "/login";
      return;
    }

    const expiry = getTokenExpiry(token);

    if (expiry) {
      const msUntilExpiry = expiry - Date.now();
      const exactTimer = setTimeout(() => {
        logout();
        window.location.href = "/login";
      }, msUntilExpiry);

      expiryTimerRef.current = setInterval(() => {
        if (isTokenExpired(token)) {
          logout();
          window.location.href = "/login";
        }
      }, 30_000);

      return () => {
        clearTimeout(exactTimer);
        clearInterval(expiryTimerRef.current);
        expiryTimerRef.current = null;
      };
    }
  }, [token, logout]);

  /**
   * Auto-logout on inactivity after 30 minutes.
   * We track activity events and sync with localStorage for multi-tab consistency.
   */
  useEffect(() => {
    if (!token) return;

    lastActivityRef.current = Date.now();
    localStorage.setItem("lastActivity", String(lastActivityRef.current));

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      localStorage.setItem("lastActivity", String(lastActivityRef.current));
    };

    ACTIVITY_EVENTS.forEach((evt) =>
      window.addEventListener(evt, handleActivity, { passive: true }),
    );

    inactivityTimerRef.current = setInterval(() => {
      const stored = Number.parseInt(
        localStorage.getItem("lastActivity") || "0",
        10,
      );
      const lastActive = Math.max(lastActivityRef.current, stored);

      if (Date.now() - lastActive >= INACTIVITY_TIMEOUT_MS) {
        logout();
        window.location.href = "/login";
      }
    }, 60_000);

    return () => {
      ACTIVITY_EVENTS.forEach((evt) =>
        window.removeEventListener(evt, handleActivity),
      );

      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
        inactivityTimerRef.current = null;
      }
    };
  }, [token, logout]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
