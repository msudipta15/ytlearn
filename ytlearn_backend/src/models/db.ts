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
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String, optional: true },
  createdAt: { type: Date, default: Date.now() },
  difficulty: { type: String },
  topics: [topicSchema],
});

const adminSchema = new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email: { type: String, required: false },
});

export const courseModel = mongoose.model("Course", courseSchema);
export const videoModel = mongoose.model("Video", videoSchema);
export const topicModel = mongoose.model("Topic", topicSchema);
export const adminModel = mongoose.model("Admin", adminSchema);
