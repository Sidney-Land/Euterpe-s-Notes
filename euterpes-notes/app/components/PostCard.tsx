import React from 'react';

interface PostCardProps {}

const PostCard = (props: PostCardProps) => {
    return (
    <div style = {{display: 'flex', alignItems: 'center', padding: 1, background: 'gray'}} >
        Placeholder Card
    </div>
  );
};

export default PostCard;

/*
.card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: opacity 0.2s;
}
*/