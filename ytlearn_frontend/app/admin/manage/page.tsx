import { SidebarAdmin } from "@/components/admin/sidebar";
import { TopiccardAdmin } from "@/components/admin/topiccard";

export default function ManageContent() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="p-8 w-4/5  ">
        <h1 className="text-2xl font-semibold mb-6">🗂️ Manage Content</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen bg-amber-100 overflow-y-auto pr-2 pl-2 pt-2">
          <TopiccardAdmin />
        </div>
      </div>
    </div>
  );
}
