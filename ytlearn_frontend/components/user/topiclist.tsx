"use client";

import axios from "axios";
import { TopiccardAdmin } from "./topiccard";
import { useEffect } from "react";

export function TopicList() {
  async function gettopics() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopics`,
      { withCredentials: true }
    );

    console.log(response);
  }

  useEffect(() => {
    gettopics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen  overflow-y-auto pr-2 pl-2 pt-2">
      <TopiccardAdmin />
    </div>
  );
}
