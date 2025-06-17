import { Sidebar } from "@/components/user/sidebar";
import { VideoList } from "@/components/user/videolist";

interface prop {
  params: {
    topic: string;
  };
}

export default async function TopicPage({ params }: prop) {
  const { topic } = await params;

  return (
    <div>
      <Sidebar />
      <div className="p-6 flex flex-col items-center gap-2 mt-10 justify-center">
        <h1 className="text-4xl font-semibold">React</h1>
        <p className="">This is about react</p>
      </div>
      <div>
        <VideoList topicid={topic} />
      </div>
    </div>
  );
}
