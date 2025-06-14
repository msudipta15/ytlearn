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
    <div className="bg-white h-fit w-[300px] shadow rounded-xl p-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-gray-500 mb-0.5">{description}</p>

      <div className="mt-3 flex gap-2">
        <Button
          variant={"default"}
          className="px-5"
          onClick={() => router.push(`/topics/${id}`)}
        >
          Open
        </Button>
      </div>
    </div>
  );
}
