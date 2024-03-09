"use client";

import { useGetRecentPostQuery } from "@/lib/react-query/queries";
import PostCard from "./PostCard";
import Loader from "../common/Loader";
import Error from "../common/Error";
import NoPosts from "../common/NoPosts";

type Props = {};

const PostFeed = (props: Props) => {
  const { data: posts, isPending, isError } = useGetRecentPostQuery();
  return (
    <>
      {isPending ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : posts && posts.length > 1 ? (
        posts.map((post, index) => <PostCard key={index} post={post} />)
      ) : (
        <NoPosts />
      )}
    </>
  );
};

export default PostFeed;
