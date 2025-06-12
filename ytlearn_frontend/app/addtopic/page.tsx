import { AddTopicAdmin } from "@/components/user/addtopic";
import { SidebarAdmin } from "@/components/user/sidebar";

export default function AddTopic() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <AddTopicAdmin />
    </div>
  );
}
