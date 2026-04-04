import mongoose from 'mongoose';

//async (hàm bất đồng bộ) là gì?
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);

        console.log("Database connected successfully")
    } catch (error) {
        console.error("Database connected fail")
        process.exit(1);
    }
}