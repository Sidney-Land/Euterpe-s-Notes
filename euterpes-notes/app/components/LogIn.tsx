'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import React, { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Login Error: ${error.message}`);
    } else if (data.user) {
      setMessage('Login successful! Redirecting...');
      // Small delay so the user sees the success message
      setTimeout(() => {
        router.push('/'); // Sends user to the home feed
      }, 1500);
    }

    setLoading(false);
  };

  // Using the "Responsive Container" approach we discussed
  const containerStyle: CSSProperties = {
    width: 'calc(95% - 300px)', 
    maxWidth: '600px', 
    minWidth: '300px',
    margin: '20px auto', 
    padding: '20px',
    transform: 'translateX(100px)'
  };

  const loginBoxStyle: CSSProperties = {
    width: '90%',
    maxWidth: '400px',
    margin: '60px auto',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const formStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const inputStyle: CSSProperties = {
    padding: '12px',
    borderRadius: '6px',
    border: '2px solid #4a5568',
    backgroundColor: '#ffffff',
    color: '#1a202c',
    fontSize: '1rem',
  };

  const labelStyle: CSSProperties = {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#cbd5e0',
    marginBottom: '4px'
  };

  return (
    <div style={containerStyle}>
      <div className="component-style" style={loginBoxStyle}>
        <h2 style={{ marginBottom: '24px', textAlign: 'center', fontSize: '1.8rem' }}>
          Login to Euterpe's Notes
        </h2>

        <form onSubmit={handleLogin} style={formStyle}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="email" style={labelStyle}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" style={labelStyle}>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              marginTop: '10px',
              backgroundColor: loading ? '#718096' : '#2d3748',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <p style={{
            marginTop: '20px',
            textAlign: 'center',
            color: message.includes('Error') ? '#c53030' : '#276749'
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}