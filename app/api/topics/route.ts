import connectDB from "@/lib/mongodb";
import TopicModel from "@/models/Topic";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

/**
 * Handler for GET request to fetch all active topics belonging to the authenticated user.
 * @param request - The Next.js request object.
 * @returns A JSON response with the list of active topics or an error message.
 */
export async function GET(request: Request) {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Find all active topics for the authenticated user
        const topics = await TopicModel.find({
            user: session.user.id,
            isActive: true,
        });

        // Return the list of topics
        return NextResponse.json(topics, { status: 200 });
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { message: "Error fetching topics", error },
            { status: 500 }
        );
    }
}

/**
 * Handler for POST request to create a new topic for the authenticated user.
 * @param request - The Next.js request object.
 * @returns A JSON response with the created topic data or an error message.
 */
export async function POST(request: Request) {
    // Get the session information
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectDB();

    try {
        // Parse the request body to get the title
        const { title } = await request.json();

        // Create a new topic with the provided title and authenticated user ID
        const newTopic = new TopicModel({ title, user: session.user.id });

        // Save the new topic to the database
        await newTopic.save();

        // Return the created topic
        return NextResponse.json(newTopic, { status: 201 });
    } catch (error) {
        // Handle errors
        return NextResponse.json(
            { message: "Error creating topic", error },
            { status: 500 }
        );
    }
}
