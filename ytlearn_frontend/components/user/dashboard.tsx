import { IoPersonCircleOutline } from "react-icons/io5";
import { FaDotCircle } from "react-icons/fa";

export function DashboardAdmin() {
  return (
    <div className="p-6 w-4/5 flex flex-col  min-h-screen h-full ">
      <div className="flex  gap-3 items-center justify-center mt-10">
        <div>
          <IoPersonCircleOutline className="text-4xl" />
        </div>
        <h1 className="text-3xl font-medium">Hello, Sudipta Mondal</h1>
      </div>
      <div className="flex justify-center mt-3 w-full h-screen p-4">
        <div className="p-5 w-2xl h-[400px] rounded-xl mt-10  shadow-2xl  ">
          <div className="flex flex-col gap-2 mt-3 justify-center items-center ">
            <p className="text-6xl">👋 </p>
            <h1 className="text-3xl mt-1 font-semibold ">
              Welcome to YT Learn !
            </h1>
            <div className=" mt-3 flex flex-col gap-2 ">
              <div className="flex items-center gap-2">
                <FaDotCircle />
                <p className="text-lg">
                  Create topics and organize your learning path
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaDotCircle />
                <p className="text-lg">
                  Add your favourite youtube videos topicwise
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaDotCircle />
                <p className="text-lg">
                  Make your youtube learning journey organized
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaDotCircle />
                <p className="text-lg">Share your topics with your friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
