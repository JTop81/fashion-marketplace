import { IPost } from "api/services/posts/interfaces/post.interface";
import {
  PostStatus,
  PostType,
  RoleStatus,
  UserStatus,
} from "api/services/posts/interfaces/post-response.interface";
import { Role } from "enums/role";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostsState {
  postDetails: IPost;
  setPostDetails: (post: IPost) => void;
  posts: IPost[];
  currentCursor: string;
  setPosts: (posts: IPost[]) => void;
  addNewPosts: (posts: IPost[], cursor: string) => void;
  updateStoredPosts: (post: IPost) => void;
  deleteStoredPost: (postId: string) => void;
}

const useStoredPosts = create<PostsState>()(
  persist(
    (set) => ({
      postDetails: {
        id: "",
        type: PostType.PRODUCT,
        creator_id: "",
        creator: {
          id: "",
          user_id: "",
          role_id: "",
          role: {
            id: "",
            name: Role.SHOPPER,
          },
          assigned_date: "",
          status: RoleStatus.ACTIVE,
          updated_at: "",
          created_at: "",
          details: null,
          user: {
            id: "",
            username: "",
            email: "",
            auth0_user_id: "",
            status: UserStatus.ACTIVE,
          },
        },
        status: PostStatus.DRAFTED,
        assets: [],
        statistics: {
          total: {
            reactions: 0,
            saves: 0,
            comments: 0,
          },
          current_user: {
            reactions: 0,
            saves: 0,
            comments: 0,
          },
        },
        preferences: [],
        created_at: "",
        updated_at: "",
      },
      posts: [],
      currentCursor: "",
      setPostDetails: (newPostDetails: IPost) =>
        set(
          (state) => (
            state.updateStoredPosts(newPostDetails),
            { postDetails: newPostDetails }
          ),
        ),

      addNewPosts: (newPosts, cursor) =>
        set((state) => ({
          posts: [...state.posts, ...newPosts],
          currentCursor: cursor,
        })),

      setPosts: (newPosts: IPost[]) => set({ posts: newPosts }),

      updateStoredPosts: (updatePost) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === updatePost.id ? updatePost : post,
          ),
        })),

      deleteStoredPost: (postId) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        })),
    }),
    {
      name: "posts-storage",
      version: 1,
    },
  ),
);

export default useStoredPosts;
