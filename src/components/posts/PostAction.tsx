import { Models } from "appwrite";
import { useAuthContext } from "@/context/authContext";
import { Button } from "../ui/button";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  useDeleteSavedPostMutation,
  useLikePostMutation,
  useSavePostMutation,
} from "@/lib/react-query/mutations";

type Props = {
  post: Models.Document;
};

const PostAction = ({ post }: Props) => {
  const { session } = useAuthContext();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [isSaved, setIsSaved] = useState(false);
  const { mutateAsync: likePost } = useLikePostMutation({
    postId: post.$id,
    userId: session.id,
  });
  const { mutateAsync: savePost } = useSavePostMutation({
    postId: post.$id,
    userId: session.id,
  });

  const { mutateAsync: deleteSavedPost } = useDeleteSavedPostMutation({
    postId: post.$id,
  });
  const handleLike = (e: any) => {
    e.preventDefault();
    const likedRecord = post.likes?.find(
      (record: Models.Document) => record.user.$id === session.id,
    );
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    setIsLiked(!isLiked);
    likePost(likedRecord?.$id);
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    const savedRecord = post.saves?.find(
      (record: Models.Document) => record.user.$id === session.id,
    );
    if (isSaved) {
      setIsSaved(false);
      deleteSavedPost(savedRecord.$id);
    } else {
      setIsSaved(true);
      savePost();
    }
  };
  useEffect(() => {
    if (session) {
      const saved = post.saves?.find(
        (save: Models.Document) => save.user.$id === session.id,
      );
      const liked = post.likes?.find(
        (like: Models.Document) => like.user.$id === session.id,
      );
      saved && setIsSaved(true);
      liked && setIsLiked(true);
    }
  }, [session]);
  return (
    <div className="flex justify-between mt-auto">
      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          className="rounded-full"
          onClick={handleLike}
        >
          {isLiked ? (
            <FaHeart className="text-red" size={25} />
          ) : (
            <FaRegHeart size={25} />
          )}
        </Button>
        <p className="small-medium lg:base-medium">{likes}</p>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="rounded-full"
        onClick={handleSave}
      >
        {isSaved ? (
          <FaBookmark size={25} className="text-primary-500" />
        ) : (
          <FaRegBookmark size={25} />
        )}
      </Button>
    </div>
  );
};

export default PostAction;
