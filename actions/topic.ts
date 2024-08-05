"use server";

import connectDB from "@/lib/mongodb";
import TopicModel from "@/models/Topic";
import { authOptions } from "@/lib/auth";
import TopicDocument from "@/types/Topic";
import { getServerSession } from "next-auth";

type GetTopicsResponse = TopicDocument[] | { error: string };

export const getTopics = async (): Promise<GetTopicsResponse> => {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    // Connect to the database
    await connectDB();

    try {
        // Find all active topics for the authenticated user
        const topics: TopicDocument[] = await TopicModel.find({
            user: session.user.id,
            isActive: true,
        });

        // Return the list of topics directly
        return topics;
    } catch (e) {
        // Handle errors
        return {
            error: "Error fetching topics",
        };
    }
};

type GetTopicByIdResponse = TopicDocument | { error: string };

export const getTopicById = async (
    topicID: string
): Promise<GetTopicByIdResponse> => {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic: TopicDocument = await TopicModel.findOne({
            _id: topicID,
            isActive: true,
        }).populate({
            path: "tasks",
            match: { isActive: true }, // Filter to include only active tasks
            select: "content isActive isCompleted createdAt topic", // Select fields to return
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return {
                error: "Topic not found",
            };
        }

        // Return the topic data including only active tasks
        return topic;
    } catch (error) {
        // Handle errors
        return {
            error: "Error fetching topic",
        };
    }
};

type UpdateTopicByIdResponse = TopicDocument | { error: string };

export const updateTopicById = async (
    topicID: string,
    data: { title: string }
): Promise<UpdateTopicByIdResponse> => {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic = await TopicModel.findOne({
            _id: topicID,
            isActive: true,
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return {
                error: "Topic not found",
            };
        }

        // Update the topic title
        const { title } = data;
        if (title) {
            topic.title = title;
            await topic.save();
            return topic;
        } else {
            return { error: "Invalid data" };
        }
    } catch (error) {
        // Handle errors
        return { error: "Error updating topic" };
    }
};

type DeactivateTopicByIdResponse = { message: string } | { error: string };

export const deactivateTopicById = async (
    topicID: string
): Promise<DeactivateTopicByIdResponse> => {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return {
            error: "Unauthorized",
        };
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic = await TopicModel.findOne({
            _id: topicID,
            isActive: true,
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return {
                error: "Topic not found",
            };
        }

        // Deactivate the topic instead of deleting it
        topic.isActive = false;
        await topic.save();
        return {
            message: "Topic deactivated",
        };
    } catch (error) {
        // Handle errors
        return {
            error: "Error deactivating topic",
        };
    }
};
