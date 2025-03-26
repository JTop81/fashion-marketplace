import React, { useCallback, useEffect, useRef, useState } from "react";
import { Chat, Wallet } from "react-iconly";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { TbShare3 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { createActivity, getActivities } from "api/services/post-activities";
import {
  ActivityType,
  TargetActivityType,
} from "api/services/post-activities/interfaces/activities-response.interface";
import { IPost } from "api/services/posts/interfaces/post.interface";
import { IPostActivitiesResponse } from "api/services/posts/interfaces/post-response.interface";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";
import useStoredPosts from "setup/store/posts";
import DropDownProps from "types/productDropDown";

import { CommentList } from "pages/buyer-home/post-details/components/Comment/CommentList";
import CommentOverlay from "pages/buyer-home/post-details/components/CommentOverlay";
import {
  useCommentStore,
  useConvertItemData,
} from "pages/buyer-home/post-details/hooks/comment";
import { Comment } from "pages/buyer-home/post-details/types/comment";

import ProductIcons from "./ProductIcons";
import ProductInfo from "./ProductInfo";
import SelectItem from "./SelectItem";

interface SellerPostInfoPanelProps {
  post: IPost;
  dropDown: DropDownProps[];
  statistics: IStatistics;
  initial: boolean;
  setInitial: (v: boolean) => void;
  commentsRef?: React.RefObject<HTMLDivElement>;
  isCreator?: boolean;
}

const SellerPostInfoPanel: React.FC<SellerPostInfoPanelProps> = ({
  dropDown,
  isCreator = false,
}) => {
  const { updateStoredPosts, postDetails } = useStoredPosts();
  const [selectOption, setSelectOption] = useState("Comments");
  const {
    comments,
    currentCursor,
    currentId,
    setComments,
    clearComments,
    addComment,
  } = useCommentStore();
  const [cursor, setCursor] = useState<string | undefined>(currentCursor);
  const [isMoreLoading, setIsMoreLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [replyMessage, setReplyMessage] = useState("");

  const [message, setMessage] = useState("");
  const [addCommentsCount, setAddCommentCount] = useState<number>(0);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [count, setCount] = useState<number>(0);

  const [isLiked, setIsLiked] = useState(
    postDetails.statistics.current_user.reactions === 1,
  );
  const [isSaved, setIsSaved] = useState(
    postDetails.statistics.current_user.saves === 1,
  );
  const [loading, setLoading] = useState(false);

  const commentLimit = 5;

  const { data: rawData } = useQuery<{
    items: IPostActivitiesResponse[];
    cursor: string;
  }>({
    queryKey: ["getActivities", postDetails.id],
    queryFn: async () => {
      return await getActivities({
        type: ActivityType.COMMENT,
        id: postDetails.id,
      });
    },
    enabled: !!postDetails.id,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (rawData && postDetails.id !== currentId) {
      clearComments();
      const data = rawData.items.map((item: IPostActivitiesResponse) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useConvertItemData(item),
      );
      const lastUpdated = rawData.cursor || undefined;
      setCursor(lastUpdated);
      setComments(
        data,
        lastUpdated === undefined ? currentCursor : lastUpdated,
        postDetails.id,
      );
      setHasMore(data.length === commentLimit);
    }
  }, [
    clearComments,
    currentCursor,
    currentId,
    postDetails.id,
    rawData,
    setComments,
  ]);

  const fetchLoadMore = useCallback(
    async (cursor?: string) => {
      setIsMoreLoading(true);
      try {
        const rawData = await getActivities({
          type: ActivityType.COMMENT,
          id: postDetails.id,
          cursor,
        });
        const response = rawData.items.map((item: IPostActivitiesResponse) =>
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useConvertItemData(item),
        );
        const lastUpdated = rawData.cursor || undefined;
        setCursor(lastUpdated);
        setComments(
          response,
          lastUpdated === undefined ? currentCursor : lastUpdated,
          postDetails.id,
        );
        setHasMore(response.length === commentLimit);
      } catch (error) {
        setIsMoreLoading(false);
      } finally {
        setIsMoreLoading(false);
      }
    },
    [currentCursor, postDetails.id, setComments],
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasMore &&
        !isMoreLoading &&
        rawData?.items.length === 5
      ) {
        fetchLoadMore(cursor);
      }
    },
    [cursor, fetchLoadMore, hasMore, isMoreLoading, rawData],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleObserver]);

  const sendMessage = useCallback(
    async (id: string): Promise<Comment | undefined> => {
      const isRootComment = id === "";
      const sendMsg = isRootComment ? message : replyMessage;
      if (sendMsg) {
        try {
          const data = {
            target_id: isRootComment ? postDetails.id : id,
            target_type: isRootComment
              ? TargetActivityType.POST
              : TargetActivityType.COMMENT,
            details: {
              type: ActivityType.COMMENT,
              content: sendMsg,
              ...(id && { parent_comment_id: id }),
            },
          };

          const res = await createActivity(data);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const realData: Comment = useConvertItemData(res);
          isRootComment && addComment(realData);
          setAddCommentCount((prev) => prev + 1);

          updateStoredPosts({
            ...postDetails,
            statistics: {
              ...postDetails.statistics,
              total: {
                ...postDetails.statistics.total,
                comments: postDetails.statistics.total.comments + count + 1,
              },
            },
          });
          setCount((prev) => prev + 1);
          setMessage("");
          setReplyMessage("");
          return realData;
        } catch (error) {}
      }
    },
    [addComment, count, message, postDetails, replyMessage, updateStoredPosts],
  );

  const makeActivity = useCallback(
    async (type: ActivityType) => {
      try {
        await createActivity({
          target_id: postDetails.id,
          target_type: TargetActivityType.POST,
          details: {
            type,
            ...(type === ActivityType.REACTION
              ? { reaction_type: "like" }
              : {}),
          },
        });
      } catch (error) {
        if (type === ActivityType.REACTION) setIsLiked(!isLiked);
        if (type === ActivityType.SAVE) setIsSaved(!isSaved);
      } finally {
        if (type === ActivityType.REACTION) {
          updateStoredPosts({
            ...postDetails,
            statistics: {
              ...postDetails.statistics,
              total: {
                ...postDetails.statistics.total,
                reactions:
                  postDetails.statistics.current_user.reactions !== 1
                    ? postDetails.statistics.total.reactions + 1
                    : postDetails.statistics.total.reactions - 1,
              },
              current_user: {
                ...postDetails.statistics.current_user,
                reactions:
                  postDetails.statistics.current_user.reactions !== 1
                    ? postDetails.statistics.current_user.reactions + 1
                    : postDetails.statistics.current_user.reactions - 1,
              },
            },
          });
          setIsLiked(!isLiked);
        }
        if (type === ActivityType.SAVE) {
          updateStoredPosts({
            ...postDetails,
            statistics: {
              ...postDetails.statistics,
              total: {
                ...postDetails.statistics.total,
                saves:
                  postDetails.statistics.current_user.saves !== 1
                    ? postDetails.statistics.total.saves + 1
                    : postDetails.statistics.total.saves - 1,
              },
              current_user: {
                ...postDetails.statistics.current_user,
                saves:
                  postDetails.statistics.current_user.saves !== 1
                    ? postDetails.statistics.current_user.saves + 1
                    : postDetails.statistics.current_user.saves - 1,
              },
            },
          });
          setIsSaved(!isSaved);
        }
        setLoading(false);
      }
    },
    [isLiked, isSaved, postDetails, updateStoredPosts],
  );

  const reactionActivity = useCallback(
    async (type: ActivityType, comment_id: string) => {
      try {
        await createActivity({
          target_id: comment_id,
          target_type: TargetActivityType.COMMENT,
          details: {
            type,
            ...(type === ActivityType.REACTION && { reaction_type: "like" }),
          },
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleLike = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    await makeActivity(ActivityType.REACTION);
  }, [loading, makeActivity]);

  const handleLikeComment = useCallback(
    async (comment_id: string) => {
      if (loading) return;
      setLoading(true);
      await reactionActivity(ActivityType.REACTION, comment_id);
    },
    [loading, reactionActivity],
  );

  return (
    <div className="p-5">
      <div className="bg-white lg:bg-gray p-0 lg:p-4 rounded-md">
        <ProductInfo
          dropDown={dropDown}
          post={postDetails}
          isCreator={isCreator}
        />
        <div className="flex items-center justify-center bg-secondary py-3 rounded text-white gap-2 mt-10 cursor-pointer w-full sm:w-5/12">
          <Wallet />
          <p>Edit</p>
        </div>
      </div>
      <p className="border my-6 opacity-10" />
      <div className="items-center gap-4 flex-wrap flex w-full md:w-5/12 justify-between">
        <ProductIcons
          detail={postDetails.statistics.total.reactions}
          onClick={handleLike}
        >
          {postDetails.statistics.current_user.reactions === 1 ? (
            <FaHeart color="#9334eb" size={18} />
          ) : (
            <FiHeart size={18} />
          )}
        </ProductIcons>
        <ProductIcons
          detail={postDetails.statistics.total.comments + addCommentsCount || 0}
        >
          <Chat size={25} />
        </ProductIcons>
        <ProductIcons detail="Share">
          <TbShare3 size={25} />
        </ProductIcons>
      </div>
      <SelectItem
        selectOption={selectOption}
        setSelectOption={setSelectOption}
        items={[
          {
            title: "Comments",
            count:
              postDetails.statistics.total.comments + addCommentsCount || 0,
          },
          { title: "Open chats" },
        ]}
      />
      <div>
        <div className={`mt-5`}>
          {selectOption === "Open chats" ? (
            comments.map((el, index: number) => (
              <div key={`chatList-${index.toString()}`}>
                {/* <ChatList
                  image={el.seller.avatar}
                  title={el.seller.name}
                  description={el.content}
                  numberofUpdate={1}
                  time={el.created_at}
                /> */}
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-y-5 mb-5">
              <CommentOverlay
                ref={commentInputRef}
                onChange={(e) =>
                  setMessage((e.target as EventTarget & HTMLInputElement).value)
                }
                value={message}
                atClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                emojiClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                fileClick={function (): void {
                  throw new Error("Function not implemented.");
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage("");
                }}
              />
              <div className="w-full">
                {comments && comments.length > 0 && (
                  <CommentList
                    handleSubmitReply={sendMessage}
                    handleLikeComment={handleLikeComment}
                    setMessage={(value) => setMessage(value)}
                    key="root"
                    comments={comments}
                  />
                )}
                <div ref={observerRef} className="mt-4" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerPostInfoPanel;
