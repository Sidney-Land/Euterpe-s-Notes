import 'server-only'

export async function getPost(post_id: string) {
    'use server'
    const response = await fetch(`https://api.vercel.app/blog/${post_id}`);
    const data = await response.json();
    return data;
}