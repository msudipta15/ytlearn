import axios from "axios";

interface values {
  username: string;
  password: string;
}

export async function signin(values: values) {
  const username = values.username;
  const password = values.password;
  try {
    const response = await axios.post(
      "http://localhost:3001/api/v1/admin/signin",
      {
        username: username,
        password: password,
      }
    );
    console.log("success", response.data);
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      console.log(error.response.data.msg);
    }
  }
}
