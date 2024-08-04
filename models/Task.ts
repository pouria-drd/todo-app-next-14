import mongoose, { Schema, model, Document, Types } from "mongoose";

interface TaskDocument extends Document {
    content: string;
    topic: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isCompleted: boolean;
}

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
