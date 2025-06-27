import { Sidebar } from "@/components/user/sidebar";
import { VideoPageContent } from "@/components/user/videocontent";
import { VideoPageTopCard } from "@/components/user/videopagetopcard";

export default function TopicPage({ params }: { params: { topic: string } }) {
  const { topic } = params;

  return (
    <div>
      <Sidebar />

      <VideoPageTopCard topic={topic} />
      <VideoPageContent topic={topic} />
    </div>
  );
}
