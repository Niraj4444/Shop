// src/context/AuthContext.jsx
import React, { useContext, createContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Make sure this path is correct

const AuthContext = createContext({
  currentUser: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get the session on initial load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for login/logout events (Equivalent to onAuthStateChanged)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = { currentUser, loading };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* prevent flicker */}
    </AuthContext.Provider>
  );
}