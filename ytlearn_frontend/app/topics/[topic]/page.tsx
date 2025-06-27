import { Sidebar } from "@/components/user/sidebar";
import { VideoPageContent } from "@/components/user/videocontent";
import { VideoPageTopCard } from "@/components/user/videopagetopcard";

type Props = {
  params: {
    topic: string;
  };
};

export default async function TopicPage({ params }: Props) {
  const { topic } = params;

  return (
    <div>
      <Sidebar />

      <VideoPageTopCard topic={topic} />
      <VideoPageContent topic={topic} />
    </div>
  );
}
