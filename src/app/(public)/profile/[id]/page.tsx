"use client";
import { useAuthContext } from "@/context/authContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { CiImageOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import UserPosts from "@/components/posts/UserPosts";
import LikedPosts from "@/components/posts/LikedPosts";
import Link from "next/link";
import { Routes } from "../../../../../Routes";
import { useGetUserByIdQuery } from "@/lib/react-query/queries";
import Loader from "@/components/common/Loader";
import Error from "@/components/common/Error";
import MobileCreatePost from "@/components/common/MobileCreatePost";

type Props = {
  params: {
    id: string;
  };
};

const Profile = ({ params }: Props) => {
  const { session } = useAuthContext();
  const { data: user, isLoading, isError } = useGetUserByIdQuery(params.id);
  return (
    <div className="flex flex-col gap-5 lg:gap-10 max-w-5xl w-full mx-auto py-5 md:py-8">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Error />
      ) : (
        user && (
          <>
            <div className="flex flex-wrap items-center gap-10 p-3 lg:p-5">
              <div className="relative w-20 lg:w-44 h-20 lg:h-44 rounded-full">
                <Image
                  src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  className="rounded-full"
                  fill
                  alt="Profile pic"
                />
              </div>
              <div className="flex flex-col">
                <div className="h3-bold lg:h1-bold">{user.name}</div>
                <div className="body-regular lg:h3-bold text-light-3">
                  @{user.username}
                </div>
                <div className="flex gap-5 justify-self-end mt-5 lg:mt-10">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-primary-500 base-semibold lg:base-semibold">
                      {user.posts.length}
                    </h3>
                    <p className="base-semibold lg:base-semibold text-light-3">
                      Posts
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <h3 className="text-primary-500 base-semibold lg:base-semibold">
                      20
                    </h3>
                    <p className="base-semibold lg:base-semibold text-light-3">
                      Followers
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <h3 className="text-primary-500 base-semibold lg:base-semibold">
                      20
                    </h3>
                    <p className="base-semibold lg:base-semibold text-light-3">
                      Following
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={`${Routes.UpdateProfile}`}
                className="self-start ml-auto"
              >
                <Button className="shad-button_dark_4">
                  <MdEdit size={20} />
                  Edit Profile
                </Button>
              </Link>
            </div>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full lg:w-[50%] grid-cols-2">
                <TabsTrigger value="posts" className="flex gap-2 items-center">
                  <CiImageOn size={25} className="text-primary-500" />
                  <p className="base-semibold">Posts</p>
                </TabsTrigger>
                <TabsTrigger value="liked" className="flex gap-2 items-center">
                  <FaRegHeart size={25} className="text-primary-500" />
                  <p className="base-semibold">Liked</p>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts" className="py-5">
                <UserPosts userId={params.id} />
              </TabsContent>
              <TabsContent value="liked" className="py-5">
                <LikedPosts userId={params.id} />
              </TabsContent>
            </Tabs>
            {session.id === params.id && <MobileCreatePost />}
          </>
        )
      )}
    </div>
  );
};

export default Profile;
