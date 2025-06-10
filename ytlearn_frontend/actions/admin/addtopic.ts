import axios from "axios";

export async function addtopic(title: string, description: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/addtopic`,
      { title, description },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      return { error: error.response.data.msg };
    } else {
      return { error: "Something went wrong" };
    }
  }
}
