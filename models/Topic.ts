import mongoose, { Schema, model, Document, Types } from "mongoose";

interface TopicDocument extends Document {
    title: string;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const TopicSchema = new Schema<TopicDocument>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Topic =
    mongoose.models?.Topic || model<TopicDocument>("Topic", TopicSchema);
export default Topic;
