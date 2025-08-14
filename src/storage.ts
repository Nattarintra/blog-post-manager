import type { IPost } from "./types"

const STORAGE_KEY = "blog_post_v1"

export const loadPosts = (): IPost[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    const parsed = JSON.parse(data)

    if (Array.isArray(parsed)) return parsed as IPost[]

    return []
  } catch (error) {
    console.error("Failed to load posts from localStorage", error)
    return []
  }
}

export const savePosts = (posts: IPost[]): void => {
  try {
    const json = JSON.stringify(posts)
    localStorage.setItem(STORAGE_KEY, json)
  } catch (error) {
    console.error("Failed to save posts to localStorage", error)
  }
}
