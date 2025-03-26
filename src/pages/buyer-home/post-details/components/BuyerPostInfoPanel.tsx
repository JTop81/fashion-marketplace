import { useCallback, useEffect, useRef, useState } from "react";
import { Chat } from "react-iconly";
import { BsBookmarkDash, BsBookmarkDashFill } from "react-icons/bs";
import { FaEtsy, FaHeart, FaShopify } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { TbShare3 } from "react-icons/tb";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { createActivity, getActivities } from "api/services/post-activities";
import {
  ActivityType,
  TargetActivityType,
} from "api/services/post-activities/interfaces/activities-response.interface";
import { IPost } from "api/services/posts/interfaces/post.interface";
import {
  IPostActivitiesResponse,
  PlatformType,
  PostType,
} from "api/services/posts/interfaces/post-response.interface";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";
import { toCapitalize } from "common/util/helpers";
import useStoredPosts from "setup/store/posts";
import DropDownType from "types/productDropDown";

import ProductIcons from "pages/seller-home/posts/components/productDetails/ProductIcons";
import ProductInfo from "pages/seller-home/posts/components/productDetails/ProductInfo";
import SelectItem from "pages/seller-home/posts/components/productDetails/SelectItem";

import {
  updateCommentStatistics,
  useCommentStore,
  useConvertItemData,
} from "../hooks/comment";
import { useRelated } from "../hooks/related";
import { Comment } from "../types/comment";

import { CommentList } from "./Comment/CommentList";
import ProductPostType from "./PostTypeAction/ProductPostType";
import CommentOverlay from "./CommentOverlay";
import { ProductAction } from "./ProductAction";
import { RelatedProducts } from "./RelatedProducts";
import { SellerActions } from "./SellerActions";

interface BuyerPostInfoPanelProps {
  post: IPost;
  dropDown: DropDownType[];
  statistics: IStatistics;
  initial: boolean;
  setInitial: (v: boolean) => void;
  commentsRef?: React.RefObject<HTMLDivElement>;
  isCreator?: boolean;
}

