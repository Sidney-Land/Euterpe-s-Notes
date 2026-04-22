import React, { CSSProperties } from 'react';
import Link from 'next/link';

interface SideBarProps {
  mode?: 'home' | 'profile';
  profileId?: string;
}

const SideBar = ({ mode = 'home', profileId = 'username' }: SideBarProps) => {
    const isProfileMode = mode === 'profile';
    const SideBarStyle: CSSProperties = {
      //keeps the sidebar in place if the user scrolls the page
      position: 'fixed',
      
      //vh is the same as % except it looks at the space on screen, while % looks at the given 
      //height of the parent component.

        //top tells the component where to start
        top: '10vh',
        //calculates the height by subtracting the height of the header
        height: 'calc(100vh - 10vh)',
      width: '240px',

      display: 'inline-flex',
      alignItems: 'anchor-center', //aligns the buttons to the center of the sidebar
      flexDirection: 'column',
      justifyContent: 'flex-start',
      background: '#292929',
      border: '2px solid #e2e8f0',
      color: '#ffffff', //text color
    }

    // TODO: Add logic to route to user's profile if signed in, or to the authentication page if not
    const links = isProfileMode
      ? [
          { label: 'Home', href: '/' },
          { label: 'Recent Posts', href: '/' },
        ]
      : [
          { label: 'Profile', href: `/profile/${encodeURIComponent(profileId)}` },
          { label: 'Recent Posts', href: '/' },
          { label: 'Create Post', href: '/note/' },
        ];

    // TODO: Add link to Recent Posts (useful for going to Recent Posts Feed if signed in)
    
    return (
    <div className="component-style" style={SideBarStyle}>
      {links.map((link) => (
        <Link key={link.label} className="button" href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default SideBar;