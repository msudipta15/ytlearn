"use client";

import axios from "axios";
import { TopiccardAdmin } from "./topiccard";
import { useEffect, useState } from "react";

export function TopicList() {
  type Topic = {
    _id: string;
    title: string;
    description: string;
    userid: string;
  };

  const [topics, settopics] = useState<Topic[]>([]);

  async function gettopics() {
    const response = await axios.get<{ topics: Topic[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopics`,
      { withCredentials: true }
    );
    settopics(response.data.topics);
  }

  useEffect(() => {
    gettopics();
  }, []);

  return (
    <>
      {topics.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-screen  overflow-y-auto pr-2 pl-2 pt-2">
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
        <div className="text-center mt-30 text-xl">
          You do not have any topics.
        </div>
      )}
    </>
  );
}
