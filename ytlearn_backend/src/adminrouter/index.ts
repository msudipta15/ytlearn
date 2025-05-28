import { Router } from "express";
import { getvideoinfo } from "../apicall";
import { videoModel } from "../models/db";

const adminrouter = Router();

adminrouter.post("/addvideo", async function (req, res) {
  const link: string = req.body.link;

  if (!link || !link.includes("youtube.com")) {
    res.json({ msg: "Invalid or empty YouTube link" });
    return;
  }

  const duplicate = await videoModel.findOne({
    url: link,
  });

  if (duplicate) {
    res.status(500).json({ msg: "This video already exists" });
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

adminrouter.post("/createtopic", async function (req, res) {});

export { adminrouter };
