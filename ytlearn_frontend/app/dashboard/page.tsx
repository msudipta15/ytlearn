import { DashboardAdmin } from "@/components/admin/dashboard";
import { SidebarAdmin } from "@/components/admin/sidebar";

export default function () {
  return (
    <div className="min-h-screen flex">
      <SidebarAdmin />
      <DashboardAdmin />
    </div>
  );
}
