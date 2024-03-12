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
import { Textarea } from "@/components/ui/textarea";
import ClipLoader from "react-spinners/ClipLoader";
import { Input } from "../ui/input";
import ProfileUpload from "../common/ProfileUpload";
import { useAuthContext } from "@/context/authContext";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "@/lib/react-query/mutations";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Routes } from "../../../Routes";

const formSchema = z.object({
  name: z.string().max(2200, {
    message: "Name must be less than 2200 characters",
  }),
  username: z.string().max(2200, {
    message: "Username must be less than 2200 characters",
  }),
  email: z
    .string()
    .email({
      message: "Email must be a valid email address",
    })
    .max(2200),
  file: z.custom<File[]>(),
  bio: z.string().max(2200, {
    message: "Location must be less than 2200 characters",
  }),
});

type Props = {};

const EditProfileForm = (props: Props) => {
  const { session, setSession } = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: updateUser, isPending } = useUpdateUserMutation();
  const [profilePic, setProfilePic] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.name,
      username: session.username,
      email: session.email,
      file: [],
      bio: session.bio,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const updatedUser = await updateUser({
        id: session.id,
        imageUrl: session.imageUrl,
        ...values,
      });
      if (updatedUser) {
        const { $id, name, username, email, bio, imageUrl, imageId } =
          updatedUser;
        setSession({
          id: $id,
          name: name,
          username: username,
          email: email,
          imageUrl: imageUrl,
          imageId: imageId,
          bio: bio,
        });
      }
      form.reset();
      router.push(`${Routes.Profile}/${session.id}`);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to Update Profile",
        variant: "destructive",
      });
    }
  }
  useEffect(() => {
    if (session) {
      form.setValue("name", session.name);
      form.setValue("username", session.username);
      form.setValue("email", session.email);
      form.setValue("bio", session.bio);
      setProfilePic(session.imageUrl);
    }
  }, [session]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-5 lg:gap-10  mt-4"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfileUpload
                  onChange={field.onChange}
                  imageUrl={session.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Name"
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Username"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Email"
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Bio</FormLabel>
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
        <Button
          type="submit"
          disabled={isPending}
          className="self-end shad-button_primary"
        >
          {isPending ? <ClipLoader size={30} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProfileForm;
