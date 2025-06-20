"use client";

import { formattime } from "@/lib/utils";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface videocardprops {
  id: string;
  title: string;
  channelname: string;
  duration: string;
  url: string;
  videoid: string;
  refresh: () => void;
  topic: string;
}

export function VideoCard({
  id,
  title,
  channelname,
  duration,
  url,
  videoid,
  refresh,
  topic,
}: videocardprops) {
  const time = formattime(duration);

  async function deletevideo() {
    try {
      const response: any = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/deletevideo/${topic}/${id}`,
        { withCredentials: true }
      );
      toast.success(response.data.msg);
      refresh();
    } catch (error: any) {
      toast.error(error.response.data.msg);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300  w-full max-w-sm md:max-w-md overflow-hidden"
    >
      <div className=" w-full aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoid}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <div className="p-4 flex flex-col space-y-2">
        <Link href={url}>
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {title}
          </h2>
        </Link>

        <span className="text-sm text-gray-500">{channelname}</span>

        <div className="flex justify-between text-sm text-gray-600 pt-2 border-t mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>

          <div className="flex justify-end pt-1">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 hover:underline transition cursor-pointer">
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this video from this topic.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deletevideo}
                    className="bg-red-600 hover:bg-red-800"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
