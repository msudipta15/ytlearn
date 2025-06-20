import { Button } from "@/components/ui/button";
import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";
export default function LandingPage() {
  return (
    <BackgroundLines className="max-w-full max-h-full">
      <div className="absolute inset-0 z-0 w-full min-h-screen overflow-auto flex flex-col  items-center ">
        {/*Top Bar */}
        <div className="text-center p-12">
          <h1 className="text-2xl md:text-4xl font-bold ">YT Learn</h1>
        </div>

        {/* Hero Section */}
        <div className="p-10 mt-4">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Curate. Learn. Grow.
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl mb-8 text-center">
              Create custom playlists, Add top-quality YouTube videos to
              accelerate your learning journey.
            </p>
            <Link href={"/login"}>
              <Button
                variant={"outline"}
                size={"lg"}
                className="bg-red-600 text-white font-semibold mt-4 px-10 py-5 rounded-3xl hover:shadow-2xl cursor-pointer "
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature section*/}
        <div className="mt-13 ">
          <div className="max-w-6xl mx-auto grid grid-cols-1   md:grid-cols-3 gap-8 text-center  ">
            <div className="shadow-xl p-4 mx-4 sm:mx-0 py-8 md:py-18 rounded-2xl mt-3 border">
              <h3 className="text-2xl font-bold mb-2">Focused Topics</h3>
              <p>
                Curate your own playlists and categorize them by technology,
                framework, language, or skill level for smarter learning.
              </p>
            </div>
            <div className="shadow-xl p-4 py-8 mx-4 sm:mx-0 mt-3 md:py-18 rounded-2xl border">
              <h3 className="text-2xl font-bold mb-2">Smart Learning</h3>
              <p>
                Search YouTube and organize your favorite videos by topic with
                YT Learn to make your learning smarter.
              </p>
            </div>
            <div className="shadow-xl p-4 py-8 mx-4 sm:mx-0 mt-3 md:py-18 rounded-2xl border">
              <h3 className="text-2xl font-bold mb-2">Your Learning Library</h3>
              <p>
                YT Learn is your one-stop solution to transform the chaos of
                YouTube into your own curated playlists.
              </p>
            </div>
          </div>
        </div>

        {/*Footer*/}
        <div className="mt-10 p-16">
          <h1 className="text-center">© YT Learn 2025 - Sudipta Mondal</h1>
        </div>
      </div>
    </BackgroundLines>
  );
}
