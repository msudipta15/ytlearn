import { Sidebar } from "@/components/user/sidebar";

interface prop {
  params: {
    topic: string;
  };
}

export default function TopicPage({ params }: prop) {
  const topic = params.topic;

  return (
    <div>
      <Sidebar />
      <div className="p-6 flex flex-col items-center gap-2 mt-10 justify-center">
        <h1 className="text-4xl font-semibold">React</h1>
        <p className="">This is about react</p>
      </div>
      <div></div>
    </div>
  );
}
