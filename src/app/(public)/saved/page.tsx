"use client";
import Loader from "@/components/common/Loader";
import GridPostList from "@/components/posts/GridPostList";
import { useGetSavedPostsQuery } from "@/lib/react-query/queries";
import Error from "@/components/common/Error";
import NoPosts from "@/components/common/NoPosts";
import { useAuthContext } from "@/context/authContext";
type Props = {};

const Saved = (props: Props) => {
  const { session } = useAuthContext();
  const { data: posts, isLoading, isError } = useGetSavedPostsQuery(session.id);
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <>
          <h3 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h3>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Error />
          ) : posts && posts.documents.length > 0 ? (
            <GridPostList
              showActions={false}
              posts={posts.documents.map((record) => record.post)}
            />
          ) : (
            <NoPosts message="No Saved Posts" />
          )}
        </>
      </div>
    </div>
  );
};

export default Saved;
