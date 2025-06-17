"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
  return (
    <div className="bg-white border shadow-md rounded-2xl p-5 w-full max-w-sm md:max-w-md flex flex-col justify-between space-y-4 transition hover:shadow-xl">
      <div className="flex justify-between items-start">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 line-clamp-2">
          {title}
        </h2>
        <button className="text-red-500 text-sm hover:underline">Delete</button>
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
