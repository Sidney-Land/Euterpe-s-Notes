'use server'
import 'server-only'
import { supabase } from './supabaseClient';

export async function getPost(post_id: string) {
    const { data, error } = await supabase
        .from("post") 
        .select('*, profile(display_name)')
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
        .single()

    if(error) {
        console.error("Error fetching username: ", error);
        return null;
    }

    return data;
}

/*
export async function getProfile(user_id: string) {
    .from("profile")
    .select('*')
    .eq('user_id', user_id)

}*/
//calls get requests for each individual post. should swap this to a batch fetch method later.
//pagination would give us the page system rather than an infinite scroll.

export async function getMyPosts(user_id: string) { //Get all of a user's posts

    const {data, error} = await supabase
        .from('post')
        .select('*')
        .eq('poster_id', user_id)
        .order('timestamp')

    if(error) {

        console.error("Error fetching mypost: ", error);
        return null;
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