"use client";

import { IoSearchSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { searchtopic } from "@/actions/user/searchtopic";
import { useState } from "react";

export function SearchTopic() {
  const [title, settitle] = useState("");

  async function search() {
    try {
      const response = await searchtopic(title);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" w-full mt-10 flex justify-center ">
      <div className="w-1/3 flex  gap-1 justify-center items-center">
        <Input
          type="text"
          placeholder="Enter topic name eg: HTML, CSS"
          className="px-4 py-5 rounded-lg shadow-xl"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <Button
          onClick={() => search()}
          size={"lg"}
          variant={"ghost"}
          className=" py-4 cursor-pointer"
        >
          <IoSearchSharp />
          Search
        </Button>
      </div>
    </div>
  );
}
