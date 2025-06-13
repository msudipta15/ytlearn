"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/actions/user/logout";
import { MdDashboard } from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { MdAllInbox } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";

export function Sidebar() {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  async function calllogout() {
    setloading(true);
    const response = await logout();
    setloading(false);
    router.push("/login");
  }

  return (
    <aside className="w-1/7 bg-gray-50 min-h-screen fixe max-h-screen  p-4">
      <h1 className="text-2xl px-4 font-bold">YT Learn</h1>
      <nav className="flex flex-col gap-2 text-lg mt-5 font-medium">
        <div className="w-full flex items-center gap-2 cursor-pointer  px-4 py-1 rounded-md hover:shadow">
          <MdDashboard />
          Dashboard
        </div>
        <div className="w-full flex items-center gap-2 cursor-pointer  px-4 py-1 rounded-md hover:shadow">
          <IoIosCreate />
          Add Topic
        </div>
        <div className="w-full flex items-center gap-2 cursor-pointer  px-4 py-1 rounded-md hover:shadow">
          <AiFillYoutube />
          Add Video
        </div>
        <div className="w-full flex items-center gap-2 cursor-pointer  px-4 py-1 rounded-md hover:shadow">
          <MdAllInbox />
          Manage Topics
        </div>
      </nav>
    </aside>
  );
}
