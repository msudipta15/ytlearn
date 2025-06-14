"use client";

import { useEffect, useState } from "react";
import { addtopic } from "@/actions/user/addtopic";
import { z } from "zod";
import { topicSchema } from "@/schema/admin/addtopic";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { Loader2Icon } from "lucide-react";
import { motion } from "framer-motion";
import { IoMdArrowForward } from "react-icons/io";

type Topic = {
  _id: string;
  title: string;
  description: string;
  userid: string;
};

export function AddTopicAdmin() {
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");

  const form = useForm<z.infer<typeof topicSchema>>({
    resolver: zodResolver(topicSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof topicSchema>) {
    setloading(true);
    setsuccess("");
    seterror("");
    const title = values.title;
    const description = values.description;
    if (!title || !description) {
      seterror("Title or Description can not be empty !");
      setloading(false);
      return;
    }
    try {
      const response: any = await addtopic(title, description);
      if (response.error) {
        seterror(response.error);
      } else {
        setsuccess(response.msg);
      }
    } catch (error) {
      seterror("something went wrong !");
      console.log("failed");
    } finally {
      setloading(false);
    }
  }

  return (
    <div className="py-6 px-10 w-full   ">
      <div className="p-4  mt-20 rounded-lg gap-3 shadow-lg border   md:w-[800px] md:h-[500px] flex flex-col justify-center  items-center  mx-auto">
        <div className="">
          <h1 className="text-3xl text-center font-bold">Add Topic</h1>
        </div>
        <div className="w-full sm:w-[400px]">
          <div className=" p-3  w-full items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: HTML,JS" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter title for your topic
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Type your topic description here"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Topic Description</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {error && (
                  <div className=" px-2 py-1.5 rounded-md text-red-600 text-lg text-center font-medium">
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {error}
                    </motion.span>
                  </div>
                )}
                {success && (
                  <div className=" text-green-600 text-lg font-medium text-center px-2 py-1.5 rounded-md ">
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {success}
                    </motion.span>
                  </div>
                )}

                <Button
                  className="w-full bg-red-500 text-white hover:bg-red-600 hover:text-white"
                  type="submit"
                  disabled={loading}
                >
                  {loading && <Loader2Icon className="animate-spin" />}
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-center mt-10  ">
        <Button
          variant={"ghost"}
          size={"lg"}
          className="text-xl cursor-pointer hover:bg-green-600 hover:text-white"
        >
          <IoMdArrowForward />
          Go to Topics
        </Button>
      </div>
    </div>
  );
}
