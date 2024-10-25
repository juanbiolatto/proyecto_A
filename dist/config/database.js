"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const URI = process.env.URI;
if (!URI) {
    throw new Error("No URI found in .env file");
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(URI);
        console.log("MongoDB Connected...");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
        else {
            console.error("Unknown error:", error);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
