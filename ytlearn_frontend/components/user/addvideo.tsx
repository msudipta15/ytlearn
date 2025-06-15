"use client";

import { gettopics } from "@/actions/user/gettopics";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoMdArrowForward } from "react-icons/io";
import { addvideo } from "@/actions/user/addvideo";

const formSchema = z.object({
  link: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .refine((val) => val.includes("youtube.com") || val.includes("youtu.be"), {
      message: "Please provide a valid youtube link",
    }),
  topic: z.string().min(1),
});

interface Topic {
  _id: string;
  title: string;
  description: string;
  userid: string;
}

export function Addvideo() {
  const [topics, settopics] = useState<Topic[]>([]);
  async function fetchtopics() {
    try {
      const response = await gettopics();
      console.log(response);
      settopics(response);
    } catch (error) {
      console.log(error);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
      topic: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const topic = values.topic;
    const link = values.link;

    const response = await addvideo({ link, topic });
    console.log(response);
  }

  useEffect(() => {
    fetchtopics();
  }, []);

  return (
    <div className="py-6 px-10 w-full ">
      <div className="p-4  mt-20 rounded-lg gap-3 shadow-lg border   md:w-[800px] md:h-[500px] flex flex-col justify-center  items-center  mx-auto">
        <div>
          <h1 className="text-3xl text-center font-bold">Add video</h1>
        </div>
        <div className="w-full sm:w-[400px]">
          <div className="p-3  w-full items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="youtube.com/example..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter youtube link of the video
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="sm:w-[380px]">
                            <SelectValue placeholder="Topic" />
                          </SelectTrigger>
                          <SelectContent>
                            {topics.map((topic, key) => (
                              <SelectItem value={topic._id} key={topic._id}>
                                {topic.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Select the topic</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full bg-red-500 text-white hover:bg-red-600 hover:text-white"
                  type="submit"
                >
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
