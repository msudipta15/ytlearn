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
exports.adminrouter = void 0;
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
const adminrouter = (0, express_1.Router)();
exports.adminrouter = adminrouter;
// Admin signup
adminrouter.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        const hashpassword = yield bcrypt_1.default.hash(password, 10);
        const checkuser = yield db_1.adminModel.findOne({
            username: username,
        });
        if (checkuser) {
            res.status(406).json({ msg: "username already exists" });
            return;
        }
        try {
            yield db_1.adminModel.create({ username: username, password: hashpassword });
            res.status(200).json({ msg: "Admin Sign up Successfull" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Admin Signin
adminrouter.post("/signin", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const password = req.body.password;
        if (!JWT_KEY) {
            console.log({ JWT_KEY: JWT_KEY });
            return;
        }
        const finduser = yield db_1.adminModel.findOne({
            username: username,
        });
        if (!finduser) {
            res.status(406).json({ msg: "username not found" });
            return;
        }
        const validpassword = yield bcrypt_1.default.compare(password, finduser.password);
        if (!validpassword) {
            res.status(402).json({ msg: "Invalid Password" });
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
adminrouter.post("/logout", function (req, res) {
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
adminrouter.post("/addvideo", adminauth_1.adminauth, function (req, res) {
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
        const { title, channelTitle, viewCount, likeCount, duration } = yield (0, apicall_1.getvideoinfo)(link);
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
adminrouter.post("/addtopic", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const title = req.body.title;
        const description = req.body.description;
        const duplicate = yield db_1.topicModel.findOne({
            title: title,
        });
        if (duplicate) {
            res.status(500).json({ msg: "This topic already exists" });
            return;
        }
        try {
            const topic = yield db_1.topicModel.create({
                title,
                description,
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
adminrouter.get("/gettopics", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const topics = yield db_1.topicModel.find({});
        res.status(200).json({ topics });
    });
});
// Get topic by id
adminrouter.get("/gettopic/:id", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const topic = yield db_1.topicModel.findOne({
            _id: id,
        });
        if (!topic) {
            res.status(406).json({ msg: "No topic found" });
            return;
        }
        res.status(200).json({ topic });
    });
});
// Edit topic title or description
adminrouter.patch("/edittopic/:id", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const id = req.params.id;
        const title = (_a = req.body) === null || _a === void 0 ? void 0 : _a.title;
        const description = (_b = req.body) === null || _b === void 0 ? void 0 : _b.description;
        try {
            const topic = yield db_1.topicModel.findOne({
                _id: id,
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
adminrouter.delete("/deletetopic/:topic", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.topic;
        const topic = yield db_1.topicModel.findOne({ _id: id });
        if (!topic) {
            res.status(406).json({ msg: "Topic not found" });
            return;
        }
        try {
            yield db_1.topicModel.deleteOne({ _id: id });
            res.status(200).json({ msg: "Topic deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Add video to a topic
adminrouter.post("/addvideo/:topic", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const topic = req.params.topic;
        const link = req.body.link;
        const validlink = (0, utils_1.checklink)(link);
        if (!validlink) {
            res.json({ msg: "Please provide a valid youtube link" });
            return;
        }
        console.log(topic);
        const findtopic = yield db_1.topicModel.findOne({
            _id: topic,
        });
        if (!findtopic) {
            res.json({ msg: "No topic found" });
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
            res.json({ msg: `${videoinfo.title} video added to topic : ${topic}` });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "something went wrong" });
        }
    });
});
// Delete video from a topic
adminrouter.delete("/deletevideo/:topic/:video", adminauth_1.adminauth, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const topic_id = req.params.topic;
        const video_id = req.params.video;
        try {
            const response = yield db_1.topicModel.updateOne({ _id: topic_id }, { $pull: { videos: { _id: video_id } } });
            console.log(response);
            if (response.modifiedCount === 0) {
                res.status(402).json({ msg: "Somethis went wrong" });
            }
            res.status(200).json({ msg: "Video deleted " });
        }
        catch (error) {
            res.status(500).json({ msg: "Something went wrong" });
        }
    });
});
// Search for topic
adminrouter.get("/topic/:q", adminauth_1.adminauth, function (req, res) {
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
