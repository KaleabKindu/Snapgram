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
import { Textarea } from "@/components/ui/textarea"

import { Routes } from "../../../Routes"
import { ClipLoader } from "react-spinners"
import { useToast } from "../ui/use-toast"
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/context/authContext"
import FileUpload from "../common/FileUpload"
import { Models } from "appwrite"
import { useCreatePostMutation } from "@/lib/react-query/mutations"

const formSchema = z.object({
    caption: z.string().max(2200,{
      message: "Caption must be less than 2200 characters",
    }),
    photo: z.custom<File[]>(),
    location: z.string().max(2200,{
      message: "Location must be less than 2200 characters",
    }),
    tags: z.string()
  })

type Props = {
  post?:Models.Document
}

const CreatePostForm = ({ post }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const {session, setSession} = useAuthContext()
  const { mutateAsync:createPost, isPending } = useCreatePostMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption:post?.caption || '',
      photo: [],
      location:post?.location || '',
      tags:post?.tags?.join(',') || ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const post = await createPost({ creator:session.$id, ...values})
      form.reset()
      router.push(`${Routes.Posts}/${post?.$id}`)
    } catch (error) {
      toast({
        title:'Failed to Create Post',
        variant:'destructive'
      })
    }
  }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 max-w-5xl  mt-4">
            <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Caption</FormLabel>
                <FormControl>
                    <Textarea className="shad-textarea custom-scrollbar" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Add Photo</FormLabel>
                <FormControl>
                    <FileUpload imageUrl={post?.imageUrl} onChange={field.onChange}/>
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Location</FormLabel>
                <FormControl>
                    <Input placeholder="Enter Location" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="shad-form_label">Add Tags (separated by comma)</FormLabel>
                <FormControl>
                    <Input placeholder="Enter Location" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="shad-form_message"/>
                </FormItem>
            )}
            />
            <Button type="submit" disabled={isPending} className="self-end shad-button_primary">
                {isPending ? 
                <ClipLoader size={30}/>:'Post'
                }
            </Button>

        </form>
    </Form>
  )
}

export default CreatePostForm