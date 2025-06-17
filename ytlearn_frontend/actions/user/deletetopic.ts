import axios from "axios";

export async function deletetopic(id: string) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/deletetopic/${id}`,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error;
  }
}
