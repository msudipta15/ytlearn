import axios from "axios";

export async function searchtopic(title: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/topic/${title}`,
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return error;
  }
}
