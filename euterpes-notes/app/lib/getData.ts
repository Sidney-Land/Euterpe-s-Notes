'use server'
import 'server-only'
import { supabase } from './supabaseClient'; // Use the client you already made!

export async function getPost(post_id: string) {
    // We tell Supabase: "Give me the post where the id matches our postId"
    const { data, error } = await supabase
        .from("Post") 
        .select('*')
        .eq('id', post_id)
        .single(); // Since we only want one post

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data;
}

//calls get requests for each individual post. should swap this to a batch fetch method later.
//pagination would give us the page system rather than an infinite scroll.