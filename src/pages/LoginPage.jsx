// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient"; // ✅ Import Supabase instead of Firebase
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { currentUser, loading } = useAuth(); // ✅ Changed 'user' to 'currentUser' to match your Context

  // 🔁 Redirect if user already logged in
  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/"); // or any page you want logged-in users to go
    }
  }, [currentUser, loading, navigate]);

  // 🔐 Email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      // ✅ Supabase Email Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      navigate("/bookmark");
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔑 Google login
  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");

    try {
      // ✅ Supabase Google Login (Redirects just like the SignUp page)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/bookmark' 
        }
      });

      if (error) throw error;

    } catch (err) {
      setError(err.message);
    }
  };

  // 🔁 Forgot password
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    try {
      // ✅ Supabase Password Reset
      // (Optional: redirectTo tells Supabase where to send the user after they click the email link)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;

      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>; // Wait for auth to load

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className="subtitle">Welcome back!</p>

          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        {/* 🔵 Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="google-login-btn"
        >
          Continue with Google
        </button>

        <p className="forgot-password-link">
          <button onClick={handleForgotPassword} className="link-button">
            Forgot Password?
          </button>
        </p>

        <p className="signup-link">
          Don&apos;t have an account yet? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}