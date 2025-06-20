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
import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  link: z
    .string()
    .min(8, {
      message: "Valid youtube link required",
    })
    .refine((val) => val.includes("youtube.com") || val.includes("youtu.be"), {
      message: "Please provide a valid youtube link",
    }),
  topic: z.string().min(1, { message: "Please select a topic" }),
});

interface Topic {
  _id: string;
  title: string;
  description: string;
  userid: string;
}

export function Addvideo() {
  const [topics, settopics] = useState<Topic[]>([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [success, setsuccess] = useState("");

  const router = useRouter();

  async function fetchtopics() {
    try {
      const response = await gettopics();
      settopics(response.topics);
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
    seterror("");
    setsuccess("");
    setloading(true);
    const topic = values.topic;
    const link = values.link;

    try {
      const response: any = await addvideo({ link, topic });
      if (response.error) {
        seterror(response.error.response.data.msg);
      } else {
        setsuccess(response.msg);
      }
    } catch (error) {
      seterror("Something went wrong, Please verify the link !");
    } finally {
      setloading(false);
    }
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

                {topics.length === 0 && (
                  <div className="text-center bg-red-300 text-white rounded-lg p-1">
                    Create a topic first to start adding videos to it.
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
          onClick={() => router.push("/topics")}
        >
          <IoMdArrowForward />
          Go to Topics
        </Button>
      </div>
    </div>
  );
}
