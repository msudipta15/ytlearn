"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function VideoPageTopCard({ topic }: { topic: string }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");

  async function gettopicdetails(topic: string) {
    try {
      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopic/${topic}`,
        { withCredentials: true }
      );

      //console.log(response.data);

      settitle(response.data.topic.title);
      setdescription(response.data.topic.description);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    gettopicdetails(topic);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="p-6 flex flex-col items-center gap-2 mt-10 justify-center"
    >
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}
