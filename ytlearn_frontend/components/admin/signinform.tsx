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
import { signin } from "@/actions/admin/signin";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
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
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setissubmit(true);
    try {
      const response = await signin(values);
      if (response?.success) {
        route.push("/admin/dashboard");
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormDescription>Enter your username</FormDescription>
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

          <Button className="w-full" type="submit" disabled={issubmit}>
            {issubmit && <Loader2Icon className="animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
