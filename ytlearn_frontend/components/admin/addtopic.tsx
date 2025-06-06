"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { addtopic } from "@/actions/admin/addtopic";

export function AddTopicAdmin() {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [error, seterror] = useState(false);

  async function handlesubmit(e: FormEvent) {
    e.preventDefault();
    const response = await addtopic(title, description);
    console.log(response);
  }

  return (
    <div className="py-6 px-10 w-4/5  ">
      <div>
        <h1 className="text-2xl font-semibold mb-6">➕ Add New Topic</h1>
        <form onSubmit={(e) => handlesubmit(e)} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="e.g. React JS"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-2 border rounded"
              rows={4}
              placeholder="A short description about the topic"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
            />
          </div>
          <Button
            variant={"default"}
            size={"lg"}
            className="bg-green-500 hover:bg-green-800"
            type="submit"
            disabled={loading}
          >
            Add Topic
          </Button>
        </form>
      </div>
    </div>
  );
}
