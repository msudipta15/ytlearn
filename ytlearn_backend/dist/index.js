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
const adminrouter_1 = require("./adminrouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
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
app.use("/api/v1/admin", adminrouter_1.adminrouter);
app.listen(3000);
