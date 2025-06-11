import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true },
  channelname: { type: String },
  url: { type: String, required: true },
  duration: { type: String, optional: true },
  likes: { type: String, optional: true },
  views: { type: String, optional: true },
  date: { type: Date, default: Date.now() },
});

const topicSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String },
  videos: { type: [videoSchema], default: [], required: false },
  userid: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, optional: true },
});

export const videoModel = mongoose.model("Video", videoSchema);
export const topicModel = mongoose.model("Topic", topicSchema);
export const userModel = mongoose.model("User", userSchema);
