import { Document, Types } from "mongoose";

interface TopicDocument extends Document {
    title: string;
    user: Types.ObjectId;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    tasks?: Types.Array<Types.ObjectId>; // Optional field to store references to tasks
}

export default TopicDocument;
