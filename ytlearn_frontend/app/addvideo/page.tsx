import { SidebarAdmin } from "@/components/user/sidebar";
import { Button } from "@/components/ui/button";

export default function AddVideo() {
  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="p-8 w-4/5">
        <h1 className="text-2xl font-semibold mb-6">🎥 Add New Video</h1>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">
              Video Link (YouTube URL)
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="https://youtube.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Select Topic</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option>HTML</option>
              <option>CSS</option>
              <option>React</option>
              {/* Populate with dynamic topic list */}
            </select>
          </div>
          <Button
            variant={"default"}
            size={"lg"}
            className="bg-green-500 hover:bg-green-800"
          >
            Add Video
          </Button>
        </form>
      </div>
    </div>
  );
}
