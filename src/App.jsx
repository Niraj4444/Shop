// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProductList from './component/ProductList' // ✅ Import your new component
import { supabase } from './supabaseClient'

// 🔖 Updated BookmarkPage to include your product list
function BookmarkPage() {
  const { currentUser } = useAuth()

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Your Dashboard 🛒</h1>
        <p>Welcome, <strong>{currentUser?.email}</strong></p>
        <button 
          onClick={() => supabase.auth.signOut()}
          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Log Out
        </button>
      </div>

      <hr />

      {/* ✅ Add your ProductList here */}
      <ProductList />
    </div>
  )
}

export default function App() {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={currentUser ? <Navigate to="/bookmark" /> : <Navigate to="/login" />} 
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route 
        path="/bookmark" 
        element={currentUser ? <BookmarkPage /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}