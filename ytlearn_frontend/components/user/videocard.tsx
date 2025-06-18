"use client";

import { motion } from "framer-motion";
import { Eye, Clock, Trash2 } from "lucide-react";
import Link from "next/link";

interface videocardprops {
  title: string;
  channelname: string;
  duration: string;
  url: string;
  videoid: string;
}

export function VideoCard({
  title,
  channelname,
  duration,
  url,
  videoid,
}: videocardprops) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-full max-w-sm md:max-w-md overflow-hidden"
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
            <span>{duration}</span>
          </div>

          <div className="flex justify-end pt-1">
            <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 hover:underline transition cursor-pointer">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
