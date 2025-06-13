"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/actions/user/logout";
import { MdDashboard, MdAllInbox } from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiLogoutBoxRLine } from "react-icons/ri";

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

  const menuitems = [
    {
      icon: <MdDashboard size={24} />,
      label: "Dashboard",
      onclick: () => router.push("/dashboard"),
    },
    {
      icon: <IoIosCreate size={24} />,
      label: "Add Topic",
      onclick: () => router.push("/addtopic"),
    },
    {
      icon: <AiFillYoutube size={24} />,
      label: "Add Video",
      onclick: () => router.push("/addvideo"),
    },
    {
      icon: <MdAllInbox size={24} />,
      label: "Manage Topics",
      onclick: () => router.push("/managetopic"),
    },
  ];

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <motion.div
          animate={{ rotate: modelclose ? 0 : 180 }}
          transition={{ duration: 0.4 }}
          className=" p-2 rounded-md  cursor-pointer"
          onClick={() => setmodelclose(!modelclose)}
        >
          <FaBars size={20} />
        </motion.div>
      </div>

      {modelclose ? null : (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.4 }}
          className="w-64 bg-white text-gray-800 font-medium  min-h-screen fixed top-0 left-0 z-40 p-4 shadow-md"
        >
          <h1 className="text-2xl px-4 font-bold mb-10"></h1>

          <nav className="flex flex-col  gap-4">
            {menuitems.map((item, index) => (
              <div
                key={index}
                className="flex  items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                <motion.div
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-[24px] flex justify-center"
                >
                  {item.icon}
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  onClick={item.onclick}
                >
                  {item.label}
                </motion.span>
              </div>
            ))}
            <div className="flex mt-10  items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-red-600 hover:text-white transition">
              <RiLogoutBoxRLine size={26} />
              <a href="/login">Logout</a>
            </div>
          </nav>
        </motion.aside>
      )}
    </>
  );
}
