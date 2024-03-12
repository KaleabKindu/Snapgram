"use client";
import Error from "@/components/common/Error";
import Loader from "@/components/common/Loader";
import PostDetail from "@/components/posts/PostDetail";
import { useGetPostByIdQuery } from "@/lib/react-query/queries";

type Props = {
  params: { id: string };
};

const Post = ({ params }: Props) => {
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery({ postId: params.id });
  return (
    <div className="flex flex-1">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        post && <PostDetail post={post} />
      )}
    </div>
  );
};

export default Post;
