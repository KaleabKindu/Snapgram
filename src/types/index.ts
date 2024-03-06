export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: URL;
    bio: string;
  };
  
  export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
  };