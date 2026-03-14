import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// 1. Create the Context
const AuthContext = createContext()

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state (login, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Cleanup subscription on unmount
    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

// 3. Custom hook to easily use the auth context anywhere
export const useAuth = () => {
  return useContext(AuthContext)
}