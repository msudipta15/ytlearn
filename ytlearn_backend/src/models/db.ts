import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, unique: true, required: true },
  duration: { type: String, optional: true },
  likes: { type: String, optional: true },
  views: { type: String, optional: true },
});

const topicSchema = new Schema({
  title: { type: String, unique: true, required: true },
  description: { type: String, unique: true },
  videos: [videoSchema],
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  thumbnail: { type: String, optional: true },
  level: { type: String },
  createdAt: { type: Date, default: Date.now() },
  topics: [topicSchema],
});

export const courseModel = mongoose.model("Course", courseSchema);
export const videoModel = mongoose.model("Video", videoSchema);
export const topicModel = mongoose.model("Topic", topicSchema);
