import { Sidebar } from "@/components/user/sidebar";
import { TopicList } from "@/components/user/topiclist";
import axios from "axios";
import { SearchTopic } from "@/components/user/searchtopic";

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
        <SearchTopic />
        <TopicList />
      </div>
    </div>
  );
}