const BuyerPostInfoPanel: React.FC<BuyerPostInfoPanelProps> = ({
  dropDown,
  isCreator,
}) => {
  const { updateStoredPosts, setPostDetails, postDetails } = useStoredPosts();
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
  const [selectOption, setSelectOption] = useState("Comments");
  const related = useRelated(postDetails.id);

  const [message, setMessage] = useState("");
  const [addCommentsCount, setAddCommentCount] = useState<number>(0);
  const [replyMessage, setReplyMessage] = useState("");
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [count, setCount] = useState<number>(0);

  const [isLiked, setIsLiked] = useState(
    postDetails.statistics?.current_user.reactions === 1,
  );
  const [isSaved, setIsSaved] = useState(
    postDetails.statistics?.current_user.saves === 1,
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
    staleTime: 1000 * 60 * 5,
    enabled: postDetails.id != null,
    retry: 1,
  });

  useEffect(() => {
    if (rawData && postDetails.id !== currentId) {
      clearComments();
      const data = rawData.items.map((item: IPostActivitiesResponse) =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useConvertItemData(item),
      );
      setCursor(rawData.cursor);
      setComments(data, rawData.cursor || currentCursor, postDetails.id);
      setHasMore(rawData.items.length != 0);
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
      if (isMoreLoading) return; // Prevent multiple simultaneous loads
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
        setCursor(rawData.cursor);
        setComments(response, rawData.cursor || currentCursor, postDetails.id);
        setHasMore(response.length === commentLimit);
      } catch (error) {
        console.error("Error loading more comments:", error);
        toast.error("Error loading more comments");
      } finally {
        setIsMoreLoading(false);
      }
    },
    [currentCursor, postDetails.id, setComments, isMoreLoading],
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        hasMore &&
        !isMoreLoading &&
        cursor // Only fetch more if we have a cursor
      ) {
        fetchLoadMore(cursor);
      }
    },
    [cursor, fetchLoadMore, hasMore, isMoreLoading],
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const MAX_COMMENT_LENGTH = 1000;

  const sendMessage = useCallback(
    async (id: string): Promise<Comment | undefined> => {
      const isRootComment = id === "";
      const sendMsg = isRootComment ? message : replyMessage;

      if (!sendMsg.trim()) {
        setCommentError("Please enter a comment");
        return;
      }

      if (sendMsg.length > MAX_COMMENT_LENGTH) {
        setCommentError(
          `Comment must be less than ${MAX_COMMENT_LENGTH} characters`,
        );
        return;
      }

      setIsSubmitting(true);
      setCommentError("");

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
        } catch (error) {
          setCommentError("Failed to post comment. Please try again.");
        } finally {
          setIsSubmitting(false);
        }
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
          setPostDetails({
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
          setPostDetails({
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
    [isLiked, isSaved, postDetails, setPostDetails],
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

  const handleSave = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    await makeActivity(ActivityType.SAVE);
  }, [loading, makeActivity]);

  const handleLikeComment = useCallback(
    async (comment_id: string, updatedStatistics: IStatistics) => {
      if (loading) return;
      setLoading(true);
      try {
        await reactionActivity(ActivityType.REACTION, comment_id);
        const updatedComments = updateCommentStatistics(
          comment_id,
          comments,
          updatedStatistics,
        );
        // Pass undefined as cursor to indicate this is an update, not pagination
        setComments(updatedComments, undefined, postDetails.id);
      } catch (error) {
        // If the API call fails, revert the optimistic update
        const revertedComments = updateCommentStatistics(comment_id, comments, {
          ...updatedStatistics,
          total: {
            ...updatedStatistics.total,
            reactions:
              updatedStatistics.current_user.reactions === 1
                ? updatedStatistics.total.reactions - 1
                : updatedStatistics.total.reactions + 1,
          },
          current_user: {
            ...updatedStatistics.current_user,
            reactions: updatedStatistics.current_user.reactions === 1 ? 0 : 1,
          },
        });
        setComments(revertedComments, undefined, postDetails.id);
      } finally {
        setLoading(false);
      }
    },
    [comments, loading, postDetails.id, reactionActivity, setComments],
  );

  return (
    <div className="p-5" key={postDetails.id}>
      <div className="bg-white lg:bg-gray p-0 lg:p-4 rounded-md">
        <ProductInfo dropDown={dropDown} post={postDetails} isCreator={isCreator} />
        <div className="flex flex-row gap-x-5 mt-6">
          {postDetails.type === PostType.PRODUCT && <ProductPostType />}
        </div>
        {postDetails.type === PostType.EXTERNAL && (
          <div className="flex flex-row ml-auto md:w-full md:flex-col md:mx-auto mt-6">
            <ProductAction
              onClick={() => {
                if (postDetails.details && "url" in postDetails.details) {
                  const url = postDetails.details.url;
                  window.open(url, "_blank");
                }
              }}
              variant="contained"
              className="px-4 py-3 rounded-md bg-secondary text-white font-medium flex justify-center items-center h-14 md:h-fit"
              action={`Buy on ${postDetails.details && "platform" in postDetails.details ? toCapitalize(postDetails.details.platform) : ""}`}
              icon={
                postDetails.details &&
                "platform" in postDetails.details &&
                postDetails.details.platform === PlatformType.ETSY ? (
                  <FaEtsy color="#f1641e" />
                ) : (
                  <FaShopify color="#94bf45" />
                )
              }
            />
          </div>
        )}
      </div>
      <SellerActions className="px-0 lg:px-3 md:w-full mx-4 md:mr-8 md:mx-auto mt-6" />
      <p className="border my-6 opacity-10" />
      <div className="items-center gap-4 flex-wrap flex w-full md:w-1/2 justify-between">
        <ProductIcons
          detail={postDetails.statistics?.total.reactions}
          onClick={handleLike}
        >
          {postDetails.statistics?.current_user.reactions === 1 ? (
            <FaHeart color="#9334eb" size={18} />
          ) : (
            <FiHeart size={18} />
          )}
        </ProductIcons>
        <ProductIcons
          detail={
            postDetails.statistics?.total.comments + addCommentsCount || "0"
          }
        >
          <Chat size={25} />
        </ProductIcons>
        <ProductIcons detail="Save" onClick={handleSave}>
          {postDetails.statistics?.current_user.saves === 1 ? (
            <BsBookmarkDashFill color="#3b8bf1" size={18} />
          ) : (
            <BsBookmarkDash size={18} />
          )}
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
              postDetails.statistics?.total.comments + addCommentsCount || 0,
          },
          { title: "Items you may like" },
          { title: "Other items from seller" },
        ]}
      />
      <div>
        <div className={`mt-5`}>
          {selectOption === `Comments` ? (
            <div className="flex flex-col gap-y-5 mb-5">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                <CommentOverlay
                  ref={commentInputRef}
                  onChange={(e) => {
                    setMessage(
                      (e.target as EventTarget & HTMLInputElement).value,
                    );
                    setCommentError("");
                  }}
                  value={message}
                  disabled={isSubmitting}
                  atClick={function (): void {
                    // TODO: Implement @ mentions
                  }}
                  emojiClick={function (): void {
                    // TODO: Implement emoji picker
                  }}
                  fileClick={function (): void {
                    // TODO: Implement file upload
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage("");
                  }}
                />
                {commentError && (
                  <p className="text-red-500 text-sm px-4 py-2">
                    {commentError}
                  </p>
                )}
                <div className="flex justify-between items-center px-4 py-2 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {message.length}/{MAX_COMMENT_LENGTH} characters
                  </span>
                  {isSubmitting && (
                    <span className="text-sm text-gray-500">Posting...</span>
                  )}
                </div>
              </div>

              <div className="w-full">
                {!comments || (!comments.length && isMoreLoading) ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                  </div>
                ) : comments.length > 0 ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Comments (
                        {postDetails.statistics?.total.comments +
                          addCommentsCount || 0}
                        )
                      </h3>
                      <select
                        className="text-sm text-gray-500 bg-transparent border-none focus:ring-0"
                        onChange={(e) => {
                          // TODO: Implement comment sorting
                          console.log(e.target.value);
                        }}
                      >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                      </select>
                    </div>
                    <div className="space-y-4">
                      <CommentList
                        handleSubmitReply={sendMessage}
                        handleLikeComment={handleLikeComment}
                        setMessage={(value) => setReplyMessage(value)}
                        key="root"
                        comments={comments}
                      />
                      {/* Load more indicator */}
                      {hasMore && (
                        <div ref={observerRef} className="py-4">
                          {isMoreLoading && (
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No comments yet. Be the first to comment!
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <RelatedProducts products={related} />
          )}
        </div>
      </div>
    </div>
  );
};

export { BuyerPostInfoPanel };
