'use client'
import { ReactNode } from 'react'
import { Toaster } from './components/ui/toaster'
import AuthContextProvider from './context/authContext'
import QueryProvider from './lib/react-query/QueryProvider'
type Props = {
    children:ReactNode
}
const Providers = ({children}: Props) => {
  return (
    <AuthContextProvider>
      <QueryProvider>
        {children}
        <Toaster />
      </QueryProvider>
    </AuthContextProvider>
  )
}

export default Providers