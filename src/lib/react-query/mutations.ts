import { ICredentials, INewPost, INewUser, IUpdatePost } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, createUser, deletePostById, deleteSavedPost, likePost, savePost, signIn, signOut, updatePostById } from '../appwrite/api'
import { QUERY_KEYS } from './queryKeys'


export const useCreateUserMutation = () => {
    return useMutation({
    mutationFn:(user:INewUser) => createUser(user)
})}

export const useSignInMutation = () => {
    return useMutation({
    mutationFn:(user:ICredentials) => signIn(user)
})}

export const useSignOutMutation = () => {
    return useMutation({
    mutationFn:() => signOut()
})}

export const useCreatePostMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(post:INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
            
        }
    })
}
export const useUpdatePostMutation = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(updatePost:IUpdatePost) => updatePostById(updatePost),
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, variables.id] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
        }
    })
}
export const useDeletePostByIdQuery = (postId:string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(imageId:string) => deletePostById(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
        }
    })
}
export const useLikePostMutation = ({ postId}:{postId:string }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:(likes:string[]) => likePost(postId, likes),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INFINITE_POSTS] })
        }
    })
}

export const useSavePostMutation = ({ postId, userId }:{postId:string, userId:string }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:() => savePost(postId, userId),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INFINITE_POSTS] })

        }
    })
}

export const useDeleteSavedPostMutation = ({ postId }:{ postId:string }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:(savedId:string) => deleteSavedPost(savedId),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId] }),
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_POSTS] })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_INFINITE_POSTS] })        }
    })
}