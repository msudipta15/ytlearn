"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signin } from "@/actions/user/signin";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address !" })
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, { message: "Username must be less that 30" }),

  password: z
    .string()
    .min(2, { message: "Password should be atleast 2 characters" })
    .max(30, { message: "Password must be less than 30 characters" }),
});

export function SigninForm() {
  const [error, seterror] = useState("");
  const [issubmit, setissubmit] = useState(false);

  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setissubmit(true);
    try {
      const response = await signin(values);

      console.log(response);

      if (response?.success) {
        route.push("/dashboard");
        return;
      }
      if (response?.error) {
        seterror(response.error);
        return;
      }
    } catch (error) {
      seterror("something went wrong");
    } finally {
      setissubmit(false);
    }
  }

  return (
    <div className=" p-3  w-full items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@exmaple.com" {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
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
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormDescription>Enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="bg-red-100 px-2 py-1.5 rounded-md text-red-950">
              {error}
            </div>
          )}

          <Button
            className="w-full bg-red-600 text-white font-medium hover:bg-red-700 "
            type="submit"
            disabled={issubmit}
          >
            {issubmit && <Loader2Icon className="animate-spin" />}
            Sign in
          </Button>
        </form>
      </Form>
      <p className="py-2 mt-2 text-center">
        Don't have an account?{" "}
        <a className="hover:text-blue-600" href="/signup">
          Sign up
        </a>
      </p>
    </div>
  );
}
