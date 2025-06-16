import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/user/sidebar";
import { TopicList } from "@/components/user/topiclist";
import { IoSearchSharp } from "react-icons/io5";
import axios from "axios";

export default function ManageContent() {
  async function gettopics() {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopics`,
      { withCredentials: true }
    );
    console.log(response);
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full gap-10 flex flex-col  ">
        <div className=" w-full mt-5 flex justify-center ">
          <div className="w-1/3 flex  gap-1 justify-center items-center">
            <Input
              placeholder="Enter topic name eg: HTML, CSS"
              className="px-4 py-5 rounded-lg shadow-xl"
            />
            <Button
              size={"lg"}
              variant={"ghost"}
              className="px-4 py-4 cursor-pointer"
            >
              <IoSearchSharp />
              Search
            </Button>
          </div>
        </div>

        <TopicList />
      </div>
    </div>
  );
}
