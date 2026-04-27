'use client';

import React, { CSSProperties, useState } from 'react';
import CreatePost from './CreatePost';

interface ReplyButtonProps {
    parent_id: string | null
}

export default function ReplyButton({ parent_id }: ReplyButtonProps) {
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
                <CreatePost 
                    parent_id={parent_id}
                />
            )}
        </div></>
        
    );
}