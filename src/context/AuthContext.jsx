import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "ejaztech_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      
    } finally {
      setLoading(false);
    }
  }, []);

  /** Fake login — replace body with real API call later */
  const login = async ({ email, password, role = "STUDENT" }) => {
    // TODO: POST /api/auth/login
    const fakeUser = {
      id: "u_1",
      name: email.split("@")[0] || "Student",
      email,
      role,
      avatar: "/avatar.png",
    };
    setUser(fakeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    return fakeUser;
  }

  /** Fake register — replace body with real API call later */
  const register = async ({ name, email, password, role = "STUDENT" }) => {
    // TODO: POST /api/auth/register
    const fakeUser = {
      id: "u_1",
      name: name || email.split("@")[0] || "Student",
      email,
      role,
      avatar: "/avatar.png",
    };
    setUser(fakeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    return fakeUser;
  }

  const logout = () => {
    // TODO: POST /api/auth/logout
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const value = { user, loading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  }
  return ctx;
}

export default AuthContext;