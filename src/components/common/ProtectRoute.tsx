"use client";
import { useAuthContext } from "@/context/authContext";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { Routes } from "@/../Routes";

type Props = {
  children: ReactNode;
};

const ProtectRoute = ({ children }: Props) => {
  const router = useRouter();
  const { setSession } = useAuthContext();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setSession({
            id: currentUser.$id,
            name: currentUser.name,
            username: currentUser.username,
            email: currentUser.email,
            imageUrl: currentUser.imageUrl,
            imageId: currentUser.imageId,
            bio: currentUser.bio,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    const session = localStorage.getItem("cookieFallback");
    if (!session) {
      router.push(Routes.SignIn);
    }
    checkAuthStatus();
  }, []);
  return <div>{children}</div>;
};

export default ProtectRoute;
