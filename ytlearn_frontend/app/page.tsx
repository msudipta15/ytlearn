import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundLines } from "@/components/ui/background-lines";
export default function LandingPage() {
  return (
    <BackgroundLines>
      <div className="min-h-screen w-full bg-gradient-to-tr from-black via-red-700 to-black text-white  ">
        <div className="text-center p-12">
          <h1 className="text-2xl md:text-4xl font-bold ">YT Learn</h1>
        </div>
        <div className="p-10">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Curate. Learn. Grow.
            </h2>
            <p className="text-xl md:text-2xl max-w-2xl mb-8 text-center">
              Discover top-quality YouTube videos, organized topic-wise to
              accelerate your learning journey.
            </p>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
}
