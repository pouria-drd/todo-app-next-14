import mongoose from "mongoose";
const DB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(DB_URI as string);
        if (connection.readyState === 1) {
            return Promise.resolve(true);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default connectDB;
