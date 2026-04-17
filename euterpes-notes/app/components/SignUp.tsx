'use client'; // This must be a client component to handle form typing
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import React, { CSSProperties } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Creates the User in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        }
      }
    });

    if (authError) {
      // If Supabase returns an error (e.g., email already exists, password too short)
      setMessage(`Auth Error: ${authError.message}`);
    } else if (authData.user) {
      // If data.user exists, the request was successful
      setMessage('Success! Check your email for a confirmation link to activate your account.');
      
      // Optional: Clear the form fields on success
      setEmail('');
      setPassword('');
      setUsername('');
    } else {
      // Fallback for unexpected cases
      setMessage('Something went wrong. Please try again.');
    }

    setLoading(false);
};

  const SignUpStyle: CSSProperties = {
    width: 'calc(95% - 300px)', 
    maxWidth: '600px', 
    minWidth: '300px',
    margin: '20px auto', 
    marginTop: '100px',
    marginLeft: 'auto',
    padding: '20px',
    transform: 'translateX(100px)'
  }

  const FormStyle: CSSProperties = {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: '#cbd5e0' // Light gray to match your PostCard header
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '6px',
    border: '2px solid #4a5568', // Visible dark-gray border
    backgroundColor: '#ffffff',
    color: '#1a202c', // Dark text for readability
    fontSize: '1rem',
    outline: 'none' // We can add a focus style later if you want!
  };

return (
    <div className="component-style" style={SignUpStyle}>
      <h2 style={{ marginBottom: '24px', textAlign: 'center', fontSize: '1.8rem', width: '100%' }}>
        Create Account
      </h2>
      
      <form onSubmit={handleSignUp} style={FormStyle}>
        
        {/* Username Input Group */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username" style={labelStyle}>Username</label>
          <input 
            id="username"
            type="text" 
            placeholder="What is your public username?" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={inputStyle}
          />
        </div>

        {/* Email Input Group */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={labelStyle}>Email Address</label>
          <input 
            id="email"
            type="email" 
            placeholder="e.g. user@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={inputStyle}
          />
        </div>

        {/* Password Input Group */}
        {/*the password minimum depends on if supabase's default minimum of 6 characters is active*/}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password" style={labelStyle}>Password</label>
          <input 
            id="password"
            type="password" 
            placeholder="At least 6 characters" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
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
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Processing...' : 'Register'}
        </button>
      </form>

      {message && (
        <p style={{ 
          marginTop: '20px', 
          padding: '12px', 
          borderRadius: '6px', 
          backgroundColor: message.includes('Error') ? '#fff5f5' : '#f0fff4',
          color: message.includes('Error') ? '#c53030' : '#276749',
          border: `1px solid ${message.includes('Error') ? '#feb2b2' : '#9ae6b4'}`,
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          {message}
        </p>
      )}
    </div>
  );
}