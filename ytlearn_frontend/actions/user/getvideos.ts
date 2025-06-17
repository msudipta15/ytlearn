import axios from "axios";

export async function getvideos() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}user/info`
  );
}
