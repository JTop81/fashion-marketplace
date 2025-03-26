import { getFollowers, toggleFollow } from "api/services/follower";
import {
  IBuyerFollower,
  IBuyerFollowerResponse,
} from "api/services/follower/interfaces/followers.interface";
import { getStoreStats } from "api/services/store-front";
import { IStoreFrontAnalytics } from "api/services/store-front/interfaces/storefront-analytics.interface";
import { create } from "zustand";
type FollowerStore = {
  followers: IBuyerFollower[];
  setFollowers: (newFollowers: IBuyerFollower[]) => void;
  fetchFollowers: (
    id: string,
    cursor?: string,
  ) => Promise<IBuyerFollowerResponse>;
  createFollow: (id: string) => Promise<void>;
  deleteFollow: (id: string) => Promise<void>;
  stats: IStoreFrontAnalytics;
  setStats: (stats: IStoreFrontAnalytics) => void;
  fetchStats: (id: string) => Promise<IStoreFrontAnalytics>;
};
const useBuyerFollowerStore = create<FollowerStore>((set) => ({
  followers: [],
  stats: {} as const as IStoreFrontAnalytics,
  setStats: (stats) => set({ stats }),
  fetchStats: async (id: string) => {
    const response = await getStoreStats(id);
    set({ stats: response });
    return response;
  },
  fetchFollowers: async (id: string, cursor?: string) => {
    const response = await getFollowers(id, cursor);
    return response;
  },

  setFollowers: (newFollowers) =>
    set((state) => ({
      followers: [
        ...state.followers,
        ...newFollowers.filter(
          (newFollower) =>
            !state.followers.some(
              (follower) => follower.follower_id === newFollower.follower_id,
            ),
        ),
      ],
    })),

  createFollow: async (id: string) => {
    const response = await toggleFollow(id);
    await useBuyerFollowerStore.getState().fetchFollowers(id);
    return response;
  },
  deleteFollow: async (id: string) => {
    const response = await toggleFollow(id);
    return response;
  },
}));

export { useBuyerFollowerStore };
