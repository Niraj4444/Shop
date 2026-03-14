// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Import Supabase client
import "./SignUpPage.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // 📧 Email + password signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // 1. Create user in Supabase Authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // 2. Save additional data to 'users' table (Equivalent to setDoc)
      // *Note: You must create this table in the Supabase Dashboard first!*
      if (authData.user) {
        const { error: dbError } = await supabase
          .from("users")
          .insert([
            {
              id: authData.user.id, // Link to the Auth User UID
              email: authData.user.email,
              bookmarks: [],
              provider: "password",
            }
          ]);

        if (dbError) throw dbError;
      }

      navigate("/bookmark");
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔑 Google signup / login
  const handleGoogleSignup = async () => {
    setError("");

    try {
      // Supabase Google Auth redirects the browser, so code below this won't run.
      // We pass the "redirectTo" option so Google knows where to send them back!
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

  return (
    <div className="signup-page-container">
      <div className="signup-form-card">
        <form onSubmit={handleSignUp}>
          <h2>Create Account</h2>
          <p className="subtitle">Join our community today!</p>

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

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {/* 🔴 Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          className="google-login-btn"
        >
          Continue with Google
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}