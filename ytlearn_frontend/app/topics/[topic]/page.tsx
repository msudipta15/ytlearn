import { Sidebar } from "@/components/user/sidebar";
import { VideoPageContent } from "@/components/user/videocontent";
import { VideoPageTopCard } from "@/components/user/videopagetopcard";

interface TopicPageProps {
  params: {
    topic: string;
  };
}

export default function TopicPage({ params }: TopicPageProps) {
  const { topic } = params;

  return (
    <div>
      <Sidebar />
      <VideoPageTopCard topic={topic} />
      <VideoPageContent topic={topic} />
    </div>
  );
}
