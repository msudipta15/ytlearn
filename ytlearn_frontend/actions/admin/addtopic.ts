import axios from "axios";

interface values {
  title: string;
  description: string;
}

export async function addtopic(values: values) {
  const title = values.title;
  const description = values.description;

  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}admin/addtopic`,
      { title, description }
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
