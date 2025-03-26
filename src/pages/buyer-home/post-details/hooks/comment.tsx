import { IAsset } from "api/services/assets/interfaces/asset.interface";
import {
  ICommentOut,
  ICommentReplyOut,
  IPostActivitiesResponse,
} from "api/services/posts/interfaces/post-response.interface";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";
import { adaptStatistics } from "api/services/store-front/adapters/storefront-stats.adapter";
import { create } from "zustand";

import { Comment } from "../types/comment";

interface CommentStore {
  comments: Comment[];
  currentCursor: string | undefined;
  currentId: string;
  setComments: (
    newComments: Comment[],
    cursor: string | undefined,
    id: string,
  ) => void;
  clearComments: () => void;
  addComment: (newComment: Comment) => void;
  addReply: (reply: Comment, rootCommentId: string) => void;
  rootCommentLength: number;
  totalCommentCount: number;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  currentCursor: "",
  currentId: "",
  rootCommentLength: 0,
  totalCommentCount: 0,

  setComments: (
    newComments: Comment[],
    cursor: string | undefined,
    id: string,
  ) => {
    const rootCommentCount = newComments.length;
    const replyCount = newComments.reduce(
      (count, comment) => count + (comment.statistics.total.comments || 0),
      0,
    );

    set((state) => {
      // If we're updating the same post's comments (like after a like action)
      // and there's no cursor, replace the comments entirely
      if (id === state.currentId && !cursor) {
        return {
          comments: newComments.map((comment) => ({
            ...comment,
            replyCount: comment.replies?.length || 0,
          })),
          currentCursor: cursor,
          currentId: id,
          rootCommentLength: rootCommentCount,
          totalCommentCount: rootCommentCount + replyCount,
        };
      }

      // If we're loading a different post, clear and set new comments
      if (id !== state.currentId) {
        return {
          comments: newComments.map((comment) => ({
            ...comment,
            replyCount: comment.replies?.length || 0,
          })),
          currentCursor: cursor,
          currentId: id,
          rootCommentLength: rootCommentCount,
          totalCommentCount: rootCommentCount + replyCount,
        };
      }

      // If we're loading more comments (pagination)
      return {
        comments: [
          ...state.comments,
          ...newComments.map((comment) => ({
            ...comment,
            replyCount: comment.replies?.length || 0,
          })),
        ],
        currentCursor: cursor,
        currentId: id,
        rootCommentLength: rootCommentCount + state.rootCommentLength,
        totalCommentCount:
          state.totalCommentCount + rootCommentCount + replyCount,
      };
    });
  },

  clearComments: () =>
    set({
      comments: [],
      currentCursor: "",
      currentId: "",
      totalCommentCount: 0,
    }),

  addComment: (newComment: Comment) =>
    set((state) => ({
      comments: [...state.comments, { ...newComment, replyCount: 0 }],
      rootCommentLength: state.rootCommentLength + 1,
      totalCommentCount: state.totalCommentCount + 1,
    })),

  addReply: (reply: Comment, rootCommentId: string) =>
    set((state) => ({
      comments: state.comments.map((comment) => {
        if (comment.id === rootCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
            replyCount: (comment.replyCount || 0) + 1,
          };
        }
        return comment;
      }),
      totalCommentCount: state.totalCommentCount + 1,
    })),
}));

export const useConvertReplyData = (data: ICommentReplyOut[]): Comment[] => {
  return data.map((item) => ({
    id: item.id,
    content: item.content,
    created_at: item.created_at,
    updated_at: item.updated_at,
    seller: {
      name: item.creator.user.username,
      avatar: (item.creator.user.avatar as IAsset)?.url,
      isApproved: false,
    },
    statistics: adaptStatistics(
      item.statistics ?? {
        total: { count_reactions: 0, count_saves: 0, count_comments: 0 },
        current_user: {
          count_reactions: 0,
          count_saves: 0,
          count_comments: 0,
        },
      },
    ),
  }));
};

export const useConvertItemData = (res: IPostActivitiesResponse): Comment => {
  const commentDetails = res.details as ICommentOut;
  const replies = useConvertReplyData(commentDetails.replies || []);

  const result: Comment = {
    content: commentDetails.content,
    updated_at: commentDetails.updated_at,
    created_at: commentDetails.created_at,
    id: commentDetails.id,
    seller: {
      name: res.creator.user.username,
      avatar: (res.creator.user.avatar as IAsset)?.url,
      isApproved: false,
    },
    parent_comment_id: commentDetails.parent_comment_id,
    replies,
    statistics: adaptStatistics(
      res.statistics ?? {
        total: { count_reactions: 0, count_saves: 0, count_comments: 0 },
        current_user: {
          count_reactions: 0,
          count_saves: 0,
          count_comments: 0,
        },
      },
    ),
  };

  return result;
};

export const updateCommentStatistics = (
  id: string,
  comments: Comment[],
  newStatistics: IStatistics,
): Comment[] => {
  return comments.map((item) => {
    if (item.id === id) {
      return { ...item, statistics: newStatistics };
    }
    if (item.replies && item.replies.length > 0) {
      return {
        ...item,
        replies: updateCommentStatistics(id, item.replies, newStatistics),
      };
    }
    return item;
  });
};
