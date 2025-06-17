import { motion } from "framer-motion";

export function VideoCard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border shadow-md rounded-2xl p-5 w-full max-w-sm md:max-w-md flex flex-col justify-between space-y-4 transition hover:shadow-xl"
      >
        <div className="flex justify-center">
          <iframe
            width="320"
            height="215"
            src="https://www.youtube.com/embed/YCrngJCkI8I?si=9zs_c95p5Pe0VRw7"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>
    </div>
  );
}

//https://www.youtube.com/embed/YCrngJCkI8I?si=9zs_c95p5Pe0VRw7
//https://youtu.be/YCrngJCkI8I?si=iMBq03THe0AOJ7bL
