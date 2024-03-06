import { IUser } from "@/types";
import { appwriteconfig, databases } from "./config";
import { ID } from "appwrite";

export const saveUserToDB = async (user:IUser) => {
    try {
        const newUser = await databases.createDocument(
            appwriteconfig.databaseId, 
            appwriteconfig.userCollctionId,
            ID.unique(),
            user
        )
        return newUser
    } catch (error:any) {
        throw Error(error.message)
    }
}