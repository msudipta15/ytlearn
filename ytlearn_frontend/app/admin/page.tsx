import { SparklesCore } from "@/components/ui/sparkles";

export default function AdminHome() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <SparklesCore />

      {/* Foreground content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-4">YT Learn Admin</h1>
        <p className="text-lg">Manage your videos and topics with ease</p>
        <button className="mt-6 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
          Get Started
        </button>
      </div>
    </div>
  );
}
