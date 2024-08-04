import UserDocument from "../types/User";
import mongoose, { Schema, model } from "mongoose";

const UserModelSchema = new Schema<UserDocument>(
    {
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "admin"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel =
    mongoose.models?.User || model<UserDocument>("User", UserModelSchema);
export default UserModel;

export async function getUsers(): Promise<UserDocument[]> {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        const users = await UserModel.find().exec();

        const result = users.map((user) => ({
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            createdAt: user.createdAt.toISOString(),
            updatedAt: user.updatedAt.toISOString(),
            role: user.role,
            isActive: user.isActive,
        }));

        return result;
    } catch (error) {
        console.error("Error fetching users: ", error);
        throw new Error("Could not fetch users.");
    } finally {
        await mongoose.disconnect();
    }
}
