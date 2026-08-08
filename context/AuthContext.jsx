"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { demoUser } from "@/lib/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("studynook_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("studynook_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    if (email === "demo@studynook.com" && password === "Demo123") {
      setUser(demoUser);
      localStorage.setItem("studynook_user", JSON.stringify(demoUser));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const register = (userData) => {
    const newUser = {
      id: "user-" + Date.now(),
      name: userData.name,
      email: userData.email,
      photo: userData.photo,
    };
    return { success: true, user: newUser };
  };

  const googleLogin = () => {
    setUser(demoUser);
    localStorage.setItem("studynook_user", JSON.stringify(demoUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("studynook_user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
