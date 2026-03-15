import React, { CSSProperties } from 'react';

interface SideBarProp {}

const SideBar = (props: SideBarProp) => {
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
    function ProfileLink():string {
        return "";
    }

    // TODO: Add link to Recent Posts (useful for going to Recent Posts Feed if signed in)
    return (
    <div className = "component-style" style = {SideBarStyle} >
      <a className = "button" href= {ProfileLink()}>Profile</a>
      <a className = "button" href= ''>Recent Posts</a>
    </div>
  );
}

export default SideBar;