import UserDocument from "@/types/User";
import mongoose, { Schema, model, Document } from "mongoose";

const UserSchema = new Schema<UserDocument>(
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

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
