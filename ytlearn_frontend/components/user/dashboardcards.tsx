import { Button } from "../ui/button";

export function DashboardCards() {
  return (
    <div className="flex flex-col">
      <div className="p-4 px-8 mb-3 border gap-2 flex justify-between rounded-lg shadow-lg  sm:w-[300px] md:w-[800px] md:h-[170px]   items-center  mx-auto">
        <div className="flex flex-col  justify-center h-full">
          <h1 className="sm:text-5xl font-bold mb-2">Topics</h1>
          <p>See your topics or Create new topics to add videos.</p>
        </div>
        <div>
          <Button
            size={"lg"}
            className="bg-white text-black shadow-xl border hover:bg-red-600 hover:text-white cursor-pointer"
          >
            Go to Topics
          </Button>
        </div>
      </div>
      <div className="p-4 px-8 mb-3 border gap-2 flex justify-between rounded-lg shadow-lg  sm:w-[300px] md:w-[800px] md:h-[170px]   items-center  mx-auto">
        <div className="flex flex-col  justify-center h-full">
          <h1 className="sm:text-5xl font-bold mb-2">Add Video</h1>
          <p>Add your favorite youtube videos to your topics.</p>
        </div>
        <div>
          <Button
            size={"lg"}
            className="bg-white text-black shadow-xl border hover:bg-red-600 hover:text-white cursor-pointer"
          >
            Add video
          </Button>
        </div>
      </div>
      <div className="p-4 border px-8 gap-2 mb-3 flex justify-between rounded-lg shadow-lg  sm:w-[300px] md:w-[800px] md:h-[170px]   items-center  mx-auto">
        <div className="flex flex-col  justify-center h-full">
          <h1 className="sm:text-5xl font-bold mb-2">Bookmarks</h1>
          <p>Watch your Bookmarked videos and Topics</p>
        </div>
        <div>
          <Button
            size={"lg"}
            className="bg-white text-black shadow-xl border hover:bg-red-600 hover:text-white cursor-pointer"
          >
            Open
          </Button>
        </div>
      </div>
    </div>
  );
}
