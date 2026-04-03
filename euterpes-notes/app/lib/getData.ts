'use server'
import 'server-only'
import {supabase} from './supabaseClient.ts'

export async function getPost(post_id: string) {
    const response = await fetch(`https://api.vercel.app/blog/${post_id}`);
    const data = await response.json();
    return data;
}