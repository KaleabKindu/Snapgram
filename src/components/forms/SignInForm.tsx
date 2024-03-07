'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Routes } from "../../../Routes"
import { useSignInMutation } from "@/lib/react-query/mutations"
import { ClipLoader } from "react-spinners"
import { useToast } from "../ui/use-toast"
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/context/authContext"
import { getCurrentUser } from "@/lib/appwrite/api"

const formSchema = z.object({
    email: z.string().email({
      message: "Email must be a valid email address",
    }),
    password: z.string().min(8, {
        message: "Password must be atleast 8 characters",
      }),
  })

type Props = {}

const SignInForm = (props: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const {session, setSession} = useAuthContext()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
  const { mutateAsync:signIn, isPending } = useSignInMutation()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const session = await signIn(values)
      if(session){
        const user = await getCurrentUser()
        setSession(user)
        router.push(Routes.Home)
        form.reset()
      }
    } catch (error:any) {
        toast({        
          title: "Sign In failed. Please try again.",
          description:error.message
        })
    }
  }
  return (
    <div className="flex justify-center items-center flex-1">
        <div className="flex flex-col flex-center sm:w-420">
            <Image src='/assets/images/logo.svg' width={200} height={100} alt='logo'/>
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login to your account</h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">Welcome back! Please enter your credentials</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 mt-4">
                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Email Address" className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter Password" type='password' className="shad-input" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <Button type="submit" disabled={isPending} className="shad-button_primary">
                        {isPending ? 
                        <ClipLoader size={30}/>:'Sign In'
                        }
                    </Button>
                    <p className="text-small-regular self-center text-light-2 mt-2 ">Don&apos;t have an account?  <Link className="text-primary-500 text-small-semibold mt-1" href={Routes.SignUp}> Sign Up</Link></p>

                </form>
            </Form>
        </div>
    </div>
  )
}

export default SignInForm