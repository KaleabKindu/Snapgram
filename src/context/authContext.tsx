"use client";
import { IAuthContext, IUser } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";

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
  const [session, setSession] = useState<IUser>(INITIAL_SESSION);

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
