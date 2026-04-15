import React, { CSSProperties } from 'react';
import Image from "next/image";
import Link from "next/link";

interface TitleBarProp {}

const TitleBar = (props: TitleBarProp) => {
    const TitleBarStyle: CSSProperties = {
        // Titlebar-specific
        height: '10%',
        width: '100%', /* Full-width */
        position: 'fixed', /* Fixed Titlebar (stay in place on scroll) */
        zIndex: '1', /* Stay on top */
        top: '0', /* Stay at the top left*/
        left: '0',
        backgroundColor: '#111', /* Black */
        overflowY: 'hidden', /* Disable Vertical scroll */
        paddingLeft: '20px',
        paddingRight: '20px',

        display: 'inline-flex',
        alignItems: 'center', //aligns the buttons to the center of the titlebar
        flexDirection: 'row',
        justifyContent: 'left',
        background: '#292929',
        border: '2px solid #e2e8f0',
        color: '#ffffff', //text color

        minWidth: '200px', // Maintain button visibility
        //these lines force a long string of text without space characters to wrap around if the text
        //is too long to fit into the card, preventing it from going off the card
        overflowWrap: 'anywhere', // This is the magic line
        wordBreak: 'break-word'   // A backup for older browsers
    }

    return (
    <div style = {TitleBarStyle} >

        <Link href="/">
            <Image
                src="/globe.svg"
                alt="Placeholder Logo"
                width={70}
                height={70}
                className='clickable'
            />
        </Link>


        <Link href="/">
            <h1 className='clickable'>Euterpe's Notes</h1>
        </Link>

        <a className = "button" href= ''>Search</a>

        <Link href="/signup" className="button" style={{ textDecoration: 'none', color: 'inherit' }}>
            Sign Up/Login
        </Link>
    </div>
  );
}

export default TitleBar;