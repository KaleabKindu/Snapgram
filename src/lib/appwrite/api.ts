import { ICredentials, INewPost, INewUser, IPost, IUpdatePost } from "@/types";
import { account, avatars, storage } from "./config";
import { ID, Query } from "appwrite";
import { IUser } from "@/types";
import { appwriteconfig, databases } from "./config";

export const saveUserToDB = async (user: IUser) => {
  try {
    const newUser = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.userCollctionId,
      ID.unique(),
      user,
    );
    return newUser;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const createUser = async (user: INewUser) => {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name,
    );
    if (!newUser) throw Error;
    const avatarUrl = avatars.getInitials(user.name);
    const savedUser = await saveUserToDB({
      id: newUser.$id,
      name: newUser.name,
      username: user.username,
      email: newUser.email,
      imageUrl: avatarUrl.toString(),
      bio: "",
    });
    return savedUser;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const signIn = async ({ email, password }: ICredentials) => {
  try {
    const session = await account.createEmailSession(email, password);
    const user = await getCurrentUser();
    return session;
  } catch (error: any) {
    throw Error(error.message);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const getSession = async () => {
  try {
    const user = await account.get();
    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw Error;

    const response = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.userCollctionId,
      [Query.equal("id", user.$id)],
    );

    return response.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post: INewPost) => {
  try {
    const uploadedFile = await uploadFile(post.photo[0]);

    if (!uploadedFile) throw Error;

    const imageUrl = await getFilePreviewUrl(uploadedFile?.$id as string);

    if (!imageUrl) {
      await deleteFile(uploadedFile.$id as string);
      throw Error;
    }
    const payload: IPost = {
      creator: post.creator as string,
      caption: post.caption,
      imageUrl: imageUrl as URL,
      imageId: uploadedFile?.$id as string,
      location: post.location,
      tags: post.tags.split(","),
    };
    const newPost = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      ID.unique(),
      payload,
    );
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteconfig.storageId,
      ID.unique(),
      file,
    );

    if (!uploadedFile) throw Error;

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

export const getFilePreviewUrl = async (id: string) => {
  try {
    const previewUrl = storage.getFilePreview(appwriteconfig.storageId, id);

    if (!previewUrl) throw Error;

    return previewUrl;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (id: string) => {
  try {
    await storage.deleteFile(appwriteconfig.storageId, id);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(30)],
    );
    if (!posts) throw Error;

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (postId: string, likes: string[]) => {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      postId,
      { likes: [...likes] },
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const savePost = async (postId: string, userId: string) => {
  try {
    const saved = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.savedCollectionId,
      ID.unique(),
      { user: userId, post: postId },
    );
    if (!saved) throw Error;
    return saved;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSavedPost = async (savedId: string) => {
  try {
    const saved = await databases.deleteDocument(
      appwriteconfig.databaseId,
      appwriteconfig.savedCollectionId,
      savedId,
    );
    if (!saved) throw Error;
    return saved;
  } catch (error) {
    console.log(error);
  }
};

export const updatePostById = async (post: IUpdatePost) => {
  const hasUploadedFile = post.photo.length > 0;
  let image = {
    imageUrl: post.imageUrl,
    imageId: post.imageId,
  };

  try {
    if (hasUploadedFile) {
      const uploadedFile = await uploadFile(post.photo[0]);

      if (!uploadedFile) throw Error;

      const imageUrl = await getFilePreviewUrl(uploadedFile?.$id as string);

      if (!imageUrl) {
        await deleteFile(uploadedFile.$id as string);
        throw Error;
      }
      image = {
        imageUrl: imageUrl,
        imageId: uploadedFile.$id,
      };
    }

    const payload = {
      caption: post.caption,
      ...image,
      location: post.location,
      tags: post.tags.split(","),
    };
    const updatedPost = await databases.updateDocument(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      post.id,
      payload,
    );
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

export const deletePostById = async (postId: string, imageId: string) => {
  try {
    await databases.deleteDocument(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      postId,
    );

    await storage.deleteFile(appwriteconfig.storageId, imageId);
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = databases.getDocument(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      postId,
    );
    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
};

export const getInfinitePosts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const queries: string[] = [
    Query.orderDesc("$createdAt"),
    Query.limit(20),
    Query.offset(pageParam),
  ];
  try {
    const result = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      queries,
    );
    if (!result) throw Error;

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const searchPosts = async (query: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.postCollectionId,
      [Query.search("caption", query)],
    );
    if (!result) throw Error;

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getSavedPostsByUserId = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.savedCollectionId,
      [Query.equal("user", userId)],
    );
    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
};
