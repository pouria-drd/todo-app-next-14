import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
    _id: string;
    username: string;
    password: string;
    role: string; // Add role field
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

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
            enum: ["user", "admin"], // Optional: add roles you want to support
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
