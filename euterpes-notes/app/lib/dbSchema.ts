'use server'
import 'server-only'

type Post = {
  id: string,
  title: string,
  music_link: string,
  content: string,
  poster_id: string,
  Profile: Profile,
  timestamp: string
}

type Profile = {
  user_id: string
  display_name: string
  bio: string
}

type Following = {
    user_id: string
    followed_id: string
}