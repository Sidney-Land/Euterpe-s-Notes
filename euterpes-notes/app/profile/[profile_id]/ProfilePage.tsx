"use client";

import { ChangeEvent, useRef, useState } from "react";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";

interface ProfilePageProps {
  profileId: string;
}

export default function ProfilePage({ profileId }: ProfilePageProps) {
  const username = profileId.trim().length > 0 ? profileId : "username";
  // Makes sidebar visible
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [displayName, setDisplayName] = useState(username);
  const [bio, setBio] = useState("No bio yet");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [activeEditor, setActiveEditor] = useState<"name" | "bio" | null>(null);
  const [draftName, setDraftName] = useState(username);
  const [draftBio, setDraftBio] = useState("No bio yet");
  const profileInputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

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

  const saveName = () => {
    const nextName = draftName.trim();
    if (nextName.length > 0) {
      setDisplayName(nextName);
    }
    setActiveEditor(null);
  };

  const saveBio = () => {
    const nextBio = draftBio.trim();
    setBio(nextBio.length > 0 ? nextBio : "No bio yet");
    setActiveEditor(null);
  };

  const onImageSelected = (
    event: ChangeEvent<HTMLInputElement>,
    onComplete: (result: string) => void,
  ) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onComplete(reader.result);
      }
    };
    reader.readAsDataURL(selectedFile);
    event.target.value = "";
  };

  const triggerProfileUpload = () => {
    profileInputRef.current?.click();
  };

  const triggerHeaderUpload = () => {
    headerInputRef.current?.click();
  };

  return (
    // Root page container.
    <div className="min-h-screen bg-black text-white">
      <TitleBar />
      <SideBar mode="profile" profileId={username} />

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

            {/* Username */}
            <div className="min-w-0">
              <h1 className="text-2xl font-bold">{displayName}</h1>
              <p className="text-gray-500">@{username}</p>
            </div>

            <div className="flex flex-col items-center justify-self-center">

              {/* Stats */}
              <div className="flex space-x-16 text-center">
                <div>
                  <p className="font-semibold text-lg">0</p>
                  <p className="text-gray-400">Posts</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">0</p>
                  <p className="text-gray-400">Followers</p>
                </div>
                <div>
                  <p className="font-semibold text-lg">0</p>
                  <p className="text-gray-400">Following</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-gray-400 mt-4">{bio}</p>

            </div>
            {/* Edit Button */}
            <div className="flex justify-end">
              <button
                onClick={openEdit}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow"
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t mt-6"></div>

        {/* Posts Section */}
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-400 text-lg">No Posts Yet</p>
        </div>
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
        className={`fixed top-0 right-0 z-40 h-screen w-80 border-l border-zinc-800 bg-zinc-900 p-6 shadow-2xl transition-transform duration-300 ${
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
          onChange={(event) => onImageSelected(event, setProfileImage)}
        />
        <input
          ref={headerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => onImageSelected(event, setHeaderImage)}
        />
      </aside>
      </div>
  );
}