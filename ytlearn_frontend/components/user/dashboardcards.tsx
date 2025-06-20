"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const cardinfo = [
  {
    title: "Create Topic",
    description: "Create new topics to add videos.",
    buttonText: "Add Topic",
    route: "/addtopic",
  },
  {
    title: "Add Video",
    description: "Add your favorite YouTube videos to your topics.",
    buttonText: "Add Video",
    route: "/addvideo",
  },
  {
    title: "All Topics",
    description: "See all the topics you created.",
    buttonText: "Open",
    route: "/topics",
  },
];

export function DashboardCards() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 items-center px-4">
      {cardinfo.map((card, idx) => (
        <div
          key={idx}
          className="w-full max-w-[800px] p-6 md:h-44 flex justify-between items-center bg-white border rounded-2xl shadow-md transition hover:shadow-xl"
        >
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-2">
              {card.title}
            </h1>
            <p className="text-gray-600">{card.description}</p>
          </div>
          <Button
            size="lg"
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
            onClick={() => router.push(card.route)}
          >
            {card.buttonText}
          </Button>
        </div>
      ))}
    </div>
  );
}
