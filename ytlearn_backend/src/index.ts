import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userrouter } from "./userrouter";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://ytlearn-gamma.vercel.app",
  "https://www.ytlearn-gamma.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

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

app.use(cookieParser());

app.use("/api/v1/user", userrouter);

app.listen(3001);
