import axios from "axios";

interface values {
  title: string;
  description: string;
}

export async function addtopic(values: values) {
  const title = values.title;
  const description = values.description;

  const response = await axios.post(
    `${process.env.BACKEND_URL}admin/addtopic`,
    { title, description }
  );

  console.log(response);
}
