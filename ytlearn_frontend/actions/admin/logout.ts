import axios from "axios";

export async function logout() {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user/logout`,
    {},
    { withCredentials: true }
  );
}
