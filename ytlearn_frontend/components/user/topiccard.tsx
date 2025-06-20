"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deletetopic } from "@/actions/user/deletetopic";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
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

interface TopiccardAdminProps {
  id: string;
  title: string;
  description: string;
  videocount: number;
  refresh: () => void;
}

export function TopiccardAdmin({
  id,
  title,
  description,
  refresh,
  videocount,
}: TopiccardAdminProps) {
  const router = useRouter();

  async function handledelete() {
    try {
      const response = await deletetopic(id);
      console.log(response);
      toast.success("Video deleted successfully !");
      refresh();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border shadow-md rounded-2xl p-5 w-full max-w-sm md:max-w-md flex flex-col justify-between space-y-4 transition hover:shadow-xl"
    >
      <div className="flex justify-between items-center ">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-red-500 text-sm hover:underline cursor-pointer">
              Delete
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                topic and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handledelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <p className="text-gray-600 text-sm md:text-base line-clamp-3">
        {description}
      </p>

      <div className="flex justify-between">
        <div className="text-gray-600 flex items-center gap-1">
          <span className="text-xl font-semibold">{videocount}</span>{" "}
          <span>videos</span>
        </div>
        <Button
          variant="default"
          className="px-5 py-1.5 text-sm bg-red-600 hover:bg-red-800 cursor-pointer"
          onClick={() => router.push(`/topics/${id}`)}
        >
          Open
        </Button>
      </div>
    </motion.div>
  );
}
