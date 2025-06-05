import { AddTopicAdmin } from "@/components/admin/addtopic";
import { SidebarAdmin } from "@/components/admin/sidebar";

export default function AddTopic() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <AddTopicAdmin />
    </div>
  );
}
