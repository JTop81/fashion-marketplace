import { useCallback, useEffect, useRef, useState } from "react";
import { FaAt, FaHeart, FaRegSmile } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getActivities } from "api/services/post-activities";
import { ActivityType } from "api/services/post-activities/interfaces/activities-response.interface";
import { IPostActivitiesResponse } from "api/services/posts/interfaces/post-response.interface";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";
import { useAuthStore } from "setup/store/auth/authStore";
import { formatTimeAgo } from "utils/formatTime";

import { useCommentStore, useConvertItemData } from "../../hooks/comment";
import { Comment } from "../../types/comment";

import InputWithIcons from "./InputWithIcons";

type CommentProps = {
  parentComment: Comment;
  setMessage?: (value: string) => void;
  handleSubmitReply: (id: string) => Promise<Comment | undefined>;
  handleLikeComment: (
    comment_id: string,
    updatedStatistics: IStatistics,
  ) => void;
  rootId?: string;
  activeModalId: string | null;
  handleReplyModal: (id: string | null) => void;
};

export const CommentItem = ({
  parentComment,
  handleLikeComment,
  setMessage,
  handleSubmitReply,
  rootId,
  activeModalId,
  handleReplyModal,
}: CommentProps) => {
  const { user } = useAuthStore();
  const { addReply } = useCommentStore();
  const queryClient = useQueryClient();
  const { content, id, created_at, seller, parent_comment_id, statistics } =
    parentComment;
  const [showReplies, setShowReplies] = useState(parent_comment_id !== null);
  const [reactionComment, setReactionComment] = useState(
    statistics.current_user.reactions === 1,
  );
  const [reactionCount, setReactionCount] = useState(
    statistics.total.reactions ?? 0,
  );
  const [replies, setReplies] = useState<Comment[]>();
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const replyInputRef = useRef<HTMLInputElement>(null);

  const commentLimit = 5;

  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const handleReply = () => {
    handleReplyModal(id);
    setTimeout(() => {
      replyInputRef.current?.focus();
    }, 50);
  };

  const handleReactionComment = useCallback(async () => {
    const isLiked = reactionComment;
    const updatedStatistics: IStatistics = {
      ...parentComment.statistics,
      total: {
        ...parentComment.statistics.total,
        reactions: isLiked
          ? parentComment.statistics.total.reactions - 1
          : parentComment.statistics.total.reactions + 1,
      },
      current_user: {
        ...parentComment.statistics.current_user,
        reactions: isLiked
          ? parentComment.statistics.current_user.reactions - 1
          : parentComment.statistics.current_user.reactions + 1,
      },
    };
    handleLikeComment(id, updatedStatistics);

    setReactionCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    setReactionComment(!isLiked);
  }, [reactionComment, parentComment.statistics, handleLikeComment, id]);

  const { data: rawData } = useQuery<{
    items: Comment[];
    cursor: string;
  }>({
    queryKey: ["getReplies", parentComment.id],
    queryFn: async () => {
      const response = await getActivities({
        type: ActivityType.COMMENT,
        id: parentComment.id,
      });
      const data = response.items.map((item: IPostActivitiesResponse) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useConvertItemData(item),
      );

      return { items: data, cursor: response.cursor };
    },
    staleTime: 1000 * 60 * 5,
    enabled: parentComment.id != null,
    retry: 1,
  });

  useEffect(() => {
    if (rawData) {
      setReplies(rawData.items);
      setCursor(rawData.cursor);
      setHasMore(rawData.items.length === commentLimit);
    }
  }, [rawData]);

  const fectchMoreReplies = async () => {
    const replies = await getActivities({
      type: ActivityType.COMMENT,
      id: parentComment.id,
      cursor,
    });

    const response = replies.items.map((item: IPostActivitiesResponse) =>
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useConvertItemData(item),
    );
    setReplies((prev) => (prev ? [...prev, ...response] : response));
    setCursor(replies.cursor);
    setHasMore(response.length === commentLimit);
  };

  const onClickPost = async () => {
    if (!currentMsg.trim()) return;
    const fetD: Comment | undefined = await handleSubmitReply(rootId ?? "");
    if (fetD) {
      setReplies((prev) => (prev ? [fetD, ...prev] : [fetD]));
      window.dispatchEvent(new Event("addReply"));
      queryClient.setQueryData(["getReplies", parentComment.id], {
        items: replies ? [fetD, ...replies] : [fetD],
        cursor: rawData?.cursor,
      });
      addReply(fetD, rootId ?? "");

      // Clear both the local state and parent state
      setCurrentMsg("");
      setMessage && setMessage("");
      handleReplyModal(null);
      setShowReplies(true);
    }
  };

  return (
    <>
      <div
        className={`flex space-x-3 p-4 ${parent_comment_id === null ? "mt-4" : "mt-2"}`}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={seller.avatar}
            alt={seller.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold">{seller.name}</span>
              <span className="text-[#8a8b91] text-xs ml-2">
                {formatTimeAgo(new Date(created_at).toISOString())}
              </span>
            </div>
            <div className="flex items-center gap-x-3">
              <div
                className="flex flex-col gap-y-1 items-center cursor-pointer"
                onClick={() => handleReactionComment()}
              >
                {reactionComment ? (
                  <FaHeart color="#9334eb" size={18} />
                ) : (
                  <FiHeart size={18} color="blue" />
                )}
                <span className="text-[#8a8b91]">{reactionCount}</span>
              </div>

              <FaEllipsisVertical />
            </div>
          </div>
          <p className="text-sm mt-1">{content}</p>
          <div className="flex items-center mt-2 space-x-2">
            <div className="flex items-center">
              <button
                className="text-[#8a8b91] flex items-center justify-center rounded text-sm"
                onClick={handleReply}
              >
                Reply
              </button>
            </div>
            <div
              onClick={toggleReplies}
              className={`flex-row cursor-pointer ${parent_comment_id === null && parentComment.statistics.total.comments + (parentComment.replies ? parentComment.replies?.length : 0) > 0 ? "flex" : "hidden"}`}
            >
              <div className="flex items-center">
                <span className="ml-3 text-[#8a8b91]">{`${showReplies ? "Hide" : "View"} ${parentComment.statistics.total.comments + (parentComment.replies ? parentComment.replies?.length : 0)} replies`}</span>
              </div>
              <div className="flex items-center">
                {showReplies ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </div>
            </div>
          </div>

          {activeModalId === id && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  Reply to {seller.name}
                </span>
                <button
                  onClick={() => handleReplyModal(null)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <IoCloseSharp size={18} className="text-gray-500" />
                </button>
              </div>
              <InputWithIcons
                ref={replyInputRef}
                onChange={(e) => {
                  if (setMessage) {
                    setMessage(e.target.value);
                    setCurrentMsg(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (currentMsg.trim()) {
                      onClickPost();
                    }
                  }
                }}
                value={currentMsg}
                onSubmit={onClickPost}
                type="replyComment"
                placeholder={`Write your reply...`}
                icon1={<FaAt size={16} />}
                icon2={<FaRegSmile size={16} />}
              />
            </div>
          )}
        </div>
      </div>

      {showReplies && (
        <div className={parent_comment_id === null ? "ml-10" : ""}>
          {replies?.map((item, index: number) => {
            return (
              <CommentItem
                key={`replies-${index.toString()}`}
                rootId={parentComment.id}
                handleLikeComment={handleLikeComment}
                handleSubmitReply={handleSubmitReply}
                parentComment={item}
                setMessage={setMessage}
                activeModalId={activeModalId}
                handleReplyModal={handleReplyModal}
              />
            );
          })}
        </div>
      )}

      {showReplies && hasMore && parent_comment_id === null && (
        <p
          className="w-[100px] text-[#606060] ml-[60px] cursor-pointer text-[14px] hover:text-[#9a5cf2]"
          onClick={fectchMoreReplies}
        >
          Load More...
        </p>
      )}

      {parent_comment_id === null && (
        <div className="border-b-2 border-gray mt-2" />
      )}
    </>
  );
};
