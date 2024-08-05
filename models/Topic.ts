import TopicDocument from "@/types/Topic";
import mongoose, { Schema, model } from "mongoose";

const TopicModelSchema = new Schema<TopicDocument>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        tasks: [
            {
                // Reference to tasks
                type: Schema.Types.ObjectId,
                ref: "Task",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const TopicModel =
    mongoose.models?.Topic || model<TopicDocument>("Topic", TopicModelSchema);
export default TopicModel;
