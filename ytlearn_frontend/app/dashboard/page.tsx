import { DashboardAdmin } from "@/components/user/dashboard";
import { SidebarAdmin } from "@/components/user/sidebar";

export default function () {
  return (
    <div className="min-h-screen flex">
      <SidebarAdmin />
      <DashboardAdmin />
    </div>
  );
}
