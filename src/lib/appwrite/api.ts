import { ICredentials, INewPost, INewUser, IPost } from "@/types";
import { account, avatars, storage } from "./config";
import { ID, Query } from "appwrite";
import { IUser } from "@/types";
import { appwriteconfig, databases } from "./config";

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


export const signIn = async ({email, password}:ICredentials) => {
    try {
        const session = await account.createEmailSession(email, password)
        const user = await getCurrentUser()
        return session
    } catch (error:any) {
        throw Error(error.message)
    }
}
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error:any) {
        throw Error(error.message)
    }
}

export const getSession = async () => {
    try {
        const user = await account.get()
        if(!user) throw Error

        return user
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const user = await account.get()
        if(!user) throw Error

        const response = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.userCollctionId,
            [
                Query.equal('id', user.$id)
            ]
        )

        return response.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const createPost = async (post:INewPost) => {
    try {
        const uploadedFile = await uploadFile(post.photo[0])

        if(!uploadedFile) throw Error;

        const imageUrl = await getFilePreviewUrl(uploadedFile?.$id as string)

        if(!imageUrl){
            await deleteFile(uploadedFile.$id as string)
            throw Error
        }
        const payload:IPost = {
            creator:post.creator as string,
            caption:post.caption,
            imageUrl:imageUrl as URL,
            imageId:uploadedFile?.$id as string,
            location:post.location,
            tags:post.tags.split(',')
        }
        const newPost = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.postCollectionId,
            ID.unique(),
            payload
        )
        return newPost
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async (file:File) => {
    try {
        const uploadedFile = await storage.createFile(appwriteconfig.storageId, ID.unique(), file)

        if(!uploadedFile) throw Error;

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

export const getFilePreviewUrl = async (id:string) => {
    try {
        const previewUrl = storage.getFilePreview(appwriteconfig.storageId, id)

        if(!previewUrl) throw Error;

        return previewUrl
    } catch (error) {
        console.log(error)
    }
}

export const deleteFile = async (id:string) => {
    try {
        await storage.deleteFile(appwriteconfig.storageId, id)

    } catch (error) {
        console.log(error)
    }
}