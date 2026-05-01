"use client";

import { ChangeEvent, useRef, useState, useEffect } from "react";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import { getFollowingCount, getFollowerCount, getFollowedStatus, getProfile, updateProfile } from "../../lib/getData";
import { supabase } from '../../lib/supabaseClient';
import { getImageUrl, uploadImage }from '../../lib/storage';

interface ProfilePageProps extends React.PropsWithChildren {
  profileId: string,
  postsCount: number;
}

export default function ProfilePage({ profileId, postsCount, children }: ProfilePageProps) {
  // Makes sidebar visible
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("No bio yet");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true); // Track loading state

  // Edit states
  const [activeEditor, setActiveEditor] = useState<"name" | "bio" | null>(null);
  const [draftName, setDraftName] = useState("");
  const [draftBio, setDraftBio] = useState("");

  const [userUUID, setUserUUID] = useState<string | null>(null);

  const [isOwner, setIsOwner] = useState(false); 
  // UUID of the user viewing the profile
  const [viewerUUID, setViewerUUID] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  
useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const data = await getProfile(profileId);
      const follower = await getFollowerCount(profileId);
      const following = await getFollowingCount(profileId);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (data) {
        setDisplayName(data.display_name || "New User");
        setBio(data.bio || "No bio yet");
        setUserUUID(data.user_id);
        // Don't forget to update the edit drafts!
        setDraftName(data.display_name || "New User");
        setDraftBio(data.bio || "No bio yet");    
        
        // Fetch existing images from storage
        const avatar = await getImageUrl(data.user_id, 'avatar');
        const banner = await getImageUrl(data.user_id, 'banner');
        setProfileImage(avatar);
        setHeaderImage(banner);

        if (session?.user && session.user.id === data.user_id) {
          setIsOwner(true);
        }
      }

      if (follower) {
        setFollowerCount(follower);
      }

      if (following) {
        setFollowingCount(following);
      }

      supabase.auth.getSession().then( async ({ data: { session } }) => {
        if (session) {
          setViewerUUID(session.user.id);
          
          setIsFollowing(await getFollowedStatus(session.user.id, profileId));
        }
      });

      setLoading(false);
    }
    loadProfile();
}, [profileId]);

  // Open and close handlers for edit
  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => {
    setIsEditOpen(false);
    setActiveEditor(null);
    setDraftName(displayName);
    setDraftBio(bio);
  };

  const startNameEdit = () => {
    setDraftName(displayName);
    setActiveEditor("name");
  };

  const startBioEdit = () => {
    setDraftBio(bio);
    setActiveEditor("bio");
  };

  const saveName = async () => {
    const nextName = draftName.trim();
    if (nextName.length > 0 && userUUID) {
      const { success } = await updateProfile(userUUID, { display_name: nextName });
      if (success) {
        setDisplayName(nextName);
        setActiveEditor(null);
        // RELOAD to the new URL so the page doesn't break on refresh
        window.location.href = `/profile/${encodeURIComponent(nextName)}`;
      }
    }
    setActiveEditor(null);

    storeName(nextName);
  };

  const saveBio = async () => {
    console.log("bio update started")
    const nextBio = draftBio.trim();
    setBio(nextBio.length > 0 ? nextBio : "No bio yet");
    setActiveEditor(null);

    storeBio(nextBio);
  };

  async function storeName(newName: string) {
    const { error } = await supabase
            .from("profile")
            .update({display_name: newName})
            .eq('user_id', userUUID)
    
    if (error) {
        console.error("Error storing name in Database:", error);
    }
  }

  async function storeBio(newBio: string) {
    const { error } = await supabase
            .from('profile')
            .update({bio: newBio})
            .eq('user_id', userUUID)
    
    if (error) {
        console.error("Error storing bio in Database:", error);
    }
  } 

  async function followProfile() {
    const { error } = await supabase
      .from('following')
      .insert({user_id: viewerUUID, followed_id: userUUID})
    
    if (error) {
      console.error("Error following profile:", error);
    } else {
      setFollowerCount(followerCount + 1);
      setIsFollowing(true);
    }
  }

  async function unFollowProfile() {
    const {error} = await supabase
      .from('following')
      .delete()
      .eq('user_id', viewerUUID)
      .eq('followed_id', userUUID)

    if (error) {
      console.error("Error unfollowing profile:", error);
    } else {
      setFollowerCount(followerCount - 1);
      setIsFollowing(false);
    }
  }

// Inside your ProfilePage component

