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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminrouter = void 0;
const express_1 = require("express");
const apicall_1 = require("../apicall");
const db_1 = require("../models/db");
const adminrouter = (0, express_1.Router)();
exports.adminrouter = adminrouter;
adminrouter.post("/addvideo", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = req.body.link;
        if (!link || !link.includes("youtube.com")) {
            res.json({ msg: "Invalid or empty YouTube link" });
            return;
        }
        const duplicate = yield db_1.videoModel.findOne({
            url: link,
        });
        if (duplicate) {
            res.status(500).json({ msg: "This video already exists" });
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
            res.status(200).json({ msg: "Video Added" });
        }
        catch (error) {
            res.status(402).json({ msg: "something went wrong" });
        }
    });
});
adminrouter.post("/createtopic", function (req, res) {
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
