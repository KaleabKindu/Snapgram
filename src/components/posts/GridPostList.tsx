import { Models } from "appwrite";
import Link from "next/link";
import React from "react";
import { Routes } from "../../../Routes";
import Image from "next/image";
import PostAction from "./PostAction";

type Props = {
  posts: Models.Document[];
  showActions?: boolean;
};

const GridPostList = ({ posts, showActions = true }: Props) => {
  return (
    <div className="grid-container">
      {posts.map((post) => (
        <div key={post.$id} className="min-w-80 h-80 ">
          <Link
            href={`${Routes.Posts}/${post.$id}`}
            className="relative grid-post_link"
          >
            <Image className="object-cover" src={post.imageUrl} fill alt="" />
            <div className="grid-post_user">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    className="object-cover rounded-full"
                    src={post.creator.imageUrl}
                    fill
                    alt=""
                  />
                </div>
                <p className="line-clamp-1">{post.creator.name}</p>
              </div>
              {showActions && <PostAction post={post} />}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GridPostList;
