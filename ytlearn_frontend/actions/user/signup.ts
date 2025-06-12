import axios from "axios";

interface values {
  name: string;
  email: string;
  password: string;
}

export async function signup(values: values) {
  const email = values.email;
  const password = values.password;
  const name = values.name;
  try {
    const response = await axios.post<{ token: string }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}user/signup`,
      {
        email: email,
        password: password,
        name: name,
      }
    );

    console.log(response);

    return { success: "Sign up successfull" };
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.msg) {
      console.log(error.response.data.msg);

      return { error: error.response.data.msg };
    } else {
      return { error: "something went wrong" };
    }
  }
}
