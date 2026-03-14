// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { supabase } from './supabaseClient'

// 🔖 A quick placeholder for your Bookmark page since your login redirects here!
function BookmarkPage() {
  const { currentUser } = useAuth()

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Your Bookmarks 🔖</h1>
      <p>Welcome, <strong>{currentUser?.email}</strong></p>
      <br />
      <button 
        onClick={() => supabase.auth.signOut()}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Log Out
      </button>
    </div>
  )
}

export default function App() {
  // ✅ Changed 'user' to 'currentUser' to match your Context!
  const { currentUser, loading } = useAuth()

  // Wait for Supabase to check if logged in
  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>
  }

  return (
    <Routes>
      {/* 1. Default Route: If logged in, go to bookmarks. If not, go to login. */}
      <Route 
        path="/" 
        element={currentUser ? <Navigate to="/bookmark" /> : <Navigate to="/login" />} 
      />

      {/* 2. Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* 3. Protected Route: Only show bookmarks if logged in */}
      <Route 
        path="/bookmark" 
        element={currentUser ? <BookmarkPage /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}