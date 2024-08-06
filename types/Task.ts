import { Document, Types } from "mongoose";

interface TaskDocument extends Document {
    content: string;
    topic: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isCompleted: boolean;
}

export default TaskDocument;
