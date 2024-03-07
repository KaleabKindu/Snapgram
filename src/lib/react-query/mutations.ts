import { ICredentials, INewPost, INewUser } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { createPost, createUser, signIn, signOut } from '../appwrite/api'


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
    return useMutation({
        mutationFn:(post:INewPost) => createPost(post)
    })
}