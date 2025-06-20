"use client";

import { motion } from "framer-motion";
import { BsPersonCircle } from "react-icons/bs";

export default function WelcomeSection({ name }: { name: string }) {
  return (
    <motion.div
      className="p-4 rounded-lg   sm:w-[300px] md:w-[800px] md:h-[350px] flex flex-col justify-center  items-center  mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      <div>
        <BsPersonCircle size={96} className="text-red-600" />
      </div>
      <h1 className="text-2xl md:text-4xl mt-5   font-bold mb-4">
        Hello, {name}
      </h1>
      <h2 className="text-xl font-semibold mb-2">Welcome to YT Learn!</h2>
    </motion.div>
  );
}
