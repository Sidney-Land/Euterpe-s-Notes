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
    }
    return (
    <div className = "component-style" style = {SideBarStyle} >
        Placeholder SideBar
    </div>
  );
}

export default SideBar;