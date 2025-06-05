import { Button } from "../ui/button";

export async function AddTopicAdmin() {
  return (
    <div className="py-6 px-10 w-4/5  ">
      <div>
        <h1 className="text-2xl font-semibold mb-6">➕ Add New Topic</h1>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full mt-1 p-2 border rounded"
              placeholder="e.g. React JS"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              className="w-full mt-1 p-2 border rounded"
              rows={4}
              placeholder="A short description"
            />
          </div>
          <Button
            variant={"default"}
            size={"lg"}
            className="bg-green-500 hover:bg-green-800"
          >
            Add Topic
          </Button>
        </form>
      </div>
    </div>
  );
}
