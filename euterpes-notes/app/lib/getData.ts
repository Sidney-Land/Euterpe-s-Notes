'use server'
import 'server-only'
import { supabase } from './supabaseClient';

export async function getPost(post_id: string) {
    const { data, error } = await supabase
        .from("post") 
        .select('*, profile(display_name)')
        .eq('post_id', post_id); // Remove .single() for a moment

    // If data is an empty array [], it means the connection works but the table is empty!
    console.log("Database Response for ID", post_id, ":", data);

    if (error) {
        console.error("Supabase Error:", error.message);
        return null;
    }

    return data && data.length > 0 ? data[0] : null;
}

export async function getAllPostIds() {
    const { data, error } = await supabase
        .from("post")
        .select('post_id'); // We only need the IDs to start the map

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

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    const isUUID = uuidRegex.test(identifier);

    let query = supabase.from("profile").select('*');

    if (isUUID) {
        query = query.eq('user_id', identifier);
    } else {
        // Ensure this matches your column name exactly
        query = query.eq('display_name', identifier); 
    }

    const { data, error } = await query.maybeSingle();
    return data;
}
//calls get requests for each individual post. should swap this to a batch fetch method later.
//pagination would give us the page system rather than an infinite scroll.