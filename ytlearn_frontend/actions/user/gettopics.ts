import axios from "axios";

interface Topic {
  _id: string;
  title: string;
  description: string;
  userid: string;
}

export async function gettopics() {
  const topics = [];
  try {
    const response = await axios.get<{ topics: Topic[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopics`,
      { withCredentials: true }
    );
    return response.data.topics;
  } catch (error: any) {
    return error;
  }
}
