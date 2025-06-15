import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const api_key = process.env.YT_API_CODE;

function getvideoid(url: string) {
  if (url.includes("youtube.com")) {
    const p1 = url.split("v=")[1];
    const id = p1.split("&")[0];
    console.log(id);
    return id;
  }

  if (url.includes("youtu.be")) {
    const p1 = url.split("be/")[1];
    const id = p1.split("?")[0];
    console.log(id);
    return id;
  } else {
    return;
  }
}

interface data {
  items: [
    {
      snippet: { title: string; channelTitle: string };
      contentDetails: { duration: string };
      statistics: {
        viewCount: string;
        likeCount: string;
      };
    }
  ];
}

export async function getvideoinfo(url: string) {
  const video_id = getvideoid(url);
  const link = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${video_id}&key=${api_key}`;

  try {
    const response = await axios.get(link);
    const data = response.data as data;
    const channelTitle = data.items[0].snippet.channelTitle;
    const title = data.items[0].snippet.title;
    const viewCount = data.items[0].statistics.viewCount;
    const likeCount = data.items[0].statistics.likeCount;
    const duration = data.items[0].contentDetails.duration;

    return { channelTitle, title, viewCount, likeCount, duration };
  } catch (error) {
    return error;
  }
}
