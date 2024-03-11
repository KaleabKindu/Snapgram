"use client";
import { useEffect } from "react";
import { Routes } from "../../../Routes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useSignOutMutation } from "@/lib/react-query/mutations";
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { IoLogOutOutline } from "react-icons/io5";

type Props = {};

const TopBar = (props: Props) => {
  const router = useRouter();
  const { session } = useAuthContext();
  const { mutateAsync: signOut, isSuccess } = useSignOutMutation();
  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.SignIn);
    }
  }, [isSuccess]);
  return (
    <div className="topbar">
      <div className="flex justify-between py-4">
        <Link href={Routes.Home} className="ml-3">
          <Image
            src="/assets/images/logo.svg"
            width={130}
            height={325}
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href={`${Routes.Profile}/${session.id}`}
            className="relative w-8 h-8 rounded-full"
          >
            <Image
              src={session.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className="rounded-full"
              fill
              alt="Profile pic"
            />
          </Link>
          <Button onClick={() => signOut()}>
            <IoLogOutOutline size={30} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
