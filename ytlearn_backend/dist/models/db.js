"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.topicModel = exports.videoModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const videoSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    videoid: { type: String },
    channelname: { type: String },
    url: { type: String, required: true },
    duration: { type: String, optional: true },
    likes: { type: String, optional: true },
    views: { type: String, optional: true },
    date: { type: Date, default: Date.now() },
});
const topicSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, default: "Watch the best videos from Youtube" },
    videos: { type: [videoSchema], default: [], required: false },
    userid: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" },
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, optional: true },
});
exports.videoModel = mongoose_1.default.model("Video", videoSchema);
exports.topicModel = mongoose_1.default.model("Topic", topicSchema);
exports.userModel = mongoose_1.default.model("User", userSchema);
