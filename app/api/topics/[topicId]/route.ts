import connectDB from "@/lib/mongodb";
import TopicModel from "@/models/Topic";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler for GET request to fetch a topic by ID along with active tasks if it is active and belongs to the authenticated user.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing the topic ID.
 * @returns A JSON response with the topic data and its active tasks or an error message.
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic = await TopicModel.findOne({
            _id: params.topicId,
            isActive: true,
        }).populate({
            path: "tasks",
            match: { isActive: true }, // Filter to include only active tasks
            select: "content isActive isCompleted createdAt topic", // Select fields to return
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Topic not found" },
                { status: 404 }
            );
        }

        // Return the topic data including only active tasks
        return NextResponse.json(topic, { status: 200 });
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { message: "Error fetching topic", error },
            { status: 500 }
        );
    }
}

/**
 * Handler for PUT request to update a topic's title by ID if it is active and belongs to the authenticated user.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing the topic ID.
 * @returns A JSON response with the updated topic data or an error message.
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic = await TopicModel.findOne({
            _id: params.topicId,
            isActive: true,
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Topic not found" },
                { status: 404 }
            );
        }

        // Update the topic title
        const { title } = await request.json();
        if (title) {
            topic.title = title;
            await topic.save();
            return NextResponse.json(topic, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { message: "Error updating topic", error },
            { status: 500 }
        );
    }
}

/**
 * Handler for PATCH request to update a topic's title by ID if it is active and belongs to the authenticated user.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing the topic ID.
 * @returns A JSON response with the updated topic data or an error message.
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic = await TopicModel.findOne({
            _id: params.topicId,
            isActive: true,
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Topic not found" },
                { status: 404 }
            );
        }

        // Update the topic title
        const { title } = await request.json();
        if (title) {
            topic.title = title;
            await topic.save();
            return NextResponse.json(topic, { status: 200 });
        } else {
            return NextResponse.json(
                { message: "Invalid request body" },
                { status: 400 }
            );
        }
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { message: "Error updating topic", error },
            { status: 500 }
        );
    }
}

/**
 * Handler for DELETE request to deactivate a topic by ID if it is active and belongs to the authenticated user.
 * @param request - The Next.js request object.
 * @param params - The request parameters containing the topic ID.
 * @returns A JSON response indicating success or an error message.
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { topicId: string } }
) {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Find the topic by ID and check if it's active
        const topic = await TopicModel.findOne({
            _id: params.topicId,
            isActive: true,
        });

        // Check if the topic exists and belongs to the user
        if (!topic || topic.user.toString() !== session.user.id) {
            return NextResponse.json(
                { message: "Topic not found" },
                { status: 404 }
            );
        }

        // Deactivate the topic instead of deleting it
        topic.isActive = false;
        await topic.save();
        return NextResponse.json(
            { message: "Topic deactivated" },
            { status: 200 }
        );
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { message: "Error deactivating topic", error },
            { status: 500 }
        );
    }
}
