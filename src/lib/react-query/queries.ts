import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { getRecentPosts } from "../appwrite/api"


export const useGetRecentPostQuery = () =>{ 
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn: getRecentPosts
    })
}