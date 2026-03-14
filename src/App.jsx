import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { supabase } from './supabaseClient'

export default function App() {
  // 1. Get the current user from the AuthContext we created
  const { user, loading } = useAuth()

  // 2. State to toggle between showing the Login page or the Sign Up page
  const [showLogin, setShowLogin] = useState(true)

  // If Supabase is still checking if the user is logged in, show a loading message
  if (loading) {
    return <div style={{ padding: '50px' }}>Loading...</div>
  }

  // If the user IS logged in, show them the "Shop" (for now, a welcome screen)
  if (user) {
    return (
      <div style={{ padding: '50px' }}>
        <h1>Welcome to the Shop! 🛒</h1>
        <p>You are successfully logged in as: <strong>{user.email}</strong></p>

        <button 
          onClick={() => supabase.auth.signOut()}
          style={{ padding: '10px', marginTop: '20px', cursor: 'pointer' }}
        >
          Log Out
        </button>
      </div>
    )
  }

  // If the user is NOT logged in, show them the Login or Sign Up page
  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>

      {/* Show either the Login component OR the SignUp component */}
      {showLogin ? <LoginPage /> : <SignUpPage />}

      <hr style={{ margin: '30px 0' }} />

      {/* Button to switch between the two pages */}
      <p style={{ textAlign: 'center' }}>
        {showLogin ? "Don't have an account?" : "Already have an account?"}
      </p>

      <button 
        onClick={() => setShowLogin(!showLogin)}
        style={{ width: '100%', padding: '10px', cursor: 'pointer' }}
      >
        {showLogin ? "Go to Sign Up" : "Go to Log In"}
      </button>

    </div>
  )
}