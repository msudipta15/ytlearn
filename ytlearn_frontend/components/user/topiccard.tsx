import { Button } from "../ui/button";

export function TopiccardAdmin() {
  return (
    <div className="bg-white h-fit w-[500px] shadow rounded-xl p-5">
      <h2 className="text-2xl font-bold">React JS</h2>
      <p className="text-sm text-gray-500">Topic description goes here...</p>

      <div className="mt-4 flex gap-2">
        <Button variant={"default"} className="px-5">
          Open
        </Button>
      </div>
    </div>
  );
}
