"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Routes } from "../../../Routes";
import { ClipLoader } from "react-spinners";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/authContext";
import FileUpload from "../common/FileUpload";
import { Models } from "appwrite";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/lib/react-query/mutations";
import { useState, useEffect } from "react";

const formSchema = z.object({
  caption: z.string().max(2200, {
    message: "Caption must be less than 2200 characters",
  }),
  photo: z.custom<File[]>(),
  location: z.string().max(2200, {
    message: "Location must be less than 2200 characters",
  }),
  tags: z.string(),
});

type Props = {
  post?: Models.Document;
};

const CreatePostForm = ({ post }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { session } = useAuthContext();
  const { mutateAsync: createPost, isPending: creating } =
    useCreatePostMutation();
  const { mutateAsync: updatePost, isPending: updating } =
    useUpdatePostMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      caption: post?.caption || "",
      photo: [],
      location: post?.location || "",
      tags: post?.tags.join(",") || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let newPost;
      if (post) {
        newPost = await updatePost({
          id: post.$id,
          imageUrl: post.imageUrl,
          imageId: post.imageId,
          ...values,
        });
      } else {
        newPost = await createPost({ creator: session.id, ...values });
      }
      form.reset();
      router.push(`${Routes.Posts}/${newPost?.$id}`);
    } catch (error) {
      toast({
        title: "Failed to Create Post",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
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
                <FileUpload
                  imageUrl={post?.imageUrl}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
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
                <Input
                  placeholder="Enter Location"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="JS, Python, Golang, Java"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={creating || updating}
          className="self-end shad-button_primary"
        >
          {creating || updating ? (
            <ClipLoader size={30} />
          ) : post ? (
            "Edit Post"
          ) : (
            "Create Post"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePostForm;
