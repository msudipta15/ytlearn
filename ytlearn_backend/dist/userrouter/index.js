"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userrouter = void 0;
const express_1 = require("express");
const apicall_1 = require("../apicall");
const db_1 = require("../models/db");
const utils_1 = require("../utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const adminauth_1 = require("../middlewares/adminauth");
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_KEY;
const userrouter = (0, express_1.Router)();
exports.userrouter = userrouter;
// Admin signup
userrouter.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const image = req.body.image;
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const checkuser = yield db_1.userModel.findOne({
            email: email,
        });
        if (checkuser) {
            res.status(406).json({ msg: "Email already exists" });
            return;
        }
        try {
            yield db_1.userModel.create({ email, name, image, password: hashpassword });
            res.status(200).json({ msg: "Sign up Successfull" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Admin Signin
userrouter.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        if (!JWT_KEY) {
            console.log({ JWT_KEY: JWT_KEY });
            return;
        }
        const finduser = yield db_1.userModel.findOne({
            email,
        });
        if (!finduser) {
            res.status(406).json({ msg: "Email not found !" });
            return;
        }
        const validpassword = yield bcrypt_1.default.compare(password, finduser.password);
        if (!validpassword) {
            res.status(402).json({ msg: "Invalid Password !" });
            return;
        }
        try {
            const token = jsonwebtoken_1.default.sign({ id: finduser._id.toString() }, JWT_KEY);
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
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong !" });
        }
    });
});
userrouter.post("/logout", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie("token", { path: "/", httpOnly: true, sameSite: "lax" });
            res.status(200).json({ msg: "Logout Successfull" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong !" });
        }
    });
});
// Add a video
userrouter.post("/addvideo", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        const validlink = (0, utils_1.checklink)(link);
        if (!validlink) {
            res.status(406).json({ msg: "Please provide a valid youtube link" });
            return;
        }
        const duplicate = yield db_1.videoModel.findOne({
            url: link,
        });
        if (duplicate) {
            res.status(402).json({ msg: "This video already exists" });
            return;
        }
        const { title, channelTitle, viewCount, likeCount, duration } = (yield (0, apicall_1.getvideoinfo)(link));
        try {
            yield db_1.videoModel.create({
                title: title,
                channelname: channelTitle,
                duration: duration,
                likes: likeCount,
                views: viewCount,
                url: link,
            });
            res.status(200).json({ msg: `"${title}" video added` });
        }
        catch (error) {
            res.status(402).json({ msg: "something went wrong" });
        }
    });
});
// Create a new topic
userrouter.post("/addtopic", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.body.title;
        const description = req.body.description;
        const userid = req.id;
        const duplicate = yield db_1.topicModel.findOne({
            title: title,
            userid: userid,
        });
        if (duplicate) {
            res.status(500).json({ msg: "This topic already exists" });
            return;
        }
        try {
            const topic = yield db_1.topicModel.create({
                title,
                description,
                userid,
            });
            res.status(200).json({ msg: `${topic.title} added to Topics` });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Get all existing topics
userrouter.get("/gettopics", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userid = req.id;
        try {
            const topics = yield db_1.topicModel.find({ userid });
            if (topics.length === 0) {
                res.status(405).json({ msg: "You do not have any topic added" });
            }
            res.status(200).json({ topics: topics });
        }
        catch (error) {
            res.status(500).json({ msg: "Something went wrong !" });
        }
    });
});
// Get topic by id
userrouter.get("/gettopic/:id", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const userid = req.id;
        const topic = yield db_1.topicModel.findOne({
            _id: id,
            userid: userid,
        });
        if (!topic) {
            res.status(406).json({ msg: "No topic found" });
            return;
        }
        res.status(200).json({ topic });
    });
});
// Edit topic title or description
userrouter.patch("/edittopic/:id", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const id = req.params.id;
        const title = (_a = req.body) === null || _a === void 0 ? void 0 : _a.title;
        const description = (_b = req.body) === null || _b === void 0 ? void 0 : _b.description;
        const userid = req.id;
        try {
            const topic = yield db_1.topicModel.findOne({
                _id: id,
                userid: userid,
            });
            if (!topic) {
                res.status(402).json({ msg: "No topic found" });
                return;
            }
            if (title && description) {
                yield db_1.topicModel.updateOne({
                    title: title,
                    description: description,
                });
                res.status(200).json({ msg: "Topic Updated" });
            }
            else {
                res.status(500).json({ msg: "Title and description can not be empty" });
            }
        }
        catch (error) {
            res.status(500).json({ msg: "something went wrong" });
        }
    });
});
// Delete a topic by id
userrouter.delete("/deletetopic/:topic", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.topic;
        const userid = req.id;
        const topic = yield db_1.topicModel.findOne({ _id: id, userid: userid });
        if (!topic) {
            res.status(406).json({ msg: "Topic not found" });
            return;
        }
        try {
            yield db_1.topicModel.deleteOne({ _id: id, userid: userid });
            res.status(200).json({ msg: "Topic deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Add video to a topic
userrouter.post("/addvideo", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const topic = req.body.topic;
        const link = req.body.link;
        const userid = req.id;
        const validlink = (0, utils_1.checklink)(link);
        if (!validlink) {
            res.status(405).json({ msg: "Please provide a valid youtube link" });
            return;
        }
        const findtopic = yield db_1.topicModel.findOne({
            _id: topic,
            userid: userid,
        });
        if (!findtopic) {
            res.status(405).json({ msg: "No topic found" });
            return;
        }
        try {
            const videoinfo = yield (0, apicall_1.getvideoinfo)(link);
            const newvideo = {
                channelTitle: videoinfo.channelTitle,
                title: videoinfo.title,
                viewCount: videoinfo.viewCount,
                likeCount: videoinfo.likeCount,
                duration: videoinfo.duration,
                url: link,
            };
            (_a = findtopic.videos) === null || _a === void 0 ? void 0 : _a.push(newvideo);
            yield findtopic.save();
            res
                .status(200)
                .json({ msg: `${videoinfo.title} video added to topic : ${topic}` });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "something went wrong" });
        }
    });
});
// Delete video from a topic
userrouter.delete("/deletevideo/:topic/:video", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const topic_id = req.params.topic;
        const video_id = req.params.video;
        const userid = req.id;
        try {
            const response = yield db_1.topicModel.updateOne({ _id: topic_id, userid: userid }, { $pull: { videos: { _id: video_id } } });
            if (response.modifiedCount === 0) {
                res.status(402).json({ msg: "Somethis went wrong" });
                return;
            }
            res.status(200).json({ msg: "Video deleted ! " });
        }
        catch (error) {
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Search for topic
userrouter.get("/topic/:q", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.params.q;
        try {
            const regx = new RegExp(query, "i");
            const topics = yield db_1.topicModel.find({
                $or: [{ title: regx }, { description: regx }],
            });
            if (topics.length === 0) {
                res.status(402).json({ msg: "No topic found" });
                return;
            }
            res.status(200).json({ topics });
        }
        catch (error) {
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
