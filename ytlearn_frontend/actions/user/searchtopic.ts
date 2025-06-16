import axios from "axios";

export async function searchtopic(title: string) {
  try {
    const response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/topic/${title}`,
      { withCredentials: true }
    );

    return { topic: response.data.topics, error: null };
  } catch (error: any) {
    const msg = error.response.data.msg || "something went wrong !";
    return { error: msg };
  }
}
