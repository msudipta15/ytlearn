import axios from "axios";

interface values {
  username: string;
  password: string;
}

export async function signin(values: values) {
  const username = values.username;
  const password = values.password;
  try {
    const response = await axios.post<{ token: string }>(
      "http://localhost:3001/api/v1/admin/signin",
      {
        username: username,
        password: password,
      }
    );

    localStorage.setItem("token", response.data.token);

    return { success: "Sign in successfull" };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      console.log(error.response.data.msg);

      return { error: error.response.data.msg };
    } else {
      return { error: "something went wrong" };
    }
  }
}
