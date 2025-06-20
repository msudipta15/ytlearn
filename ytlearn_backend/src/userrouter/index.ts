import { Router, Request } from "express";
import { getvideoid, getvideoinfo } from "../apicall";
import { userModel, topicModel, videoModel } from "../models/db";
import { checklink } from "../utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { adminauth } from "../middlewares/adminauth";

// Extend Express Request interface to include 'id'
declare module "express-serve-static-core" {
  interface Request {
    id?: string;
  }
}

dotenv.config();

const JWT_KEY = process.env.JWT_KEY;

const userrouter = Router();

// Admin signup
userrouter.post("/signup", async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.body.image;

  const hashpassword = await bcrypt.hash(password, 10);

  const checkuser = await userModel.findOne({
    email: email,
  });

  if (checkuser) {
    res.status(406).json({ msg: "Email already exists" });
    return;
  }

  try {
    await userModel.create({ email, name, image, password: hashpassword });
    res.status(200).json({ msg: "Sign up Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Admin Signin
userrouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (!JWT_KEY) {
    console.log({ JWT_KEY: JWT_KEY });
    return;
  }

  const finduser = await userModel.findOne({
    email,
  });

  if (!finduser) {
    res.status(406).json({ msg: "Email not found !" });
    return;
  }

  const validpassword = await bcrypt.compare(password, finduser.password!);

  if (!validpassword) {
    res.status(402).json({ msg: "Invalid Password !" });
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
        secure: false,
      })
      .status(200)
      .json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

userrouter.post("/logout", async function (req, res) {
  try {
    res.clearCookie("token", { path: "/", httpOnly: true, sameSite: "lax" });
    res.status(200).json({ msg: "Logout Successfull" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

userrouter.get("/info", adminauth, async function (req, res) {
  const id = req.id;
  const user = await userModel.findOne({ _id: id });
  if (!user) {
    res.status(402).json({ msg: "User not found" });
    return;
  }

  res.status(200).json({ user });
});

// Create a new topic

userrouter.post("/addtopic", adminauth, async function (req, res) {
  const title = req.body.title;
  const description = req.body.description;
  const userid = req.id;

  const duplicate = await topicModel.findOne({
    title: title,
    userid: userid,
  });

  if (duplicate) {
    res.status(500).json({ msg: "This topic already exists" });
    return;
  }

  try {
    const topic = await topicModel.create({
      title,
      description,
      userid,
    });
    res.status(200).json({ msg: `${topic.title} added to Topics` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Get all existing topics
userrouter.get("/topics", adminauth, async function (req, res) {
  const userid = req.id;

  try {
    const topics = await topicModel.find({ userid });
    if (topics.length === 0) {
      res.status(405).json({ msg: "You do not have any topic added" });
      return;
    }
    res.status(200).json({ topics: topics });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

// Get topic by id
userrouter.get("/gettopic/:id", adminauth, async function (req, res) {
  const id = req.params.id;
  const userid = req.id;
  const topic = await topicModel.findOne({
    _id: id,
    userid: userid,
  });

  if (!topic) {
    res.status(406).json({ msg: "No topic found" });
    return;
  }

  res.status(200).json({ topic });
});

// Edit topic title or description
userrouter.patch("/edittopic/:id", adminauth, async function (req, res) {
  const id = req.params.id;
  const title = req.body?.title;
  const description = req.body?.description;
  const userid = req.id;

  try {
    const topic = await topicModel.findOne({
      _id: id,
      userid: userid,
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
userrouter.delete("/deletetopic/:topic", adminauth, async function (req, res) {
  const id = req.params.topic;
  const userid = req.id;
  const topic = await topicModel.findOne({ _id: id, userid: userid });

  if (!topic) {
    res.status(406).json({ msg: "Topic not found" });
    return;
  }

  try {
    await topicModel.deleteOne({ _id: id, userid: userid });
    res.status(200).json({ msg: "Topic deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});

// Add video to a topic
userrouter.post("/addvideo", adminauth, async function (req, res) {
  const topic = req.body.topic;
  const link = req.body.link;
  const userid = req.id;

  const validlink = checklink(link);

  if (!validlink) {
    res.status(405).json({ msg: "Please provide a valid youtube link" });
    return;
  }

  const findtopic = await topicModel.findOne({
    _id: topic,
    userid: userid,
  });

  if (!findtopic) {
    res.status(405).json({ msg: "No topic found" });
    return;
  }

  const newvideoid = getvideoid(link);

  const duplicatevideo = findtopic.videos?.some((video) => {
    const existingvideoid = getvideoid(video.url);
    return newvideoid === existingvideoid;
  });

  if (duplicatevideo) {
    res.status(409).json({ msg: "Video already exists !" });
    return;
  }

  try {
    const videoinfo: any = await getvideoinfo(link);

    const newvideo = {
      channelname: videoinfo.channelTitle,
      title: videoinfo.title,
      views: videoinfo.viewCount,
      likes: videoinfo.likeCount,
      duration: videoinfo.duration,
      url: link,
      videoid: videoinfo.video_id,
    };

    console.log(newvideo);

    findtopic.videos?.push(newvideo);

    await findtopic.save();

    res.status(200).json({
      msg: `${videoinfo.title} video added to topic : ${findtopic.title}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong" });
  }
});

// Delete video from a topic
userrouter.delete(
  "/deletevideo/:topic/:video",
  adminauth,
  async function (req, res) {
    const topic_id = req.params.topic;
    const video_id = req.params.video;
    const userid = req.id;

    try {
      const response = await topicModel.updateOne(
        { _id: topic_id, userid: userid },
        { $pull: { videos: { _id: video_id } } }
      );

      if (response.modifiedCount === 0) {
        res.status(402).json({ msg: "Somethis went wrong" });
        return;
      }

      res.status(200).json({ msg: "Video deleted ! " });
      return;
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong" });
      return;
    }
  }
);

// Search for topic
userrouter.get("/topic/:title", adminauth, async function (req, res) {
  const query = req.params.title;
  const id = req.id;
  try {
    const regx = new RegExp(query, "i");

    const topics = await topicModel.find({
      $or: [{ title: regx }, { description: regx }],
      userid: id,
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

// Get videos of a topic
userrouter.get("/topics/:topic", adminauth, async function (req, res) {
  const topicid = req.params.topic;
  const id = req.id;

  try {
    const topic = await topicModel.findOne({ _id: topicid, userid: id });
    if (!topic) {
      res.status(402).json({ msg: "No topic found" });
      return;
    }

    const videos = topic.videos;

    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "something went wrong !" });
  }
});

export { userrouter };
