import { IPostActivitiesResponse } from "api/services/posts/interfaces/post-response.interface";
import { create } from "zustand";

interface PostsState {
  posts: IPostActivitiesResponse[];
  currentCursor: string;
  addNewSavedPosts: (
    posts: IPostActivitiesResponse[],
    cursor: string,
    isStart?: boolean,
  ) => void;
  clearStoredSavedPosts: () => void;
  deleteStoredSavedPost: (postId: string) => void;
}

const useStoredSavedPost = create<PostsState>((set) => ({
  posts: [],
  currentCursor: "",

  addNewSavedPosts: (newPosts, cursor, isStart = false) =>
    set((state) => {
      // Create a Set of existing post IDs for efficient lookup
      const existingPostIds = new Set(state.posts.map((post) => post.post.id));

      // Filter out duplicates from newPosts
      const uniqueNewPosts = newPosts.filter(
        (post) => !existingPostIds.has(post.post.id),
      );

      return {
        posts: isStart
          ? [...uniqueNewPosts, ...state.posts]
          : [...state.posts, ...uniqueNewPosts],
        currentCursor: cursor,
      };
    }),

  clearStoredSavedPosts: () =>
    set(() => ({
      posts: [],
      currentCursor: "",
    })),

  deleteStoredSavedPost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.post.id !== postId),
    })),
}));

export default useStoredSavedPost;
