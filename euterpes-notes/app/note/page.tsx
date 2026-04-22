import { Crafty_Girls } from 'next/font/google';
import CreatePost from '../components/CreatePost'

export default function CreatePostPage() {
  return (
    <main style={{ padding: '20px' }}>
      <CreatePost></CreatePost>
    </main>
  );
}