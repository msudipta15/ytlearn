import { Sidebar } from "@/components/user/sidebar";
import { VideoList } from "@/components/user/videolist";
import axios from "axios";

interface prop {
  params: {
    topic: string;
  };
}

export default async function TopicPage({ params }: prop) {
  const { topic } = await params;

  async function gettopicdetails(topic: string) {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopic/${topic}`,
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  gettopicdetails(topic);

  return (
    <div>
      <Sidebar />
      <div className="p-6 flex flex-col items-center gap-2 mt-10 justify-center">
        <h1 className="text-4xl font-semibold">React</h1>
        <p className="">This is about react</p>
      </div>
      <div className="py-4 px-8 w-full flex flex-col">
        <VideoList topicid={topic} />
      </div>
    </div>
  );
}
