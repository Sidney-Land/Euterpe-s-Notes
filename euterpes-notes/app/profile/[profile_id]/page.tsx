import ProfilePage from "./ProfilePage";
import { getMyPostIds } from "../../lib/getData";
import { Suspense } from "react";
import PostCard from "../../components/PostCard";

interface ProfileRoutePageProps {
  params: Promise<{ profile_id: string }>; // Updated to Promise for newer Next.js compatibility
}

export default async function ProfileRoutePage({ params }: ProfileRoutePageProps) {
  const resolvedParams = await params;
  const profileId = decodeURIComponent(resolvedParams.profile_id);

  //Fetches the actual IDs from the database
  const posts = await getMyPostIds(profileId);

  return (
    <ProfilePage profileId={profileId} postsCount={posts.length}>
      <Suspense fallback={<div>Loading your feed...</div>}>
        <div>
          {/* 2. Map through the supabase results */}
          {posts.map((post) => (
            <PostCard key={post.post_id} postId={post.post_id} />
          ))}
          
          {/* 3. Handle the empty state */}
          {posts.length === 0 && (
            <div style={{ marginLeft: '240px', width: 'calc(100% - 240px)' }}>
              {/*The width calculation adjusts for the sidebar since other components can't see the sidebars margins*/}
              <p style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                margin: 0 
              }}>
                No posts found. Time to share some music!
            </p>
          </div>
          )}
        </div>
      </Suspense>
    </ProfilePage>
  );
}