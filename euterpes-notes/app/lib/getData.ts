'use server'
import 'server-only'
import { supabase } from './supabaseClient';

export async function getPost(post_id: string) {
    const { data, error } = await supabase
        .from("post") 
        .select('*, profile(user_id, display_name)')
        .eq('post_id', post_id); // Remove .single() for a moment

    // If data is an empty array [], it means the connection works but the table is empty!
    // console.log("Database Response for ID", post_id, ":", data);

    if (error) {
        console.error("Supabase Error:", error.message);
        return null;
    }

    return data && data.length > 0 ? data[0] : null;
}

export async function getAllPostIds() {
    const { data, error } = await supabase
        .from("post")
        .select('post_id') // We only need the IDs to start the map
        .order('timestamp', { ascending: false }); // Ensures reverse chronological order

    if (error) {
        console.error("Error fetching IDs:", error);
        return [];
    }

    return data; // This returns an array like [{post_id: "1"}, {post_id: "2"}]
}

export async function getDisplayName(user_id: string) {
    const { data, error} = await supabase
        .from("profile")
        .select('display_name')
        .eq('user_id', user_id)
        .limit(1) // Force limit to avoid coercion errors
        .maybeSingle();

    if(error) {
        console.error("Error fetching username: ", error);
        return null;
    }

    return data;
}

export async function getProfile(identifier: string) {
    if (!identifier || identifier === "username") return null; // Ignore the fallback string

    console.log("Searching for profile with identifier:", identifier);

    const { data, error } = await supabase
        .from("profile")
        .select('*')
        .eq('user_id', identifier)
        .maybeSingle();

    if (error) {
        console.error("Error fetching profile: ", error);
        return null;
    }

    return data;
}

export async function getFollowedStatus(user_id: string, followed_id: string) {

    const { count, error } = await supabase
        .from('following')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user_id)
        .eq('followed_id', followed_id)

    if (error) {
        console.error("Error fetching following status: ", error);
        return false;
    }

    return count ? true : false; // number into boolean coersion
}

export async function getFollowerCount(user_id: string) {

    const { count, error } = await supabase
        .from('following')
        .select('*', { count: 'exact', head: true })
        .eq('followed_id', user_id)

    if (error) {
        console.error("Error fetching follower count: ", error);
        return null;
    }

    return count;
}

export async function getFollowingCount(user_id: string) {

    const { count, error } = await supabase
        .from('following')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user_id)

    if (error) {
        console.error("Error fetching following count: ", error);
        return null;
    }

    return count;
}

// lib/getData.ts

export async function updateProfile(
  userId: string, 
  updates: { 
    display_name?: string, 
    bio?: string, 
    avatar_url?: string, // Add this
    banner_url?: string  // Add this
  }
) {
  console.log("Attempting update for:", userId, "with data:", updates);

  const { data, error, status } = await supabase
    .from('profile')
    .update(updates)
    .eq('user_id', userId)
    .select();

  if (error) {
    console.error("Supabase Error:", error.message, "Status:", status);
    return { success: false, error };
  }

  return { success: true, data: data?.[0] };
}
//calls get requests for each individual post. should swap this to a batch fetch method later.
//pagination would give us the page system rather than an infinite scroll.

export async function getMyPostIds(user_id: string) { //Get all of a user's post's ID's

    const {data, error} = await supabase
        .from('post')
        .select('*')
        .eq('poster_id', user_id)
        .order('timestamp', { ascending: false })

    if(error) {

        console.error("Error fetching my posts: ", error);
        return [];
    }

    return data;
}

export async function getBio(user_id: string) { //Get a user's bio

    const {data, error} = await supabase
        .from('profile')
        .select('bio')
        .eq('user_id', user_id)
        .limit(1) //Make sure nothing funky happens

    if(error) {

        console.error("Error fetching bio: ", error);
        return null;
    }

    return data;
}

export async function getFollowedList(user_id: string) {

    const {data, error} = await supabase
        .from('following')
        .select('followed_id')
        .eq('user_id', user_id)

    if(error) {

        console.error("Error fetching followed list: ", error);
        return null;
    }

    return data;
}