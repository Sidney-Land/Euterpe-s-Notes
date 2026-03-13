import React, { CSSProperties } from 'react';

interface SideBarProp {}

const SideBar = (props: SideBarProp) => {
    const SideBarStyle: CSSProperties = {
      //keeps the sidebar in place if the user scrolls the page
      position: 'fixed',
      //marginTop: '32px',
      top: '10vh',
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