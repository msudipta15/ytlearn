import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { adminrouter } from "./adminrouter";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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

app.use("/api/v1/admin", adminrouter);

app.listen(3001);
