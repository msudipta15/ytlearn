import axios from "axios";

export async function addtopic(title: string, description: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}admin/addtopic`,
      { title, description }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}
