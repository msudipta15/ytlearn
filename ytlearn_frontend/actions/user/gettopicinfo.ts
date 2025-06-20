import axios from "axios";

export async function gettopicdetails(topic: string) {
  try {
    console.log(topic);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/gettopic/${topic}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error;
  }
}
