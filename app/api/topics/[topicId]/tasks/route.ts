import connectDB from "@/lib/mongodb";
import TaskModel from "@/models/Task";
import TopicModel from "@/models/Topic";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to fetch all tasks for a specific topic.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing topicId.
 * @returns A JSON response with the list of tasks or an error message.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // Retrieve the current session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by its ID and ensure it belongs to the user and is active
        const topic = await TopicModel.findOne({
            _id: params.topicId,
            user: session.user.id,
            isActive: true,
        });

        // Check if the topic exists
        if (!topic) {
            return NextResponse.json(
                { message: "Topic not found" },
                { status: 404 }
            );
        }

        // Find all tasks associated with the topic and ensure they are active
        const tasks = await TaskModel.find({
            topic: params.topicId,
            isActive: true,
        });

        // Return the list of tasks
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        return NextResponse.json(
            { message: "Error fetching tasks", error },
            { status: 500 }
        );
    }
}

/**
 * Handles POST requests to create a new task for a specific topic.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing topicId.
 * @returns A JSON response with the created task or an error message.
 */
export async function POST(
    request: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // Retrieve the current session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Parse the request body to get task content
        const { content } = await request.json();

        // Find the topic by its ID and ensure it belongs to the user and is active
        const topic = await TopicModel.findOne({
            _id: params.topicId,
            user: session.user.id,
            isActive: true,
        });

        // Check if the topic exists
        if (!topic) {
            return NextResponse.json(
                { message: "Topic not found" },
                { status: 404 }
            );
        }

        // Create a new task with the provided content and associate it with the topic
        const newTask = new TaskModel({ content, topic: params.topicId });

        // Save the new task to the database
        await newTask.save();

        // Add the new task's ID to the topic's tasks array and save the topic
        topic.tasks.push(newTask._id);
        await topic.save();

        // Return the newly created task
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        // Handle any errors that occur during the creation operation
        return NextResponse.json(
            { message: "Error creating task", error },
            { status: 500 }
        );
    }
}
