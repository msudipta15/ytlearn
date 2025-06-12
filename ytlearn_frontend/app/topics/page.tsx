import { SidebarAdmin } from "@/components/user/sidebar";
import { TopicList } from "@/components/user/topiclist";
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
      <SidebarAdmin />
      <div className="p-8 w-4/5  ">
        <h1 className="text-2xl font-semibold mb-6">🗂️ Your Topics</h1>
        <TopicList />
      </div>
    </div>
  );
}
