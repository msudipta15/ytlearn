"use client";

import { gettopics } from "@/actions/user/gettopics";
import { useEffect } from "react";

export function Addvideo() {
  async function fetchtopics() {
    const response = await gettopics();
    console.log(response);
  }

  useEffect(() => {
    fetchtopics();
  }, []);

  return (
    <div className="p-4  mt-20 rounded-lg gap-3 shadow-lg border   md:w-[800px] md:h-[500px] flex flex-col justify-center  items-center  mx-auto">
      <div>
        <h1 className="text-3xl text-center font-bold">Add video</h1>
      </div>
      <div>
        <option value="hello"></option>
      </div>
      <div></div>
    </div>
  );
}
