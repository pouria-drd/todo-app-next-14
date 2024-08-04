import User from "@/types/User";
import { NextApiRequest } from "next";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET(request: NextApiRequest) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    try {
        const users: User[] = await getUsers(); // Fetch users from your database
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
