import React, { createContext, useContext, useEffect, useState } from "react";
/* eslint-disable react-refresh/only-export-components */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch("http://localhost:3000/setUser", { credentials: "include" })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUser(data?.user || null))
        .catch(() => setUser(null))
        .finally(() => setLoading(false));
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  let isAdmin = false;
  if (user && user.roles) {
    isAdmin = user.roles.includes("Admin");
  }

  let isMasterAdmin = false;
  if (user && user.roles) {
    isMasterAdmin = user.roles.includes("MasterAdmin");
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, isAdmin, isMasterAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
