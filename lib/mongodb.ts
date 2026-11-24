import dns from 'node:dns'

dns.setServers(['8.8.8.8', '8.8.4.4'])

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("MongoDB Connection Failed", error);
        throw error;
    }
};
