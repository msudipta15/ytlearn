"use client";

import { useEffect } from "react";

export function VidePageTopCard() {
  async function gettopicdetails(topic: string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopic/${topic}`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    gettopicdetails(topic);
  }, []);

  return (
    <div className="p-6 flex flex-col items-center gap-2 mt-10 justify-center">
      <h1 className="text-4xl font-semibold">React</h1>
      <p className="">This is about react</p>
    </div>
  );
}
