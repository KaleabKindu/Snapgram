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
import Image from "next/image";
import Link from "next/link";
import { Routes } from "../../../Routes";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { useCreateUserMutation } from "@/lib/react-query/mutations";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be atleast 2 characters",
  }),
  username: z.string().min(2, {
    message: "Username must be atleast 2 characters",
  }),
  email: z.string().email({
    message: "Email must be a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});

type Props = {};

const SignUpForm = (props: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutateAsync: createUser, isPending } = useCreateUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser(values);
      form.reset();
      router.push(Routes.SignIn);
    } catch (error: any) {
      toast({
        title: "Sign Up failed",
        description: error.message,
      });
    }
  }
  return (
    <div className="flex justify-center items-center flex-1">
      <div className="flex flex-col flex-center sm:w-420">
        <Image
          src="/assets/images/logo.svg"
          width={200}
          height={100}
          alt="logo"
        />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram, Please enter your details
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-5 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Name"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Username"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email Address"
                      className="shad-input"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter Password"
                      type="password"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isPending}
              className="shad-button_primary"
            >
              {isPending ? <ClipLoader size={30} /> : "Sign Up"}
            </Button>
            <p className="text-small-regular self-center text-light-2 mt-2 ">
              Already have an account?{" "}
              <Link
                className="text-primary-500 text-small-semibold mt-1"
                href={Routes.SignIn}
              >
                {" "}
                Sign In
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
