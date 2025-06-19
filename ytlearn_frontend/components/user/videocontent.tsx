"use client";

import { useEffect, useState } from "react";
import { VideoList } from "./videolist";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { addvideo } from "@/actions/user/addvideo";
import toast from "react-hot-toast";
// Removed isAxiosError import as it's not exported directly from axios

interface video {
  title: string;
  url: string;
  channelname: string;
  duration: string;
  videoid: string;
  _id: string;
}

export function VideoPageContent({ topic }: { topic: string }) {
  const [videos, setvideos] = useState<video[]>([]);
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);
  const [buttonloading, setbuttonloading] = useState(false);
  const [inputlink, setinputlink] = useState("");

  //fetch videos
  async function getvideos(topic: string) {
    try {
      setloading(true);
      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/topics/${topic}`,
        { withCredentials: true }
      );
      //console.log(response);

      const videolist: video[] = response.data.videos;
      if (videolist.length !== 0) {
        setvideos(videolist);
        setmessage("");
      } else {
        setmessage("This topic has no videos.");
      }
    } catch (error) {
      //console.log(error);
    } finally {
      setloading(false);
    }
  }

  async function handleaddvideo() {
    try {
      setbuttonloading(true);
      const response: any = await addvideo({ link: inputlink, topic: topic });
      if (response.error) {
        toast.error(
          response.error.response.data.msg || "something went wrong !"
        );
      } else {
        toast.success(response.msg);
        getvideos(topic);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong !");
    } finally {
      setbuttonloading(false);
    }
  }

  useEffect(() => {
    getvideos(topic);
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-1/2 md:px-30 flex gap-2 items-center">
          <Input
            placeholder="Paste youtube link of the video."
            onChange={(e) => setinputlink(e.target.value)}
            className="hover:shadow-2xl rounded-xl "
          />
          <Button
            variant={"default"}
            disabled={buttonloading}
            className="bg-red-600 rounded-sm text-white cursor-pointer hover:bg-red-700"
            onClick={() => handleaddvideo()}
          >
            Add Video
          </Button>
        </div>
      </div>
      <div className="py-4 px-8 w-full flex flex-col">
        <VideoList loading={loading} message={message} videos={videos} />
      </div>
    </div>
  );
}
