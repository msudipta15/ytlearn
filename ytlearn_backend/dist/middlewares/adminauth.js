"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminauth = adminauth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function adminauth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        res.status(406).json({ msg: "You are not signed in" });
        return;
    }
    const jwt_secret = process.env.JWT_KEY;
    if (!jwt_secret) {
        console.log("undefined jwt key");
        return;
    }
    const validate = jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.toString(), jwt_secret);
    if (validate) {
        req.id = validate.id;
        next();
    }
    else {
        res.status(406).json({ msg: "You are not signed in" });
    }
}
