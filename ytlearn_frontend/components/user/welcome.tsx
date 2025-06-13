"use client";

import { motion } from "framer-motion";
import { FaDotCircle } from "react-icons/fa";

export default function WelcomeSection({ name }: { name: string }) {
  return (
    <motion.div
      className="p-4 rounded-lg shadow-lg  sm:w-[300px] md:w-[800px] md:h-[350px] flex flex-col justify-center bg-gradient-to-r from-red-600 to-red-400 text-white items-center  mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl   font-bold mb-4">Hello, {name}</h1>
      <h2 className="text-xl font-semibold mb-2">Welcome to YT Learn!</h2>
      <ul className="space-y-2 text-md ">
        <li className="flex items-center mb-2 mt-2">
          <span className="mr-2">
            <FaDotCircle />
          </span>{" "}
          Curate and organize topics to shape your personalized learning
          journey.
        </li>
        <li className="flex items-center mb-2">
          <span className="mr-2">
            {" "}
            <FaDotCircle />
          </span>{" "}
          Collect and categorize your favorite YouTube videos by topic for easy
          access.
        </li>
        <li className="flex items-center mb-2">
          <span className="mr-2">
            {" "}
            <FaDotCircle />
          </span>{" "}
          Turn unstructured YouTube learning into a structured, focused
          experience.
        </li>
        <li className="flex items-center mb-2">
          <span className="mr-2">
            {" "}
            <FaDotCircle />
          </span>{" "}
          Bookmark must-watch videos and build your ultimate learning playlist.
        </li>
      </ul>
    </motion.div>
  );
}
