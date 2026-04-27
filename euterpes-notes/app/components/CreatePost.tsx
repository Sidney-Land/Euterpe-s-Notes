'use client'; // This must be a client component to handle form typing
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import React, { CSSProperties } from 'react';
import Link from "next/link";

interface CreatePostProps {
  parent_id: string | null
}

export default function CreatePost({ parent_id }: CreatePostProps) {
  const [title, setTitle] = useState('');
  const [musicLink, setMusicLink] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

const handlePosting = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Creates the Post in Supabase
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
        const poster_id = session.user.id;

        const { data, error } = await supabase
            .from("post") 
            .insert({title: title, music_link: musicLink, content: content, parent_id: parent_id, poster_id: poster_id})

        if (!error) {
            setMessage('Success! Check your profile or the Recent Posts feed to see your post!');
      
            // Optional: Clear the form fields on success
            setTitle('');
            setMusicLink('');
            setContent('');
        } else {
            console.error("Supabase Error:", error.message);
            setMessage(`Supabase Error: ${error.message}`);
        }
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
        Create Post
      </h2>
      
      <form onSubmit={handlePosting} style={FormStyle}>
        
        {/* Title Input Group */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="title" style={labelStyle}>Title</label>
          <input 
            id="title"
            type="text" 
            placeholder="Draft your eye-catching Title!" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={inputStyle}
          />
        </div>

        {/* Music Link Input Group */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="musicLink" style={labelStyle}>Music Link</label>
          <input 
            id="musicLink"
            type="text" 
            placeholder="Link your cool song! (optional)" 
            value={musicLink} 
            onChange={(e) => setMusicLink(e.target.value)}  
            style={inputStyle}
          />
        </div>

        {/* Description/Content Input Group */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="content" style={labelStyle}>Description</label>
          <input 
            id="content"
            type="text" 
            placeholder="What do you love about this awesome track? (optional)" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}  
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
          {loading ? 'Processing...' : 'Post Note'}
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