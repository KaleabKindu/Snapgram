import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

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

  export interface INavLink {
    icon:IconType,
    route:string,
    label:string
  }

  export interface INewPost {
    creator?:string,
    caption:string,
    photo:File[],
    location:string,
    tags:string
  }
  export interface IUpdatePost {
    id:string,
    caption:string,
    photo:File[],
    imageUrl?:URL,
    imageId?:string,
    location:string,
    tags:string
  }

  export interface IPost {
    creator:string,
    caption:string,
    imageUrl:URL,
    imageId:string,
    location:string,
    tags:string[]
  }