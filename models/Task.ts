import TaskDocument from "@/types/Task";
import mongoose, { Schema, model, Document, Types } from "mongoose";

const TaskSchema = new Schema<TaskDocument>(
    {
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        topic: {
            type: Schema.Types.ObjectId,
            ref: "Topic",
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
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

const TaskModel =
    mongoose.models?.Task || model<TaskDocument>("Task", TaskSchema);
export default TaskModel;
