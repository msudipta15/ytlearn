import { Router } from "express";
import { getvideoinfo } from "../apicall";
import { adminModel, topicModel, videoModel } from "../models/db";
import { checklink } from "../utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { adminauth } from "../middlewares/adminauth";

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const adminrouter = Router();

// Admin signup
adminrouter.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const hashpassword = await bcrypt.hash(password, 10);

  const checkuser = await adminModel.findOne({
    username: username,
  });

  if (checkuser) {
    res.status(406).json({ msg: "username already exists" });
    return;
  }

  try {
    await adminModel.create({ username: username, password: hashpassword });
    res.status(200).json({ msg: "Admin Sign up Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Admin Signin
adminrouter.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!JWT_KEY) {
    console.log({ JWT_KEY: JWT_KEY });
    return;
  }

  const finduser = await adminModel.findOne({
    username: username,
  });

  if (!finduser) {
    res.status(406).json({ msg: "username not found" });
    return;
  }

  const validpassword = await bcrypt.compare(password, finduser.password!);

  if (!validpassword) {
    res.status(402).json({ msg: "Invalid Password" });
    return;
  }

  try {
    const token = jwt.sign({ id: finduser._id.toString() }, JWT_KEY);
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
        path: "/",
        sameSite: "lax",
      })
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

// Add a video
adminrouter.post("/addvideo", adminauth, async function (req, res) {
  const link: string = req.body.link;

  const validlink = checklink(link);

  if (!validlink) {
    res.status(406).json({ msg: "Please provide a valid youtube link" });
    return;
  }

  const duplicate = await videoModel.findOne({
    url: link,
  });

  if (duplicate) {
    res.status(402).json({ msg: "This video already exists" });
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
    res.status(200).json({ msg: `"${title}" video added` });
  } catch (error) {
    res.status(402).json({ msg: "something went wrong" });
  }
});

// Create a new topic
adminrouter.post("/addtopic", adminauth, async function (req, res) {
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
adminrouter.get("/gettopics", adminauth, async function (req, res) {
  const topics = await topicModel.find({});
  res.status(200).json({ topics });
});

// Get topic by id
adminrouter.get("/gettopic/:id", adminauth, async function (req, res) {
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
adminrouter.patch("/edittopic/:id", adminauth, async function (req, res) {
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
adminrouter.delete("/deletetopic/:topic", adminauth, async function (req, res) {
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
adminrouter.post("/addvideo/:topic", adminauth, async function (req, res) {
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
adminrouter.delete(
  "/deletevideo/:topic/:video",
  adminauth,
  async function (req, res) {
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
  }
);

// Search for topic
adminrouter.get("/topic/:q", adminauth, async function (req, res) {
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
