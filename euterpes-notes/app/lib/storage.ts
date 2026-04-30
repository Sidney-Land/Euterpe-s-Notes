// lib/storage.ts
import { supabase } from './supabaseClient';

export async function uploadImage(userId: string, file: File, type: 'avatar' | 'banner') {
  // 1. Enforce 1MB limit
  if (file.size > 1048576) {
    throw new Error("File is too large. Max size is 1MB.");
  }

  // Optional addition to the uploadImage function
    async function cleanFolder(userId: string, type: 'avatar' | 'banner') {
    const { data } = await supabase.storage.from('profile_images').list(userId);
    if (data) {
        const filesToDelete = data
        .filter(f => f.name.startsWith(type))
        .map(f => `${userId}/${f.name}`);
        
        if (filesToDelete.length > 0) {
        await supabase.storage.from('profile_images').remove(filesToDelete);
        }
    }
    }

  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${type}.${fileExt}`;

  // 2. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('profile_images')
    .upload(filePath, file, { 
        upsert: true,
        contentType: file.type 
    });

  if (uploadError) throw uploadError;

  // 3. Get the Public URL
  const { data } = supabase.storage
    .from('profile_images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function getImageUrl(userId: string, type: 'avatar' | 'banner') {
  const { data, error } = await supabase.storage.from('profile_images').list(userId);
  if (error || !data) return null;

  const file = data.find(f => f.name.startsWith(type));
  if (!file) return null;

  const { data: urlData } = supabase.storage.from('profile_images').getPublicUrl(`${userId}/${file.name}`);
  return urlData.publicUrl;
}