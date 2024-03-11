"use client";
import Link from "next/link";
import { Routes } from "../../../Routes";
import { IoMdAddCircle } from "react-icons/io";
type Props = {};

const MobileCreatePost = (props: Props) => {
  return (
    <div className="md:hidden fixed bottom-28 right-5 z-50 ">
      <Link href={Routes.CreatePost}>
        <IoMdAddCircle
          size={70}
          className="text-primary-500 bg-black rounded-full m-0 p-0"
        />
      </Link>
    </div>
  );
};

export default MobileCreatePost;
