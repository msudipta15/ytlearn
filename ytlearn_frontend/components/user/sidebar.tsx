"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/actions/user/logout";
import { MdDashboard } from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { MdAllInbox } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaBars } from "react-icons/fa";

export function Sidebar() {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [modelclose, setmodelclose] = useState(true);

  async function calllogout() {
    setloading(true);
    const response = await logout();
    setloading(false);
    router.push("/login");
  }

  return (
    <aside
      className={`w-1/7 bg-gray-50 min-h-screen fixed max-h-screen  p-4 transform ${
        modelclose ? "translate-x-0 " : "-translate-x-full"
      } transition-transform delay-100 ease-in-out`}
    >
      <div className="flex items-center justify-between ">
        <h1 className="text-2xl px-4 font-bold">YT Learn</h1>
        <div>
          <FaBars
            onClick={() => setmodelclose(!modelclose)}
            className="text-xl cursor-pointer"
          />
        </div>
      </div>

      <nav className="flex flex-col gap-2  mt-5 font-medium">
        <div className="w-full flex  items-center  gap-2 cursor-pointer  px-4 py-1 rounded-md hover:shadow">
          <p>👤</p>
          <p>Sudipta Mondal</p>
        </div>
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
