import { Sidebar } from "@/components/user/sidebar";
import { Addvideo } from "@/components/user/addvideo";

export default function AddVideo() {
  return (
    <div className="flex">
      <Sidebar />
      <Addvideo />
    </div>
  );
}
