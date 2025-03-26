import { useCallback, useEffect, useRef, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDeleteForever, MdDynamicFeed } from "react-icons/md";
import { RiSparklingLine } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import {
  createSession,
  deleteAllSessions,
  deleteSession,
  getMessages,
  postMessage,
} from "api/services/ai-search";
import {
  IMessages,
  IPostMessage,
  PostMessageData,
  SenderType,
} from "api/services/ai-search/interfaces/ai-search.interface";
import { IProductDetails } from "api/services/posts/interfaces/post-response.interface";
import { SearchBar } from "common";
import AIDropDown from "common/components/AISearchBox/AIDropDown";
import { useAuthStore } from "setup/store/auth/authStore";
import { formatTimeAgo } from "utils/formatTime";
import { v4 as uuid } from "uuid";

import HistoricalSearches from "../HistoricalSearches";
import SearchSuggestions from "../SearchSuggestions";
import { useAiSearchStore } from "../store";

const dropDownHisClearAll = [
  {
    icon: MdDeleteForever,
    title: "Clear All History",
  },
];

const dropDownHisClearSession = [
  {
    icon: MdDeleteForever,
    title: "Clear Session",
  },
];

const titleArr = [
  "Elegant Earrings",
  "Stylish Jacket",
  "SB Liam Overcoat",
  "Silk Oxford BD Shirt",
  "New Liam Pant",
  "Boater Stripe Crewneck Sweater",
  "TVR ROLLNECK SWEATER",
];

