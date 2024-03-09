import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import {
  getInfinitePosts,
  getPostById,
  getRecentPosts,
  searchPosts,
} from "../appwrite/api";

export const useGetRecentPostQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useGetPostByIdQuery = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
  });
};

export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: getInfinitePosts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage && lastPageParam >= lastPage?.total) {
        return null;
      }
      return lastPageParam + 20;
    },
  });
};

export const useGetSearchPosts = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS, query],
    queryFn: () => searchPosts(query),
  });
};
