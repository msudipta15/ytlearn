import { BackgroundLines } from "@/components/ui/background-lines";
import { DashboardAdmin } from "@/components/user/dashboard";
import { Sidebar } from "@/components/user/sidebar";

export default function () {
  return (
    <BackgroundLines>
      <div className="absolute inset-0 z-0 w-full h-screen min-h-screen flex ">
        <Sidebar />
        <DashboardAdmin />
      </div>
    </BackgroundLines>
  );
}
