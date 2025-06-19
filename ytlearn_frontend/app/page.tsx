import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundLines } from "@/components/ui/background-lines";
export default function LandingPage() {
  return (
    <BackgroundLines>
      <div className="min-h-screen w-full flex flex-col  bg-gradient-to-tr from-black via-red-700 to-black text-white  ">
        <div className="text-center p-12">
          <h1 className="text-2xl md:text-4xl font-bold ">YT Learn</h1>
        </div>
        <div className="p-10 mt-4">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Curate. Learn. Grow.
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl mb-8 text-center">
              Discover top-quality YouTube videos, organized topic-wise to
              accelerate your learning journey.
            </p>
            <Button
              variant={"outline"}
              size={"lg"}
              className="text-red-700 mt-4 px-10 py-5 rounded-3xl hover:shadow-2xl cursor-pointer "
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="mt-16 ">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center ">
            <div className="shadow-xl p-4 py-8 md:py-18 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Focused Topics</h3>
              <p>
                Curate your own playlists and categorize them by technology,
                framework, language, or skill level for smarter learning.
              </p>
            </div>
            <div className="shadow-xl p-4 py-8 md:py-18 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Smart Learning</h3>
              <p>
                Search YouTube and organize your favorite videos by topic with
                YT Learn to make your learning smarter.
              </p>
            </div>
            <div className="shadow-xl p-4 py-8 md:py-18 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Your Learning Library</h3>
              <p>
                YT Learn is your one-stop solution to transform the chaos of
                YouTube into your own curated playlists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
