import { Models } from "appwrite";
import Link from "next/link";
import { Routes } from "../../../Routes";
import Image from "next/image";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { useAuthContext } from "@/context/authContext";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import PostAction from "./PostAction";
import { useDeletePostByIdQuery } from "@/lib/react-query/mutations";
import { useRouter } from "next/navigation";

type Props = {
  post: Models.Document;
};

const PostDetail = ({ post }: Props) => {
  const router = useRouter();
  const { session } = useAuthContext();
  const { mutateAsync: deletePost } = useDeletePostByIdQuery(post.$id);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      await deletePost(post.imageId);
      router.push(Routes.Home);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post_details-container">
      <div className="post_details-card">
        <div className="relative post_details-img">
          <Image
            className="post_details-img"
            src={post.imageUrl}
            fill
            alt={post.caption}
          />
        </div>
        <div className="post_details-info">
          <Link
            href={`${Routes.Profile}/${post.creator?.$id}`}
            className="flex items-center w-full gap-3"
          >
            <div className="relative w-8 h-8 lg:w-12 lg:h-12 rounded-full">
              <Image
                src={
                  post.creator?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                className="rounded-full"
                fill
                alt="Profile pic"
              />
            </div>
            <div className="flex flex-col">
              <div className="body-bold">{post.creator?.name}</div>
              <div className="small-regular text-light-3">
                <p className="subtle-semibold lg:small-regular">
                  {moment(post.$createdAt).fromNow()} - {post.location}
                </p>
              </div>
            </div>
            {session.id === post.creator?.$id && (
              <div className="flex items-center ml-auto">
                <Link href={`${Routes.UpdatePost}/${post.$id}`}>
                  <BiEdit size={30} className="text-primary-500" />
                </Link>
                <Button
                  variant="ghost"
                  className="rounded-full p-3"
                  onClick={handleDelete}
                >
                  <MdDelete
                    size={30}
                    className="text-primary-500 hover:text-red"
                  />
                </Button>
              </div>
            )}
          </Link>
          <hr className="border border-dark-4/30 w-full" />
          <div className="small-medium lg:base-medium">
            <p>{post.caption}</p>
            <ul className="flex gap-1">
              {post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <PostAction post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