const AdvancedAiSearch = () => {
  const {
    sessionId,
    setSessionId,
    messages,
    setHisArr,
    hisArr,
    setMessages,
    clearMessages,
    setCurrentCursor,
    currentCursor,
  } = useAiSearchStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isRetryLoading, setIsRetryLoading] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const mutation = useMutation({
    mutationFn: async (messageData: PostMessageData) => {
      return postMessage(messageData);
    },
    onMutate: async () => {
      setIsLoading(true); // Start loading
      return { previousMessages: messages };
    },
    onSuccess: async (data: IPostMessage) => {
      try {
        // Fetch new messages after sending the user's message
        const res: IMessages = await getMessages(
          data.session_id,
          data.created_at,
          undefined,
          "created_at",
        );

        // Append new messages
        res.items.forEach((item) => setMessages(item));
        setCurrentCursor(res.cursor);

        if (res.cursor) {
          setHasMore(true);
        }

        setNewMessage("");
        setSessionId(data.session_id);
        setHasError(false);
      } catch (error) {
        setHasError(true);
        toast.error("Failed to fetch messages. Please try again.");
      } finally {
        setIsLoading(false); // Stop loading once done
      }
    },
    onError: (error, _, context) => {
      toast.error(
        "A server error occurred while posting the message. Please try again later.",
      );
      if (context?.previousMessages) {
        context.previousMessages.forEach((item) => setMessages(item));
      }

      setIsLoading(false);
      setHasError(true);
    },
  });

  const handleSend = async () => {
    if (newMessage.trim() === "" || isCreatingSession) return;

    let currentSessionId = sessionId;
    if (!currentSessionId) {
      setIsCreatingSession(true);
      try {
        const { id } = await createSession();
        setSessionId(id);
        currentSessionId = id;
      } catch (error) {
        toast.error("Failed to create a session. Please try again.");
      } finally {
        setIsCreatingSession(false);
      }
    }

    if (currentSessionId) {
      const messageData: PostMessageData = {
        message: newMessage,
        session_id: currentSessionId,
        sender: SenderType.USER,
      };
      setMessages({
        id: uuid(),
        updated_at: "",
        feeds: null,
        message: newMessage,
        session_id: currentSessionId,
        sender: SenderType.USER,
        created_at: new Date().toISOString(),
      });
      mutation.mutate(messageData);
      setNewMessage("");
    }
  };

  const getMessagesOnChange = useCallback(async () => {
    try {
      if (!sessionId || !hasMore) return;
      const res: IMessages = await getMessages(
        sessionId,
        undefined,
        currentCursor,
        "created_at",
      );
      res.items.forEach((item) => setMessages(item));
      setCurrentCursor(res.cursor);
      if (res.cursor) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasError(true);
      toast.error("Failed to fetch messages. Please try again.");
    }
  }, [currentCursor, hasMore, sessionId, setCurrentCursor, setMessages]);

  const handleRetry = async () => {
    setIsRetryLoading(() => true);
    const latItem = messages[messages.length - 1];
    try {
      const res: IMessages = await getMessages(
        sessionId,
        latItem.created_at,
        undefined,
        "created_at",
      );
      res.items.map((item) => setMessages(item));
    } catch {
      setIsRetryLoading(() => false);
      setIsLoading(() => false);
      setHasError(() => true);
      toast.error("Retry failed. Please try again later.");
    }
  };

  const handleHisClear = useCallback(async () => {
    if (isLoading) return;
    try {
      if (hisArr.length === 0) {
        toast.error("No historical searches");
        return;
      }
      await deleteAllSessions().then(() => {
        setSessionId("");
        setNewMessage("");
        clearMessages();
        setHisArr([]);
        toast.success("All sessions deleted successfully");
      });
    } catch (error) {
      toast.error("Failed to clear history. Please try again.");
    }
  }, [clearMessages, hisArr.length, isLoading, setHisArr, setSessionId]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatContainerRef.current && isAtBottom) {
      scrollToBottom();
    }
  }, [isAtBottom, messages, setIsAtBottom]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  const preventPageScroll = (event: WheelEvent) => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight === scrollHeight;
      if ((event.deltaY < 0 && atTop) || (event.deltaY > 0 && atBottom)) {
        event.preventDefault();
      }
    }
  };

  const handleUpdateFeed = useCallback(
    async (ai_search_message_id: string) => {
      setIsFocused(false);
      setIsExpanded(false);
      navigate(`/ai_search_messages/${ai_search_message_id}`);
    },
    [navigate],
  );

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        !target.isIntersecting &&
        hasMore &&
        !isLoading &&
        currentCursor !== "" &&
        currentCursor !== null
      ) {
        getMessagesOnChange();
      }
    },
    [currentCursor, getMessagesOnChange, hasMore, isLoading],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: chatContainerRef.current,
      rootMargin: "10px",
      threshold: 0.1,
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    const chatBox = chatContainerRef.current;
    if (chatBox)
      chatBox.addEventListener("wheel", preventPageScroll, { passive: false });
    return () => {
      if (chatBox) chatBox.removeEventListener("wheel", preventPageScroll);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [isExpanded]);

  const handleClearSession = useCallback(async () => {
    if (isLoading) return;
    if (sessionId === "") {
      toast.error("Not selected Session!");
      return;
    }
    try {
      await deleteSession(sessionId).then(() => {
        toast.success("session deleted successfully!");
      });
      setIsExpanded(false);
      setIsFocused(true);
      clearMessages();
    } catch (error) {
      toast.error("Internal Server Error~ please try again later!");
    }
  }, [clearMessages, isLoading, sessionId]);

  return (
    <div className="flex flex-col font-poppins p-3" ref={containerRef}>
      <div className={`flex flex-row justify-between `}>
        <div className="flex justify-start items-center">
          {isExpanded && (
            <IoIosArrowBack
              className="cursor-pointer mr-3"
              onClick={() => {
                if (!isLoading) {
                  clearMessages();
                  setIsExpanded(false);
                  setIsFocused(true);
                  setSessionId("");
                }
              }}
            />
          )}
          <RiSparklingLine size={25} className="mr-2 text-[#9f00d9] relative" />
          <span className="font-semibold">Advanced AI Search</span>
        </div>
        <div className="flex">
          <div className="flex flex-row gap-x-3">
            {isExpanded && (
              <AIDropDown
                dropDown={dropDownHisClearSession}
                handleRemove={handleClearSession}
              />
            )}
            {isFocused && (
              <AIDropDown
                dropDown={dropDownHisClearAll}
                handleRemove={handleHisClear}
              />
            )}
            {isFocused || isExpanded ? (
              <IoClose
                className="cursor-pointer w-[24px] h-[24px]"
                onClick={() => {
                  if (!isLoading) {
                    setIsExpanded(false);
                    setIsFocused(false);
                  }
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className={`flex flex-col max-h-[400px] overflow-y-auto transition-all min-w-[100px] duration-300 mt-1 `}
      >
        {messages.length > 0 &&
          isExpanded &&
          messages.map((message: IPostMessage) => (
            <div key={message.id} className="w-full">
              <div
                className={`flex items-center ${
                  message.sender === SenderType.USER
                    ? "justify-end"
                    : "justify-start"
                } mb-2`}
              >
                <div className="flex flex-col mr-2">
                  {message.sender === SenderType.SYSTEM && (
                    <>
                      <p className="flex self-center text-[10px]">
                        {formatTimeAgo(message.created_at)}
                      </p>
                      <RiSparklingLine
                        size={21}
                        className="text-[#9f00d9] flex self-center"
                      />
                    </>
                  )}
                </div>
                <div className="flex flex-row">
                  <div
                    className={`flex items-center px-4 py-2 text-[14px] max-w-md flex-col ${
                      message.sender === SenderType.USER
                        ? "items-center bg-[#f9ecfe] rounded-full px-[10px] py-2 m-[5px]"
                        : "bg-stone-100 text-gray-800 rounded-lg rounded-bl-none"
                    }`}
                  >
                    <div className="break-words w-full flex-row flex">
                      <div>{message.message}</div>
                    </div>
                  </div>
                  {message.sender === SenderType.USER && (
                    <div className="flex flex-col items-center mr-2">
                      <p className="flex self-center text-[10px]">
                        {formatTimeAgo(message.created_at)}
                      </p>
                      <img
                        className="h-7 w-7 flex-none rounded-lg bg-gray-50"
                        src={user?.avatar?.url}
                        alt={user?.username}
                      />
                    </div>
                  )}
                </div>
              </div>

              {message.sender === SenderType.SYSTEM && (
                <>
                  <div className="grid grid-cols-2 gap-2 ml-7 w-fit">
                    {message.feeds &&
                      message.feeds.items?.length > 0 &&
                      message.feeds.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex min-w-0 gap-x-4 bg-[#f3e7ec] rounded-lg p-3 cursor-pointer"
                        >
                          <img
                            className="h-12 w-12 flex-none rounded-lg bg-gray-50"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="mt-1 truncate text-xs/3 text-gray-500">
                              {item.post.details?.title}
                            </p>
                            <p className="text-sm/6 font-semibold text-gray-900 mt-2">
                              ${(item.post.details as IProductDetails)?.price}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                  {message.feeds?.items && message.feeds?.items.length > 0 && (
                    <div className="flex items-center justify-center mt-2">
                      <button
                        className="flex bottom-3 gap-2 p-2 text-sm rounded-full border-2 border-customTextPink2 text-customTextPink2 bg-fuchsia-100"
                        onClick={() => {
                          if (!isLoading) {
                            handleUpdateFeed(message.id);
                          }
                        }}
                      >
                        <MdDynamicFeed /> Update results in feed
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        {/* loading */}
        {(hasError || isLoading || isRetryLoading) && (
          <div className="flex justify-center items-center">
            <button
              onClick={handleRetry}
              className="flex text-sm py-2 items-center gap-3 px-5 rounded-full border-none"
            >
              {isRetryLoading || isLoading ? (
                <ImSpinner2
                  className="animate-spin text-customTextPink2"
                  size={20}
                />
              ) : (
                hasError && <TfiReload size={20} className="text-blue-500" />
              )}
            </button>
          </div>
        )}

        <div ref={observerRef} className="h-[10px]" />
      </div>
      {/* Show historical Searches */}
      {isFocused && !isExpanded && !isLoading && (
        <div className="flex h-[400px] w-full border-t-[1px] overflow-y-auto pt-3 border-[#ccc] flex-col gap-y-3 text-md mt-2">
          <HistoricalSearches
            setHasMore={setHasMore}
            setIsFocused={setIsFocused}
            setIsExpanded={setIsExpanded}
            setIsBottom={setIsAtBottom}
          />
        </div>
      )}
      {/* Search box */}
      <div
        onFocus={() => {
          if (messages.length < 1) {
            setIsExpanded(false);
            setIsFocused(true);
          } else {
            if (!isExpanded && !isFocused) {
              setIsExpanded(true);
            }
          }
        }}
      >
        <SearchBar
          isLoading={isLoading}
          value={newMessage}
          setValue={setNewMessage}
          leftIcon={
            <RiSparklingLine
              size={25}
              className="mr-2 text-[#9f00d9] relative"
            />
          }
          showButton={true}
          submitButton={
            <button
              type="button"
              disabled={isLoading || hasError}
              className={`rounded-[30px] cursor-pointer ${isLoading || hasError ? "bg-blue-300" : "bg-blue-600"}  gap-2 flex flex-row items-center justify-center px-6 py-3 text-center text-[16px] text-white font-poppins font-normal`}
            >
              Generate
            </button>
          }
          placeholder={"Talk to our AI search to find what you like..."}
          handleSend={async () => {
            setIsFocused(false);
            setIsExpanded(true);
            if (!isLoading) {
              await handleSend();
            }
          }}
        />
      </div>
      {/* bottom Suggestion for searhces */}
      {(isFocused || isExpanded) && titleArr.length > 0 && (
        <SearchSuggestions
          titleArr={titleArr}
          handleClick={setNewMessage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default AdvancedAiSearch;
