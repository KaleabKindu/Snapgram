import { useGetUserLikedPostsQuery } from "@/lib/react-query/queries";
import React from "react";
import Loader from "../common/Loader";
import GridPostList from "./GridPostList";
import NoPosts from "../common/NoPosts";
import Error from "../common/Error";

type Props = {
  userId: string;
};

const LikedPosts = ({ userId }: Props) => {
  const {
    data: likedPosts,
    isLoading,
    isError,
  } = useGetUserLikedPostsQuery(userId);
  return (
    <div className="explore-inner_container">
      <>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : likedPosts && likedPosts.documents.length > 0 ? (
          <GridPostList
            posts={likedPosts.documents.map((tmp) => tmp.post)}
            showActions={false}
          />
        ) : (
          <NoPosts message="No Liked Posts" />
        )}
      </>
    </div>
  );
};

export default LikedPosts;
