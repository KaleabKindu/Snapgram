"use client";
import { getCurrentUser } from "@/lib/appwrite/api";
import { IAuthContext, IUser } from "@/types";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Routes } from "../../Routes";

const INITIAL_SESSION = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  imageId: "",
  bio: "",
};

export const AuthContext = createContext<IAuthContext>({
  session: INITIAL_SESSION,
  setSession: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState<IUser>(INITIAL_SESSION);
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
        } else {
          setSession(INITIAL_SESSION);
          router.push(Routes.SignIn);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkAuthStatus();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session: session,
        setSession: setSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);
