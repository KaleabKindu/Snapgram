"use client";
import Loader from "@/components/common/Loader";
import { useGetUsersQuery } from "@/lib/react-query/queries";
import Error from "@/components/common/Error";
import NoPosts from "@/components/common/NoPosts";
import Image from "next/image";
import { Models } from "appwrite";
import { Button } from "@/components/ui/button";
import { Routes } from "../../../../Routes";
import Link from "next/link";
type Props = {};

const Users = (props: Props) => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <>
          <h3 className="h3-bold md:h2-bold text-left w-full">Users</h3>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Error />
          ) : users && users.documents.length > 0 ? (
            <div className="grid-container">
              {users.documents.map((user) => (
                <UserCard user={user} />
              ))}
            </div>
          ) : (
            <NoPosts message="No Users" />
          )}
        </>
      </div>
    </div>
  );
};

type UserProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserProps) => {
  return (
    <Link href={`${Routes.Profile}/${user.$id}`}>
      <div className="user-card">
        <div className="relative w-14 h-14 rounded-full">
          <Image
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            className="rounded-full"
            fill
            alt="Profile pic"
          />
        </div>
        <p className="text-light-3">{`@${user.username}`}</p>
        <Button className="text-white bg-primary-500">Follow</Button>
      </div>
    </Link>
  );
};
export default Users;
