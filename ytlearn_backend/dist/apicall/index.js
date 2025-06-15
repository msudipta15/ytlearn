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
exports.getvideoinfo = getvideoinfo;
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const api_key = process.env.YT_API_CODE;
function getvideoid(url) {
    if (url.includes("youtube.com")) {
        const p1 = url.split("v=")[1];
        const id = p1.split("&")[0];
        console.log(id);
        return id;
    }
    if (url.includes("youtu.be")) {
        const p1 = url.split("be/")[1];
        const id = p1.split("?")[0];
        console.log(id);
        return id;
    }
    else {
        return;
    }
}
function getvideoinfo(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const video_id = getvideoid(url);
        const link = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${video_id}&key=${api_key}`;
        try {
            const response = yield axios_1.default.get(link);
            const data = response.data;
            const channelTitle = data.items[0].snippet.channelTitle;
            const title = data.items[0].snippet.title;
            const viewCount = data.items[0].statistics.viewCount;
            const likeCount = data.items[0].statistics.likeCount;
            const duration = data.items[0].contentDetails.duration;
            return { channelTitle, title, viewCount, likeCount, duration };
        }
        catch (error) {
            return error;
        }
    });
}
