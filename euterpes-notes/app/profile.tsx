"use client";

import { useState } from "react";

export default function ProfilePage() {
  // Makes sidebar visible
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Open and close handlers for edit
  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  return (
    // Root page container.
    <div className="min-h-screen bg-black text-white">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col p-6">
        <h2 className="text-xl font-bold mb-6">Logo</h2>

        <nav className="flex flex-col space-y-4 text-lg">
          <button className="text-left hover:text-gray-400 transition">Home</button>
          <button className="text-left hover:text-gray-400 transition">Recent Posts</button>
          <button
            onClick={openEdit}
            className="text-left hover:text-gray-400 transition"
          >
            Edit
          </button>
          <button className="text-left hover:text-gray-400 transition">Login/Signup</button>
        </nav>
      </div>

      {/* Main profile content area */}
      <div className="ml-64">
        {/* Header Image */}
        <div className="h-40 bg-gray-300 w-full"></div>

        <div className="relative max-w-6xl mx-auto px-6">
          
          {/* Profile Picture */}
          <div className="-mt-16 mb-6">
            <div className="w-32 h-32 bg-gray-400 rounded-full border-4 border-white"></div>
          </div>

          <div className="flex justify-between">

            {/* Username */}
            <div>
              <h1 className="text-2xl font-bold">Users Name</h1>
              <p className="text-gray-500">@username</p>
            </div>

            <div className="flex flex-col items-center flex-1 -ml-35">

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
              <p className="text-sm text-gray-400 mt-4">No bio yet</p>

            </div>
            {/* Edit Button */}
            <button
              onClick={openEdit}
              className="absolute right-6 bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow"
            >
              Edit
            </button>
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
          <button className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800">
            Profile Picture
          </button>
          <button className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800">
            Header Picture
          </button>
          <button className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800">
            Bio
          </button>
          <button className="w-full rounded border border-zinc-700 px-4 py-3 text-left transition hover:bg-zinc-800">
            Name
          </button>
        </div>
      </aside>
      </div>
  );
}