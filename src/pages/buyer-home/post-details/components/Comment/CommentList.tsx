import { useState } from "react";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";

import { Comment } from "../../types/comment";

import { CommentItem } from "./CommentItem";
interface CommentList {
  comments: Comment[];
  setMessage?: (value: string) => void;
  handleSubmitReply: (id: string) => Promise<Comment | undefined>;
  handleLikeComment: (
    comment_id: string,
    updatedStatistics: IStatistics,
  ) => void;
}
export const CommentList = ({
  comments,
  setMessage,
  handleSubmitReply,
  handleLikeComment,
}: CommentList) => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const handleReplyModal = (id: string | null) => {
    setActiveModalId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      {comments.map(
        (comment) =>
          comment.parent_comment_id === null && (
            <div key={comment.id}>
              <CommentItem
                handleLikeComment={handleLikeComment}
                handleSubmitReply={handleSubmitReply}
                setMessage={setMessage}
                key={comment.id}
                rootId={comment.id}
                parentComment={comment}
                activeModalId={activeModalId}
                handleReplyModal={handleReplyModal}
              />
            </div>
          ),
      )}
    </>
  );
};
