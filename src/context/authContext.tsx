"use client";
import { getCurrentUser } from "@/lib/appwrite/api";
import { IAuthContext } from "@/types";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Routes } from "../../Routes";
import { Models } from "appwrite";

export const AuthContext = createContext<IAuthContext>({
  session: {},
  setSession: () => {},
});

type Props = {
  children: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();
  const [session, setSession] = useState<Models.Document>();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setSession(currentUser);
        } else {
          setSession(undefined);
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
