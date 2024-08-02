import mongoose, { Schema, model, Document, Types } from "mongoose";

interface TaskDocument extends Document {
    description: string;
    topic: Types.ObjectId;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema = new Schema<TaskDocument>(
    {
        description: {
            type: String,
            required: [true, "Description is required"],
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
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.models?.Task || model<TaskDocument>("Task", TaskSchema);
export default Task;
