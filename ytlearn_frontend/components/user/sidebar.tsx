"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/actions/user/logout";
import { MdDashboard } from "react-icons/md";
import { AiFillYoutube } from "react-icons/ai";
import { MdAllInbox } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";

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
    { icon: <MdDashboard size={24} />, label: "Dashboard" },
    { icon: <IoIosCreate size={24} />, label: "Add Topic" },
    { icon: <AiFillYoutube size={24} />, label: "Add Video" },
    { icon: <MdAllInbox size={24} />, label: "Manage Topics" },
  ];

  return (
    <aside
      className={`w-1/7 bg-gray-50 min-h-screen fixed max-h-screen  p-4 transition-all duration-100
        ${modelclose ? "w-24" : "w-64"}`}
    >
      <div className="flex items-center justify-between ">
        <div className="ml-2 mb-5">
          <motion.div
            animate={{
              scale: modelclose ? 0.8 : 1,
              rotate: modelclose ? 0 : 180,
            }}
            transition={{ duration: 0.4 }}
            className="min-w-[24px] flex justify-center"
          >
            <FaBars
              size={24}
              onClick={() => setmodelclose(!modelclose)}
              className="text-xl cursor-pointer"
            />
          </motion.div>
        </div>
        <h1
          className={`text-2xl px-4 font-bold ${
            modelclose ? "hidden" : "block"
          }`}
        ></h1>
      </div>

      <nav className="flex flex-col gap-4">
        {menuitems.map((item, index) => (
          <div
            key={index}
            className="flex items-center  min-w-[24px] gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-200 transition"
          >
            <motion.div
              animate={{
                scale: modelclose ? 0.8 : 1,
              }}
              transition={{ duration: 0.6 }}
              className="min-w-[24px] flex justify-center"
            >
              {item.icon}
            </motion.div>
            {!modelclose && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: modelclose ? 0 : 1,
                  x: modelclose ? -20 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {item.label}
              </motion.span>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
