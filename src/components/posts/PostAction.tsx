import { Models } from "appwrite";
import { useAuthContext } from "@/context/authContext";
import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
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
  const [likes, setLikes] = useState<string[]>(
    post.likes.map((user: Models.Document) => user.$id),
  );
  const [isSaved, setIsSaved] = useState(false);
  const { mutateAsync: likePost } = useLikePostMutation({
    postId: post.$id,
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
    const newLikes = likes.includes(session.id)
      ? likes.filter((id) => id !== session.id)
      : [...likes, session.id];
    setLikes(newLikes);
    likePost(newLikes);
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
      saved && setIsSaved(true);
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
          {likes.includes(session.id) ? (
            <FaHeart className="text-red" size={25} />
          ) : (
            <FaRegHeart size={25} />
          )}
        </Button>
        <p className="small-medium lg:base-medium">{likes.length}</p>
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
