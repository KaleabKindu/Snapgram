import { ICredentials, INewUser } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { createUser, signIn, signOut } from '../appwrite/api'


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