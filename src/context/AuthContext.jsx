// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // Initialize auth from localStorage (user data only, not token!)
  useEffect(() => {
    const init = async () => {
      const userData = localStorage.getItem("user");
      
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          
          // ✅ Verify user session is still valid by calling /auth/me
          try {
            const res = await axios.get("/auth/me");
            setUser(res.data);
            // Update localStorage with fresh data
            localStorage.setItem("user", JSON.stringify(res.data));
          } catch (err) {
            // Token expired or invalid
            console.log("Session expired, clearing user data");
            localStorage.removeItem("user");
            setUser(null);
          }
        } catch (err) {
          console.error("Auth initialization error:", err);
          localStorage.removeItem("user");
          setUser(null);
        }
      }
      
      setLoading(false);
    };
    
    init();
  }, []);

  // Login function
  const login = async (credentials) => {
    setAuthLoading(true);
    try {
      const res = await axios.post("/auth/login", credentials);
   
      const { user: userObj } = res.data;
      
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);
      setAuthLoading(false);
      return { ok: true };
    } catch (err) {
      setAuthLoading(false);
      const message = err.response?.data?.message || "Login failed";
      return { ok: false, message };
    }
  };

  // Register function
  const register = async (payload) => {
    setAuthLoading(true);
    try {
      const res = await axios.post("/auth/register", payload);
      
      // Backend may auto-login after register
      if (res.data.user) {
        const { user: userObj } = res.data;
        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);
      }
      
      setAuthLoading(false);
      return { ok: true };
    } catch (err) {
      setAuthLoading(false);
      const message = err.response?.data?.message || "Registration failed";
      return { ok: false, message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // ✅ Tell backend to clear httpOnly cookies
      await axios.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    } finally {
      // ✅ Always clear local state (even if server request fails)
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // Update user data
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        login,
        register,
        logout,
        updateUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export default AuthContext;