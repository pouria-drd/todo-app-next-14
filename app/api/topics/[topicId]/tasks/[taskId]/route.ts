import connectDB from "@/lib/mongodb";
import TaskModel from "@/models/Task";
import TopicModel from "@/models/Topic";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles GET requests to fetch a specific task by its ID within a specific topic.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing topicId and taskId.
 * @returns A JSON response with the task data or an error message.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { topicId: string; taskId: string } }
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

        // Find the task by its ID and ensure it is associated with the given topic and is active
        const task = await TaskModel.findOne({
            _id: params.taskId,
            topic: params.topicId,
            isActive: true,
        }).populate("topic");

        // Check if the task exists and if it belongs to the user
        if (!task || task.topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        // Return the task data
        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        // Handle any errors that occur during the fetch operation
        return NextResponse.json(
            { message: "Error fetching task", error },
            { status: 500 }
        );
    }
}

/**
 * Handles PUT requests to update a specific task's content or completion status.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing topicId and taskId.
 * @returns A JSON response with the updated task data or an error message.
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { topicId: string; taskId: string } }
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

        // Find the task by its ID and ensure it is associated with the given topic and is active
        const task = await TaskModel.findOne({
            _id: params.taskId,
            topic: params.topicId,
            isActive: true,
        }).populate("topic");

        // Check if the task exists and if it belongs to the user
        if (!task || task.topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        // Parse the request body
        const { content, isCompleted } = await request.json();

        // Update fields only if provided
        if (content !== undefined) task.content = content;
        if (isCompleted !== undefined) task.isCompleted = isCompleted;

        // Save the updated task
        await task.save();

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        // Handle any errors that occur during the update operation
        return NextResponse.json(
            { message: "Error updating task", error },
            { status: 500 }
        );
    }
}

/**
 * Handles PATCH requests to partially update a specific task's content or completion status.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing topicId and taskId.
 * @returns A JSON response with the updated task data or an error message.
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: { topicId: string; taskId: string } }
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

        // Find the task by its ID and ensure it is associated with the given topic and is active
        const task = await TaskModel.findOne({
            _id: params.taskId,
            topic: params.topicId,
            isActive: true,
        }).populate("topic");

        // Check if the task exists and if it belongs to the user
        if (!task || task.topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        // Parse the request body
        const { content, isCompleted } = await request.json();

        // Update fields only if provided
        if (content !== undefined) task.content = content;
        if (isCompleted !== undefined) task.isCompleted = isCompleted;

        // Save the updated task
        await task.save();

        return NextResponse.json(task, { status: 200 });
    } catch (error) {
        // Handle any errors that occur during the partial update operation
        return NextResponse.json(
            { message: "Error updating task", error },
            { status: 500 }
        );
    }
}

/**
 * Handles DELETE requests to deactivate a specific task.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing topicId and taskId.
 * @returns A JSON response indicating success or an error message.
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { topicId: string; taskId: string } }
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

        // Find the task by its ID and ensure it is associated with the given topic and is active
        const task = await TaskModel.findOne({
            _id: params.taskId,
            topic: params.topicId,
            isActive: true,
        }).populate("topic");

        // Check if the task exists and if it belongs to the user
        if (!task || task.topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        // Deactivate the task instead of deleting it
        task.isActive = false;
        await task.save();

        return NextResponse.json(
            { message: "Task deactivated" },
            { status: 200 }
        );
    } catch (error) {
        // Handle any errors that occur during the deactivate operation
        return NextResponse.json(
            { message: "Error deactivating task", error },
            { status: 500 }
        );
    }
}
