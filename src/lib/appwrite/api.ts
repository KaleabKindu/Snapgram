import { INewUser } from "@/types";
import { account, avatars } from "./config";
import { ID } from "appwrite";
import { saveUserToDB } from "./db";

export const createUser = async (user:INewUser) => {
    try {
        const newUser = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        if(!newUser) throw Error;
        const avatarUrl = avatars.getInitials(user.name)
       const savedUser = await saveUserToDB({
            id:newUser.$id,
            name:newUser.name,
            username:user.username,
            email:newUser.email,
            imageUrl:avatarUrl,
            bio:''
        })
        return savedUser
    } catch (error:any) {
        throw Error(error.message)
    }
}