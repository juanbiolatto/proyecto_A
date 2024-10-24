import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI: string | undefined = process.env.URI as string;

if (!URI) {
    throw new Error("No URI found in .env file");
}

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected...");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        } else {
            console.error("Unknown error:", error);
        }
        process.exit(1);
    }
};

export default connectDB;
