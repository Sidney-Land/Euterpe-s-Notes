'use server'
import 'server-only'

export type Post = {
  id: string,
  title: string,
  music_link: string,
  content: string,
  poster_id: string,
  profile: Profile,
  timestamp: string
}

export type Profile = {
  user_id: string
  display_name: string
  bio: string
}

export type Following = {
    user_id: string
    followed_id: string
}