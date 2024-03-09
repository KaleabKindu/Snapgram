"use client";

import { useGetRecentPostQuery } from "@/lib/react-query/queries";
import PostCard from "./PostCard";

type Props = {};

const PostFeed = (props: Props) => {
  const { data: posts, isPending, isError } = useGetRecentPostQuery();
  return (
    <>{posts?.map((post, index) => <PostCard key={index} post={post} />)}</>
  );
};

export default PostFeed;
