import axios from "axios";

interface addvideoprops {
  link: string;
  topic: string;
}

export async function addvideo({ link, topic }: addvideoprops) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/addvideo`,
      {
        link,
        topic,
      },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error;
  }
}
