import { Router } from "express";
import { getvideoinfo } from "../apicall";
import { topicModel, videoModel } from "../models/db";
import { checklink } from "../utils";

const adminrouter = Router();

// Add a video
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

// Create a new topic
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

// Get all existing topics
adminrouter.get("/gettopics", async function (req, res) {
  const topics = await topicModel.find({});
  res.status(200).json({ topics });
});

// Get topic by id
adminrouter.get("/gettopic/:id", async function (req, res) {
  const id = req.params.id;
  const topic = await topicModel.findOne({
    _id: id,
  });

  if (!topic) {
    res.status(406).json({ msg: "No topic found" });
    return;
  }

  res.status(200).json({ topic });
});

// Edit topic title or description
adminrouter.patch("/edittopic/:id", async function (req, res) {
  const id = req.params.id;
  const title = req.body?.title;
  const description = req.body?.description;

  try {
    const topic = await topicModel.findOne({
      _id: id,
    });
    if (!topic) {
      res.status(402).json({ msg: "No topic found" });
      return;
    }
    if (title && description) {
      await topicModel.updateOne({
        title: title,
        description: description,
      });

      res.status(200).json({ msg: "Topic Updated" });
    } else {
      res.status(500).json({ msg: "Title and description can not be empty" });
    }
  } catch (error) {
    res.status(500).json({ msg: "something went wrong" });
  }
});

// Delete a topic by id
adminrouter.delete("/deletetopic/:topic", async function (req, res) {
  const id = req.params.topic;
  const topic = await topicModel.findOne({ _id: id });

  if (!topic) {
    res.status(406).json({ msg: "Topic not found" });
    return;
  }

  try {
    await topicModel.deleteOne({ _id: id });
    res.status(200).json({ msg: "Topic deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Add video to a topic
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
    _id: topic,
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

// Delete video from a topic
adminrouter.delete("/deletevideo/:topic/:video", async function (req, res) {
  const topic_id = req.params.topic;
  const video_id = req.params.video;

  try {
    const response = await topicModel.updateOne(
      { _id: topic_id },
      { $pull: { videos: { _id: video_id } } }
    );

    console.log(response);

    if (response.modifiedCount === 0) {
      res.status(402).json({ msg: "Somethis went wrong" });
    }

    res.status(200).json({ msg: "Video deleted " });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Search for topic
adminrouter.get("/topic/:q", async function (req, res) {
  const query = req.params.q;
  try {
    const regx = new RegExp(query, "i");

    const topics = await topicModel.find({
      $or: [{ title: regx }, { description: regx }],
    });

    if (topics.length === 0) {
      res.status(402).json({ msg: "No topic found" });
      return;
    }

    res.status(200).json({ topics });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

export { adminrouter };
