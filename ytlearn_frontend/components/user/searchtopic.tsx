"use client";

import { IoSearchSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

interface searchprop {
  onsearch: (title: string) => void;
  onclear: () => void;
}

export function SearchTopic({ onsearch, onclear }: searchprop) {
  const [title, settitle] = useState("");

  function search() {
    if (title.trim() === "") {
      return;
    }
    onsearch(title);
  }

  function clear() {
    onclear();
    settitle("");
  }

  return (
    <div className=" w-full mt-10 flex justify-center ">
      <div className="md:w-1/3 flex  gap-1 justify-center items-center">
        <Input
          type="text"
          placeholder="Enter topic name eg: HTML, CSS"
          className="px-4 py-5 rounded-lg shadow-xl hover:shadow-2xl"
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
        {title && (
          <Button
            variant={"link"}
            className="cursor-pointer"
            onClick={() => clear()}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
