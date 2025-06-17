"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface videolistprop {
  topicid: string;
}

interface video {
  title: string;
  url: string;
  duration: string;
  date: string;
  id: string;
}

export function VideoList({ topicid }: videolistprop) {
  const [video, setvideo] = useState<video[]>([]);
  const [message, setmessage] = useState("");
  const [loading, setloading] = useState(false);

  async function getvideos() {
    try {
      setloading(true);
      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/topics/${topicid}`,
        { withCredentials: true }
      );
      console.log(response);

      const videos: video[] = response.data.videos;
      if (videos.length !== 0) {
        setvideo(videos);
        setmessage("");
      } else {
        setmessage("This topic has no videos.");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getvideos();
  }, []);
  return <div>videolist</div>;
}
