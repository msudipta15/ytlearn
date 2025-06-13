import { AddTopicAdmin } from "@/components/user/addtopic";
import { Sidebar } from "@/components/user/sidebar";

export default function AddTopic() {
  return (
    <div className="flex">
      <Sidebar />
      <AddTopicAdmin />
    </div>
  );
}
