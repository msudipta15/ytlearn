"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { VideoCard } from "./videocard";
import { Loader2Icon } from "lucide-react";

interface video {
  title: string;
  url: string;
  channelname: string;
  duration: string;
  videoid: string;
  _id: string;
}

interface videolistprop {
  loading: boolean;
  message: string;
  videos: video[];
}

export function VideoList({ loading, message, videos }: videolistprop) {
  return (
    <div>
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2Icon className="animate-spin size-10 text-gray-600" />
            <p className="text-2xl p-2 text-gray-600">Loading...</p>
          </div>
        ) : videos.length !== 0 ? (
          <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 max-h-screen  p-1 md:px-60">
            {videos.map((video) => (
              <VideoCard
                key={video._id}
                title={video.title}
                channelname={video.channelname}
                duration={video.duration}
                url={video.url}
                videoid={video.videoid}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64 text-xl text-gray-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
