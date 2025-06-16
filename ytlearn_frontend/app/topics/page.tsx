"use client";

import { Sidebar } from "@/components/user/sidebar";
import { TopicList } from "@/components/user/topiclist";
import axios from "axios";
import { SearchTopic } from "@/components/user/searchtopic";
import { useEffect, useState } from "react";
import { searchtopic } from "@/actions/user/searchtopic";

type Topic = {
  _id: string;
  title: string;
  description: string;
  userid: string;
};

export default function ManageContent() {
  const [topics, settopics] = useState<Topic[]>([]);
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  async function handlesearch(title: string) {
    setloading(true);
    try {
      const response: any = await searchtopic(title);
      settopics(response.data.topics);
    } catch (error: any) {
      if (error.response.data.msg) {
        setmessage(error.response.data.msg);
      } else {
        setmessage("something went wrong !");
      }
    } finally {
      setloading(false);
    }
  }

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
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full gap-10 flex flex-col  ">
        <SearchTopic onsearch={handlesearch} />
        <TopicList topics={topics} message={message} loading={loading} />
      </div>
    </div>
  );
}
