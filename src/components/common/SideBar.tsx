"use client";
import { useEffect } from "react";
import { Routes } from "../../../Routes";
import Link from "next/link";
import Image from "next/image";
import { useSignOutMutation } from "@/lib/react-query/mutations";
import { useAuthContext } from "@/context/authContext";
import { useRouter, usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
import classNames from "classnames";
import { IoLogOutOutline } from "react-icons/io5";

type Props = {};

const SideBar = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const { session } = useAuthContext();
  const { mutateAsync: signOut, isSuccess } = useSignOutMutation();
  useEffect(() => {
    if (isSuccess) {
      router.push(Routes.SignIn);
    }
  }, [isSuccess]);
  return (
    <div className="leftsidebar h-screen">
      <div className="flex flex-col gap-10">
        <Link href={Routes.Home}>
          <Image
            src="/assets/images/logo.svg"
            width={170}
            height={36}
            alt="logo"
          />
        </Link>
        <Link
          href={`${Routes.Profile}/${session.id}`}
          className="flex items-center gap-3"
        >
          <div className="relative w-14 h-14 rounded-full">
            <Image
              src={session.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className="rounded-full object-cover"
              fill
              alt="Profile pic"
            />
          </div>
          <div className="flex flex-col">
            <div className="body-bold">{session.name}</div>
            <div className="small-regular text-light-3">
              @{session.username}
            </div>
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const Icon = link.icon;
            const active = path === link.route;
            return (
              <li
                key={link.route}
                className={classNames("leftsidebar-link", {
                  "bg-primary-500": active,
                })}
              >
                <Link
                  href={link.route}
                  className="flex group gap-4 items-center p-3"
                >
                  <Icon size={30} />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost p-3"
        onClick={() => signOut()}
      >
        <IoLogOutOutline size={30} />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </div>
  );
};

export default SideBar;
