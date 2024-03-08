import { ICredentials, INewPost, INewUser } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, createUser, deleteSavedPost, likePost, savePost, signIn, signOut } from '../appwrite/api'
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