import { Router } from "express";
import { getvideoinfo } from "../apicall";
import { topicModel, videoModel } from "../models/db";
import { checklink } from "../utils";

const adminrouter = Router();

adminrouter.post("/addvideo", async function (req, res) {
  const link: string = req.body.link;

  const validlink = checklink(link);

  if (!validlink) {
    res.json({ msg: "Please provide a valid youtube link" });
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

adminrouter.post("/createtopic", async function (req, res) {
  const title = req.body.title;
  const description = req.body.description;

  const duplicate = await topicModel.findOne({
    title: title,
  });

  if (duplicate) {
    res.status(500).json({ msg: "This topic already exists" });
    return;
  }

  try {
    const topic = await topicModel.create({
      title,
      description,
    });
    res.status(200).json({ msg: `${topic.title} added to Topics` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

adminrouter.get("/gettopics", async function (req, res) {
  const topics = await topicModel.find({});
  res.status(200).json({ topics });
});

adminrouter.post("/addvideo/:topic", async function (req, res) {
  const topic = req.params.topic;
  const link = req.body.link;

  const validlink = checklink(link);

  if (!validlink) {
    res.json({ msg: "Please provide a valid youtube link" });
    return;
  }

  console.log(topic);

  const findtopic = await topicModel.findOne({
    title: topic,
  });

  if (!findtopic) {
    res.json({ msg: "No topic found" });
    return;
  }

  try {
    const videoinfo = await getvideoinfo(link);

    const newvideo = {
      channelTitle: videoinfo.channelTitle,
      title: videoinfo.title,
      viewCount: videoinfo.viewCount,
      likeCount: videoinfo.likeCount,
      duration: videoinfo.duration,
      url: link,
    };

    findtopic.videos?.push(newvideo);

    await findtopic.save();

    res.json({ msg: `${videoinfo.title} video added to topic : ${topic}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

export { adminrouter };
