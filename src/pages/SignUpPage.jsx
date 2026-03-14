import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError(null)

    // Supabase Sign Up
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) setError(error.message)
    else setSuccess(true)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create an Account</h2>
      {success && <p style={{color: 'green'}}>Success! Please check your email.</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}