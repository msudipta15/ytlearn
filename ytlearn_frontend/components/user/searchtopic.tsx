"use client";

import { IoSearchSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { searchtopic } from "@/actions/user/searchtopic";
import { useState } from "react";

interface searchprop {
  onsearch: (title: string) => void;
}

export function SearchTopic({ onsearch }: searchprop) {
  const [title, settitle] = useState("");

  function search() {
    if (title.trim() === "") {
      return;
    }
    onsearch(title);
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
