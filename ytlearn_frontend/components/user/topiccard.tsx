"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deletetopic } from "@/actions/user/deletetopic";

interface TopiccardAdminProps {
  id: string;
  title: string;
  description: string;
}

export function TopiccardAdmin({
  id,
  title,
  description,
}: TopiccardAdminProps) {
  const router = useRouter();

  async function handledelete() {
    try {
      const response = await deletetopic(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white border shadow-md rounded-2xl p-5 w-full max-w-sm md:max-w-md flex flex-col justify-between space-y-4 transition hover:shadow-xl">
      <div className="flex justify-between items-center ">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>
        <button
          onClick={() => handledelete()}
          className="text-red-500 text-sm hover:underline cursor-pointer"
        >
          Delete
        </button>
      </div>

      <p className="text-gray-600 text-sm md:text-base line-clamp-3">
        {description}
      </p>

      <div className="flex justify-end">
        <Button
          variant="default"
          className="px-5 py-1.5 text-sm"
          onClick={() => router.push(`/topics/${id}`)}
        >
          Open
        </Button>
      </div>
    </div>
  );
}
