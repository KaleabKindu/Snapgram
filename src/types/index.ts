import { Dispatch, SetStateAction } from "react";

export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: URL;
    bio: string;
  };
  
  export interface INewUser {
    name: string;
    email: string;
    username: string;
    password: string;
  };

  export interface ICredentials {
    email: string;
    password: string;
  }

  export interface IAuthContext {
    session:any,
    setSession:Dispatch<SetStateAction<any>>
  }