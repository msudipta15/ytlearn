import { Sidebar } from "@/components/user/sidebar";
import { VideoPageContent } from "@/components/user/videocontent";
import { VideoPageTopCard } from "@/components/user/videopagetopcard";
import { type NextPage } from "next";

interface TopicPageProps {
  params: { topic: string };
}

const TopicPage: NextPage<TopicPageProps> = ({ params }) => {
  const { topic } = params;

  return (
    <div>
      <Sidebar />
      <VideoPageTopCard topic={topic} />
      <VideoPageContent topic={topic} />
    </div>
  );
};

export default TopicPage;
