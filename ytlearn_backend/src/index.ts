import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

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

async function getvideodetails() {
  if (!process.env.YT_API_CODE) {
    console.log("Invalid youtube Api key");
    return;
  }
  let link =
    "https://www.youtube.com/watch?v=iVCzmDwIQpA&t=939s&ab_channel=ChaiaurCode";

  const api_key: String = process.env.YT_API_CODE;
  const videoid = link.split("=")[1];

  const response =
    await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=YOUR_API_KEY
     &part=snippet,statistics&fields=items(id,snippet,statistics)`);
}

app.post("/api/v1/addvideo", async function (req, res) {
  const link = req.body.link;
});

app.listen(3000);
