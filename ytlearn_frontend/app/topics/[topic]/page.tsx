import { Sidebar } from "@/components/user/sidebar";
import { VideoList } from "@/components/user/videolist";
import { VideoPageTopCard } from "@/components/user/videopagetopcard";

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

      <VideoPageTopCard topic={topic} />

      <div className="py-4 px-8 w-full flex flex-col">
        <VideoList topicid={topic} />
      </div>
    </div>
  );
}
