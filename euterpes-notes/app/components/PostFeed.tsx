import React, { CSSProperties } from 'react';
import PostCard from './PostCard';

interface PostFeedProps {}

const PostFeed = (props: PostFeedProps) => {
    return (
    //className imports the given style from globals.css
    <div>
      <PostCard></PostCard>
    </div>
  );
}

export default PostFeed;