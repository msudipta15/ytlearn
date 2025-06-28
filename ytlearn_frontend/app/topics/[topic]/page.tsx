import { Sidebar } from "@/components/user/sidebar";
import { VideoPageContent } from "@/components/user/videocontent";
import { VideoPageTopCard } from "@/components/user/videopagetopcard";

interface TopicPageProps {
  params: Promise<{ topic: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic } = await params;

  return (
    <div>
      <Sidebar />
      <VideoPageTopCard topic={topic} />
      <VideoPageContent topic={topic} />
    </div>
  );
}
