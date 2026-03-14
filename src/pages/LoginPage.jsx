import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    // Supabase Log In
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setError(error.message)
    // If successful, the AuthContext will automatically detect it and update!
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Log In to Shop</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br/><br/>
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br/><br/>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}