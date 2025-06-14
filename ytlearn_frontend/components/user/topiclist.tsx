"use client";

import axios from "axios";
import { TopiccardAdmin } from "./topiccard";
import { useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";

type Topic = {
  _id: string;
  title: string;
  description: string;
  userid: string;
};

export function TopicList() {
  const [topics, settopics] = useState<Topic[]>([]);
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  async function gettopics() {
    try {
      setloading(true);
      const response = await axios.get<{ topics: Topic[] }>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopics`,
        { withCredentials: true }
      );
      settopics(response.data.topics);
    } catch (error: any) {
      const message = error.response?.data?.msg;
      setmessage(message);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    gettopics();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2Icon className="animate-spin size-10 text-gray-600" />
          <p className="text-2xl p-2 text-gray-600">Loading...</p>
        </div>
      ) : topics.length !== 0 ? (
        <div className="grid grid-cols-1 grid-rows-5 gap-5 md:grid-cols-2 h-screen overflow-y-auto pr-2 pl-2 pt-2">
          {topics.map((topic) => (
            <TopiccardAdmin
              key={topic._id}
              id={topic._id}
              title={topic.title}
              description={topic.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center mt-30 text-xl">{message}</div>
      )}
    </>
  );
}
