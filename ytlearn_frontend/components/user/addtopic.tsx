"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { addtopic } from "@/actions/user/addtopic";
import { z } from "zod";
import { topicSchema } from "@/schema/admin/addtopic";

export function AddTopicAdmin() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState("");
  const [error, seterror] = useState("");

  async function handlesubmit(e: FormEvent) {
    e.preventDefault();

    if (!title || !description) {
      seterror("Title or Description can not be empty !");
      return;
    }

    const input = { title: title, description: description };

    const validtopic = topicSchema.safeParse(input);

    if (validtopic.error) {
      const formatted = validtopic.error.format();
      const titleerror = formatted.title?._errors;
      const descriptionerror = formatted.description?._errors;
      if (titleerror) {
        seterror(titleerror[0]);
        return;
      }
      if (descriptionerror) {
        seterror(descriptionerror[0]);
        return;
      }
      return;
    }

    try {
      const response: any = await addtopic(title, description);
      if (response.error) {
        seterror(response.error);
      } else {
        setsuccess(response.msg);
      }
    } catch (error) {
      console.log("failed");
    }
  }

  return <div className="py-6 px-10 w-4/5  "></div>;
}
