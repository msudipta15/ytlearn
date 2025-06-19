import { Sidebar } from "@/components/user/sidebar";
import { VideoPageContent } from "@/components/user/videocontent";
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
      <VideoPageContent topic={topic} />
    </div>
  );
}
