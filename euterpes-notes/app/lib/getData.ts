'use server'
import 'server-only'
import { supabase } from './supabaseClient'; // Use the client you already made!

//official version to be used once we have data in supabase.
// export async function getPost(post_id: string) {
//     // We tell Supabase: "Give me the post where the id matches our postId"
//     const { data, error } = await supabase
//         .from("Post") 
//         .select('*')
//         .eq('id', post_id)
//         .single(); // Since we only want one post

//     if (error) {
//         console.error("Error fetching post:", error);
//         return null;
//     }

//     return data;
// }

//temporary version to make sure the connection is working without any data in supabase
export async function getPost(post_id: string) {
    const { data, error } = await supabase
        .from("Post") 
        .select('*, Profile(poster_name:display_name)')
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
        .from("Post")
        .select('post_id'); // We only need the IDs to start the map

    if (error) {
        console.error("Error fetching IDs:", error);
        return [];
    }

    return data; // This returns an array like [{post_id: "1"}, {post_id: "2"}]
}

//calls get requests for each individual post. should swap this to a batch fetch method later.
//pagination would give us the page system rather than an infinite scroll.