import { DashboardAdmin } from "@/components/user/dashboard";
import { Sidebar } from "@/components/user/sidebar";

export default function () {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <DashboardAdmin />
    </div>
  );
}
