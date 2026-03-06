import React, { CSSProperties } from 'react';

interface SideBarProp {}

const SideBar = (props: SideBarProp) => {
    const SideBarStyle: CSSProperties = {
        // Sidebar-specific
        height: '100%', /* Full-height: remove this if you want "auto" height */
        width: '15%', /* Set the width of the sidebar */
        position: 'fixed', /* Fixed Sidebar (stay in place on scroll) */
        zIndex: '1', /* Stay on top */
        top: '0', /* Stay at the top */
        left: '0',
        backgroundColor: '#111', /* Black */
        overflowX: 'hidden', /* Disable horizontal scroll */
        paddingTop: '20px',
        paddingBottom: '20px',

        display: 'flex',
        alignItems: 'anchor-center', //aligns the buttons to the center of the sidebar
        flexDirection: 'column',
        justifyContent: 'flex-start',
        background: '#292929',
        border: '2px solid #e2e8f0',
        color: '#ffffff', //text color

        // Layout of the SideBar
        margin: '1%',
        minHeight: '200px', // Maintain button visibility
        //these lines force a long string of text without space characters to wrap around if the text
        //is too long to fit into the card, preventing it from going off the card
        overflowWrap: 'anywhere', // This is the magic line
        wordBreak: 'break-word'   // A backup for older browsers
    }

    const SideButton: CSSProperties = {
        backgroundColor: '#636b6e',
        border: 'none',
        color: 'white',
        padding: '5% 10%',
        marginBottom: '5px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',


        // Change Cursor and background color upon mouse hover (TODO: add hover pseudo-class)
        cursor: 'pointer',
        //transitionDuration: '0.4s',
    } 

    // TODO: Add logic to route to user's profile if signed in, or to the authentication page if not
    function ProfileLink():string {
        return "";
    }

    // TODO: Add route to Recent Posts page
    return (
    <div style = {SideBarStyle} >
        <a style= {SideButton} href= {ProfileLink()}>Profile</a>
        <a style= {SideButton} href= ''>Recent Posts</a>
    </div>
  );
}

export default SideBar;