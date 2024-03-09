"use client";
import CreatePostForm from "@/components/forms/CreatePostForm";
import PostDetail from "@/components/posts/PostDetail";
import { useGetPostByIdQuery } from "@/lib/react-query/queries";
import { Models } from "appwrite";

type Props = {
  params: { id: string };
};

const Post = ({ params }: Props) => {
  const { data: post } = useGetPostByIdQuery({ postId: params.id });
  return (
    <div className="flex flex-1">{post && <PostDetail post={post} />}</div>
  );
};

export default Post;
