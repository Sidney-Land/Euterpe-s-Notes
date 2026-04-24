"use client";

import React, { CSSProperties, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import { getDisplayName } from '../lib/getData'; // Import your specific function

interface SideBarProps {
  mode?: 'home' | 'profile';
  profileId?: string;
}

const SideBar = ({ mode = 'home' }: SideBarProps) => {
  const isProfileMode = mode === 'profile';
  const [handle, setHandle] = useState<string | null>(null);

  useEffect(() => {
  // 1. Define the function to fetch the handle
  async function fetchUserHandle(userId?: string) {
    if (!userId) {
      setHandle(null);
      return;
    }
    
    const result = await getDisplayName(userId);
    if (result && result.display_name) {
      setHandle(result.display_name);
    } else {
      setHandle(userId); // Fallback to ID
    }
  }

  // 2. Run the initial check
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) fetchUserHandle(session.user.id);
  });

  // 3. Listen for changes (Login/Logout)
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session) {
      fetchUserHandle(session.user.id);
    } else {
      setHandle(null); // User logged out, hide the button
    }
  });

  // 4. Cleanup the listener when the component unmounts
  return () => {
    subscription.unsubscribe();
  };
}, []);

  const SideBarStyle: CSSProperties = {
    position: 'fixed',
    top: '10vh',
    height: 'calc(100vh - 10vh)',
    width: '240px',
    background: '#292929',
    border: '2px solid #ffffff',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    color: 'white'
  };

  return (
    <div style={SideBarStyle}>
      {/* Home Link: Only shows when viewing a profile */}
      {isProfileMode && (
        <Link href="/" className="button" style={{ marginBottom: '10px' }}>
          Home
        </Link>
      )}

      {/* Profile Link: Shows if logged in and not on profile page */}
      {!isProfileMode && handle && (
        <Link 
          href={`/profile/${encodeURIComponent(handle)}`} 
          className="button" 
          style={{ marginBottom: '10px' }}
        >
          Profile
        </Link>
      )}

      <Link href="/" className="button">
        Recent Posts
      </Link>

      {/* Create Post Link: Only shows when logged in  */}
      {handle && (
        <Link href="/note" className="button" style={{ marginBottom: '10px' }}>
          Create Post
        </Link>
      )}
    </div>
  );
};

export default SideBar;