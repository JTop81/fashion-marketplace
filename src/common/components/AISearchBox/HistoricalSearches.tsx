import { useCallback, useEffect } from "react";
import { GoClock } from "react-icons/go";
import { ImSpinner2 } from "react-icons/im";
import { PiTrash } from "react-icons/pi";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSession,
  getHistoricalSearches,
  getMessages,
} from "api/services/ai-search";
import { IHistoricalSearchResponse } from "api/services/ai-search/interfaces/ai-search-response.interface";

import { useAiSearchStore } from "./store";

type HistoricalSearchesTypes = {
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBottom: React.Dispatch<React.SetStateAction<boolean>>;
};

const HistoricalSearches = ({
  setHasMore,
  setIsFocused,
  setIsExpanded,
  setIsBottom,
}: HistoricalSearchesTypes) => {
  const {
    setMessages,
    setSessionId,
    clearMessages,
    hisArr,
    setHisArr,
    setCurrentCursor,
  } = useAiSearchStore();
  const queryClient = useQueryClient();

  // Fetch historical searches
  const { data, isLoading } = useQuery({
    queryKey: ["getHistoricalSearches"],
    queryFn: getHistoricalSearches,
    retry: 1,
  });

  // Delete session mutation
  const deleteSessionMutation = useMutation({
    mutationFn: deleteSession,
    onMutate: async (deletedId: string) => {
      // Optimistic UI update: Remove the session locally before API call completes
      await queryClient.cancelQueries({ queryKey: ["getHistoricalSearches"] });
      const previousData = queryClient.getQueryData<
        IHistoricalSearchResponse[]
      >(["getHistoricalSearches"]);
      queryClient.setQueryData(
        ["getHistoricalSearches"],
        (oldData?: IHistoricalSearchResponse[]) =>
          oldData
            ? oldData.filter((item) => item.session_id !== deletedId)
            : [],
      );
      return { previousData };
    },
    onError: (_error, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["getHistoricalSearches"],
          context.previousData,
        );
      }
      toast.error("Failed to delete session. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getHistoricalSearches"] });
    },
    onSuccess: () => {
      toast.success("Session deleted successfully.");
    },
  });

  useEffect(() => {
    if (data) {
      setHisArr(data);
    }
  }, [data, setHisArr]);

  // Delete one session handler
  const deleteOneSession = useCallback(
    (id: string) => {
      deleteSessionMutation.mutate(id);
    },
    [deleteSessionMutation],
  );

  const fetchMessages = useCallback(
    async (id: string) => {
      clearMessages();
      setTimeout(async () => {
        try {
          const res = await getMessages(id);
          res.items.reverse().forEach((item) => setMessages(item));
          setCurrentCursor(res.cursor);
          setIsExpanded(true);
          setIsFocused(false);
          if (res.cursor) setHasMore(true);
        } catch {
          toast.error("Failed to fetch messages. Please try again.");
        }
      });
    },
    [
      clearMessages,
      setCurrentCursor,
      setHasMore,
      setIsExpanded,
      setIsFocused,
      setMessages,
    ],
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <ImSpinner2 className="animate-spin text-customTextPink2" size={20} />
      </div>
    );

  return (
    <>
      {hisArr &&
        hisArr.length > 0 &&
        hisArr.map((item) => (
          <div
            key={item.session_id}
            onClick={() => {
              setIsBottom(true);
              fetchMessages(item.session_id);
              setSessionId(item.session_id);
            }}
            className="flex items-center gap-y-1 gap-x-2 p-1 hover:bg-gray rounded-md cursor-pointer"
          >
            <GoClock />
            <span>{item.message}</span>
            <div className="ml-auto">
              <PiTrash
                color="gray"
                className="font-semibold"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteOneSession(item.session_id);
                }}
              />
            </div>
          </div>
        ))}
      {hisArr.length === 0 && !isLoading && (
        <div className="flex justify-center items-center">
          No search history
        </div>
      )}
    </>
  );
};
export default HistoricalSearches;
