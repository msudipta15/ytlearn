import { motion } from "framer-motion";

export function VideoCard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border shadow-md rounded-md p-5 w-full max-w-sm md:max-w-md flex flex-col justify-between space-y-4 transition hover:shadow-xl"
      >
        <div className="flex justify-center">
          <iframe
            width="320"
            height="215"
            src="https://youtu.be/TxxJcom-wdk?si=z7DhH8G8za-cX-tG"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <h1 className="text-xl font-medium">Title</h1>
          <div className="flex justify-between">
            <span>Channel name</span>
            <span>2:12</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

//https://www.youtube.com/embed/YCrngJCkI8I?si=9zs_c95p5Pe0VRw7
//https://youtu.be/YCrngJCkI8I?si=iMBq03THe0AOJ7bL
