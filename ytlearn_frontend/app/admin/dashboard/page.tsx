import { SidebarAdmin } from "@/components/admin/sidebar";

export default function () {
  return (
    <div className="min-h-screen flex">
      <SidebarAdmin />
      <div className="p-6 w-4/5 h-fit  ">
        <h1 className="text-xl font-semibold">🏠 Dahsboard Overview</h1>
        <div className="mt-10 flex  gap-8">
          <div className=" shadow  rounded-lg p-4 w-[350px]">
            <p className="font-medium text-gray-500">Total Topics</p>
            <p className="text-4xl font-bold text-blue-600">15</p>
          </div>
          <div className=" shadow  rounded-lg p-4 w-[300px]">
            <p className="font-medium text-gray-500">Total Videos</p>
            <p className="text-4xl font-bold text-green-600">20</p>
          </div>
          <div className=" shadow  rounded-lg p-4 w-[300px]">
            <p className="font-medium text-gray-500">Unique Channels</p>
            <p className="text-4xl font-bold text-purple-600">7</p>
          </div>
        </div>
      </div>
    </div>
  );
}
