"use client";

import { TopiccardAdmin } from "./topiccard";
import { Loader2Icon } from "lucide-react";

type Topic = {
  _id: string;
  title: string;
  description: string;
  userid: string;
};

interface topiclistprops {
  topics: Topic[];
  loading: boolean;
  message: string;
}

export function TopicList({ topics, loading, message }: topiclistprops) {
  console.log(topics);

  return (
    <div className="p-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2Icon className="animate-spin size-10 text-gray-600" />
          <p className="text-2xl p-2 text-gray-600">Loading...</p>
        </div>
      ) : topics.length !== 0 ? (
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 max-h-screen overflow-y-auto p-10 md:px-60">
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
        <div className="flex justify-center items-center h-64 text-xl text-gray-600">
          {message}
        </div>
      )}
    </div>
  );
}
