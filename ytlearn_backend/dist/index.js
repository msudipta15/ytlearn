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
const db_1 = require("./db");
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
app.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        const email = req.body.email;
        yield db_1.usermodel.create({
            name,
            email,
        });
        res.json({ msh: "done" });
    });
});
app.put("/delete", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.body.name;
        yield db_1.usermodel.deleteOne({
            name: name,
        });
        res.json({ msg: "deleted" });
    });
});
app.listen(3000);
