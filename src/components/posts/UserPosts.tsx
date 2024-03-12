import { useGetUserPostsQuery } from "@/lib/react-query/queries";
import React from "react";
import Loader from "../common/Loader";
import GridPostList from "./GridPostList";
import NoPosts from "../common/NoPosts";
import Error from "../common/Error";

type Props = {
  userId: string;
};

const UserPosts = ({ userId }: Props) => {
  const { data: posts, isLoading, isError } = useGetUserPostsQuery(userId);
  return (
    <div className="explore-inner_container">
      <>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Error />
        ) : posts && posts.documents.length > 0 ? (
          <GridPostList posts={posts.documents} />
        ) : (
          <NoPosts message="No Posts" />
        )}
      </>
    </div>
  );
};

export default UserPosts;
