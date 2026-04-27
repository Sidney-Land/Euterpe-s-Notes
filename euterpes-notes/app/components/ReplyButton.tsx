'use client';

import React, { CSSProperties, useState } from 'react';
import CreatePost from './CreatePost';

export default function ReplyButton() {
    const [replying, setReplying] = useState(false);
    
    const handleReplying = async (e: React.FormEvent) => {
        setReplying(!replying);
    }
    const ReplyStyle: CSSProperties = {
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
    }

    return (
        <><button className="button" onClick={handleReplying}>{!replying ? "Reply" : "Close"}</button>
        <div>
            {replying && (
                <CreatePost />
            )}
        </div></>
        
    );
}