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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const userrouter_1 = require("./userrouter");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "https://ytlearn-8ufw.vercel.app",
];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!process.env.DB_URL) {
            console.log("Invalid Connection String !");
            return;
        }
        console.log("Connecting to database.....");
        try {
            yield mongoose_1.default.connect(process.env.DB_URL);
            console.log("Connected");
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/user", userrouter_1.userrouter);
app.listen(3001);
