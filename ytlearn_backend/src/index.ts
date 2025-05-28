import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import { getvideoinfo } from "./apicall";
import { videoModel } from "./models/db";

dotenv.config();

const app = express();

async function main() {
  if (!process.env.DB_URL) {
    console.log("Invalid Connection String !");
    return;
  }
  console.log("Connecting to database.....");
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
}

main();

app.use(express.json());

app.post("/api/v1/addvideo", async function (req, res) {
  const link: string = req.body.link;

  if (!link || !link.includes("youtube.com")) {
    res.json({ msg: "Invalid or empty YouTube link" });
    return;
  }
  const { title, channelTitle, viewCount, likeCount, duration } =
    await getvideoinfo(link);

  try {
    await videoModel.create({
      title: title,
      channelname: channelTitle,
      duration: duration,
      likes: likeCount,
      views: viewCount,
      url: link,
    });
    res.status(200).json({ msg: "Video Added" });
  } catch (error) {
    res.status(402).json({ msg: "something went wrong" });
  }
});

app.get("/api/v1/videos", async function (req, res) {
  const videos = await videoModel.find({});
  res.json({ videos });
});

app.listen(3000);
