import { Button } from "../ui/button";

export function SidebarAdmin() {
  return (
    <aside className="w-1/5 bg-gray-100 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6 ">YT Learn Admin</h1>
      <nav className="flex flex-col gap-6 text-lg font-medium">
        <a
          href="/admin/dashboard"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          {" "}
          🏠 Dashboard
        </a>
        <a
          href="/admin/addtopic"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          ➕ Add Topic
        </a>
        <a
          href="/admin/addvideo"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          🎥 Add Video
        </a>
        <a
          href="/admin/addvideo"
          className="flex items-center gap-2 hover:text-blue-700"
        >
          🗂️ Manage Content
        </a>
        <Button
          variant={"destructive"}
          size={"lg"}
          className="mt-5 w-1/3 flex "
        >
          Log out
        </Button>
      </nav>
    </aside>
  );
}
