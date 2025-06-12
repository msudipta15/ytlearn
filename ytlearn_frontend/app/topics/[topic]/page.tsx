interface prop {
  params: {
    topic: string;
  };
}

export default function TopicPage({ params }: prop) {
  const topic = params.topic;

  return <div>{topic}</div>;
}
