import React, { CSSProperties } from 'react';
import PostCard from './PostCard';

interface PostFeedProps {}

const PostFeed = (props: PostFeedProps) => {
    return (
    //className imports the given style from globals.css
    <div>
      {Array(10).fill(true).map((_, i) => <PostCard key={i} />)}
    </div>
  );
}

export default PostFeed;