const onImageSelected = async (
  event: ChangeEvent<HTMLInputElement>,
  type: 'avatar' | 'banner'
) => {
  const file = event.target.files?.[0];
  if (!file || !userUUID) return;

  try {
    const publicUrl = await uploadImage(userUUID, file, type);

   if (type === 'avatar') {
    setProfileImage(publicUrl);
   } else {
    setHeaderImage(publicUrl);
   }

   alert("Succesfully uploaded image, it may take a minute or 2 to see changes.");  
    
  } catch (err: any) {
    console.error("Upload error:", err);
    alert(err.message || "Failed to upload image");
  } finally {
    event.target.value = ""; 
  }
};

  const triggerProfileUpload = () => {
    profileInputRef.current?.click();
  };

  const triggerHeaderUpload = () => {
    headerInputRef.current?.click();
  };

  // Full-page loading state to prevent flickering "username" or empty fields
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="animate-pulse text-lg text-gray-400">Loading Profile...</p>
      </div>
    );
  }

  return (
    // Root page container.
    <div className="min-h-screen bg-black text-white">
      <TitleBar />
      {/* profileId here is the UUID from the URL params */}
      <SideBar mode="profile" profileId={profileId} />

      {/* Main profile content area */}
      <div className="ml-[240px] pt-[10vh]">
        {/* Header Image */}
        <div className="h-40 w-full overflow-hidden bg-gray-300">
          {headerImage && (
            <img
              src={headerImage}
              alt="Header"
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          
          {/* Profile Picture */}
          <div className="-mt-16 mb-6">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-400">
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start gap-4">

            {/* Username/DisplayName Display */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-gray-500 text-sm">
                @{displayName.toLowerCase().replace(/\s+/g, '')}
              </p>
            </div>

            <div className="flex flex-col items-center justify-self-center">
              {/* Stats */}
              <div className="flex space-x-16 text-center">
                <div>
                  <p className="font-semibold text-lg">{postsCount}</p>
                  <p className="text-gray-400">Posts</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">{followerCount}</p>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">{followingCount}</p>
                  <p className="text-gray-400">Following</p>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-4 text-sm text-gray-400">{bio}</p>
            </div>

            {/* Action Buttons: Edit or Follow/Unfollow */}
            <div className="flex justify-end">
              {viewerUUID && (
                viewerUUID === userUUID ? (
                  /* Owner View: Show Edit Button */
                  <button
                    onClick={openEdit}
                    className="rounded border border-gray-700 bg-black px-4 py-2 font-semibold text-white shadow hover:bg-gray-800"
                  >
                    Edit
                  </button>
                ) : (
                  /* Visitor View: Show Follow/Unfollow Button */
                  <button
                    onClick={isFollowing ? unFollowProfile : followProfile}
                    className={`rounded px-4 py-2 font-semibold shadow transition ${
                      isFollowing 
                        ? "border border-gray-700 bg-zinc-900 text-white hover:bg-zinc-800" 
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="mt-6 border-t"></div>

        {/* Posts Section, defined in the page.tsx */}
        {children}
      </div>

      {/* Dims profile page when edit is open */}
      {isEditOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/65"
          onClick={closeEdit}
          aria-hidden="true"
        />
      )}

      {/* Sidebar with edit options */}
      <aside
        className={`fixed right-0 top-0 z-40 h-screen w-80 border-l border-zinc-800 bg-zinc-900 p-6 shadow-2xl transition-transform duration-300 ${
          isEditOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Edit panel"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold">Edit</h2>
          <button
            onClick={closeEdit}
            className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-200 hover:bg-zinc-800"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <button
            onClick={startNameEdit}
            className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800"
          >
            Name
          </button>
          <button
            onClick={startBioEdit}
            className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800"
          >
            Bio
          </button>
          <button
            onClick={triggerProfileUpload}
            className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800"
          >
            Profile Picture
          </button>
          <button
            onClick={triggerHeaderUpload}
            className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800"
          >
            Header Picture
          </button>

          {activeEditor === "name" && (
            <div className="space-y-3 rounded border border-zinc-700 p-4">
              <label htmlFor="name-input" className="block text-sm text-zinc-300">
                Update Name
              </label>
              <input
                id="name-input"
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-zinc-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveName}
                  className="rounded border border-zinc-600 px-3 py-1 text-sm hover:bg-zinc-800"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditor(null)}
                  className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeEditor === "bio" && (
            <div className="space-y-3 rounded border border-zinc-700 p-4">
              <label htmlFor="bio-input" className="block text-sm text-zinc-300">
                Update Bio
              </label>
              <textarea
                id="bio-input"
                value={draftBio}
                onChange={(event) => setDraftBio(event.target.value)}
                rows={4}
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white outline-none focus:border-zinc-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={saveBio}
                  className="rounded border border-zinc-600 px-3 py-1 text-sm hover:bg-zinc-800"
                >
                  Save
                </button>
                <button
                  onClick={() => setActiveEditor(null)}
                  className="rounded border border-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <input
          ref={profileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onImageSelected(e, 'avatar')}
        />
        <input
          ref={headerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onImageSelected(e, 'banner')}
        />
      </aside>
      </div>
  );
}