"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { logout } from "@/actions/user/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FiEdit } from "react-icons/fi";

export function SidebarAdmin() {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  async function calllogout() {
    setloading(true);
    const response = await logout();
    setloading(false);
    router.push("/login");
  }

  return (
    <aside className="w-1/6 bg-gray-50 min-h-screen max-h-screen  p-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>T</AvatarFallback>
        </Avatar>
        <h1 className=" text-lg font-medium hover:shadow ">
          techtv70@gmail.com
        </h1>

        <FiEdit className="text-xl ml-3 hover:bg-gray-300 cursor-pointer" />
      </div>
      <nav className="flex flex-col gap-2 text-lg mt-5 font-medium">
        <div className="w-full  px-4 py-1 rounded-md hover:shadow">hello</div>
      </nav>
    </aside>
  );
}
