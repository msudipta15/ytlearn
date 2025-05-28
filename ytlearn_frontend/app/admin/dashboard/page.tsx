export default function Page() {
  return (
    <div className="bg-white min-h-screen max-h-full w-full">
      <div className="text-3xl text-red-700 font-bold text-center p-3">
        YT Learn
      </div>
      <div className="flex gap-3 justify-center mt-3">
        <button className="bg-green-500 p-3">Create topic</button>
        <button className="bg-green-500 p-3">Add video</button>
      </div>
    </div>
  );
}
