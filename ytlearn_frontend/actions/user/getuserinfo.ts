import axios from "axios";

export async function getuserinfo() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/info`,
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    return error;
  }
}
