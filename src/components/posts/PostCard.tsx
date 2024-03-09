import { Models } from "appwrite";
import Link from "next/link";
import { Routes } from "../../../Routes";
import Image from "next/image";
import moment from "moment";
import { BiEdit } from "react-icons/bi";
import { useAuthContext } from "@/context/authContext";
import PostAction from "./PostAction";

type Props = {
  post: Models.Document;
};

const PostCard = ({ post }: Props) => {
  const { session } = useAuthContext();
  return (
    <div className="post-card">
      <Link
        href={`${Routes.Profile}/${post.creator?.id}`}
        className="flex items-center gap-3"
      >
        <div className="relative w-14 h-14 rounded-full">
          <Image
            src={
              post.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"
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
        {session?.id === post.creator?.id && (
          <Link href={`${Routes.UpdatePost}/${post.$id}`} className="ml-auto">
            <BiEdit size={30} className="text-primary-500" />
          </Link>
        )}
      </Link>
      <Link href={`${Routes.Posts}/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <Image
          className="post-card_img"
          src={post.imageUrl}
          width={300}
          height={500}
          alt={post.caption}
        />
      </Link>
      <PostAction post={post} />
    </div>
  );
};

export default PostCard;
