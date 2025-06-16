import axios from "axios";

interface Topic {
  _id: string;
  title: string;
  description: string;
  userid: string;
}

export async function gettopics() {
  try {
    const response = await axios.get<{ topics: Topic[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopics`,
      { withCredentials: true }
    );
    return { topics: response.data.topics };
  } catch (error: any) {
    const msg = error?.response?.data?.msg || "Something went wrong";
    return { topics: [], error: msg };
  }
}
