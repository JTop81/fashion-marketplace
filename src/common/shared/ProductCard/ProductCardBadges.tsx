import { useCallback, useEffect, useState } from "react";
import { Chat, Edit } from "react-iconly";
import { BsBookmarkDash, BsBookmarkDashFill } from "react-icons/bs";
import { FaEtsy, FaHeart, FaShopify } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { createActivity } from "api/services/post-activities";
import {
  ActivityType,
  TargetActivityType,
} from "api/services/post-activities/interfaces/activities-response.interface";
import { IPost } from "api/services/posts/interfaces/post.interface";
import { PlatformType } from "api/services/posts/interfaces/post-response.interface";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";
import ShareComponent from "common/components/Share";
import useStoredSavedPost from "setup/store/activities";
import useStoredPosts from "setup/store/posts";

import ProductIcons from "./ProductCardIcons";

const ProductCardBadges = ({
  post,
  isCreator,
  statistics,
  actionStyle,
}: {
  post: IPost;
  isCreator: boolean;
  statistics: IStatistics;
  actionStyle?: string;
}) => {
  const { updateStoredPosts } = useStoredPosts();
  const { deleteStoredSavedPost } = useStoredSavedPost();
  const [isLiked, setIsLiked] = useState(
    post.statistics?.current_user?.reactions === 1,
  );
  const [isSaved, setIsSaved] = useState(
    post.statistics?.current_user?.saves === 1,
  );
  const [loading, setLoading] = useState(false); // New loading state

  const makeActivity = useCallback(
    async (type: ActivityType, id: string | null) => {
      try {
        await createActivity({
          target_id: id === null ? post.id : id,
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
            ...post,
            statistics: {
              ...post.statistics,
              total: {
                ...post.statistics.total,
                reactions:
                  post.statistics.current_user.reactions !== 1
                    ? post.statistics.total.reactions + 1
                    : post.statistics.total.reactions - 1,
              },
              current_user: {
                ...post.statistics.current_user,
                reactions:
                  post.statistics.current_user.reactions !== 1
                    ? post.statistics.current_user.reactions + 1
                    : post.statistics.current_user.reactions - 1,
              },
            },
          });
          setIsLiked(!isLiked);
        }
        if (type === ActivityType.SAVE) {
          updateStoredPosts({
            ...post,
            statistics: {
              ...post.statistics,
              total: {
                ...post.statistics.total,
                saves:
                  post.statistics.current_user.saves !== 1
                    ? post.statistics.total.saves + 1
                    : post.statistics.total.saves - 1,
              },
              current_user: {
                ...post.statistics.current_user,
                saves:
                  post.statistics.current_user.saves !== 1
                    ? post.statistics.current_user.saves + 1
                    : post.statistics.current_user.saves - 1,
              },
            },
          });
          if (id === null && type === "save") {
            if (isSaved) {
              deleteStoredSavedPost(post.id);
            } else {
              const customEvent = new CustomEvent("addSavedPostInList", {
                detail: { id: post.id },
              });
              window.dispatchEvent(customEvent);
            }
          }
          setIsSaved(!isSaved);
        }
        setLoading(false);
      }
    },
    [deleteStoredSavedPost, isLiked, isSaved, post, updateStoredPosts],
  );

  const handleLike = useCallback(
    async ({ id = null }: { id?: string | null }) => {
      if (loading) return;
      setLoading(true);
      await makeActivity(ActivityType.REACTION, id);
    },
    [loading, makeActivity],
  );

  const handleSave = useCallback(
    async ({ id = null }: { id?: string | null }) => {
      if (loading) return;
      setLoading(true);
      await makeActivity(ActivityType.SAVE, id);
    },
    [loading, makeActivity],
  );

  useEffect(() => {
    const eventhandler = (event: Event) => {
      if (event instanceof CustomEvent) {
        if (post.id === event.detail.id) {
          handleSave(event.detail.id);
        }
      }
    };

    window.addEventListener("removeSavedItemInList", eventhandler);

    return () => {
      window.removeEventListener("removeSavedItemInList", eventhandler);
    };
  }, [handleSave, post.creator.user_id, post.id]);

  return (
    <div className={`mt-4 lg:mt-0 w-full lg:w-[10%] ${actionStyle}`}>
      <div className="flex lg:block flex-wrap items-center gap-5 space-y-0 lg:space-y-2">
        <ProductIcons
          detail={statistics?.total?.reactions || 0}
          onClick={handleLike}
        >
          {statistics?.current_user?.reactions === 1 ? (
            <FaHeart color="#9334eb" size={18} />
          ) : (
            <FiHeart size={18} />
          )}
        </ProductIcons>
        <ProductIcons detail={statistics?.total?.comments || 0}>
          <Chat size={24} />
        </ProductIcons>
        <ProductIcons detail="Share">
          <ShareComponent
            url={window.location.origin + "/post/" + post.id}
            title={post.details?.title || ""}
            description={post.details?.description || ""}
            iconSize={24}
            className="!p-0"
          />
        </ProductIcons>
        <div className="!my-2 opacity-10 border hidden lg:block" />
        {!isCreator && (
          <>
            <ProductIcons detail="Save" onClick={handleSave}>
              {statistics?.current_user?.saves === 1 ? (
                <BsBookmarkDashFill color="#3b8bf1" size={18} />
              ) : (
                <BsBookmarkDash size={18} />
              )}
            </ProductIcons>
            {post.details && "platform" in post.details && (
              <ProductIcons
                detail="Buy Now"
                onClick={() => {
                  if (post.details && "url" in post.details) {
                    const url = post.details.url;
                    window.open(url, "_blank");
                  }
                }}
              >
                {post.details.platform === PlatformType.ETSY ? (
                  <FaEtsy color="#f1641e" />
                ) : (
                  <FaShopify color="#94bf45" />
                )}
              </ProductIcons>
            )}
          </>
        )}
        {isCreator && (
          <Link to={`/post/create?id=${post.id}`}>
            <ProductIcons detail="Edit" secondaryBg>
              <Edit size={24} primaryColor="#ffffff" />
            </ProductIcons>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductCardBadges;
