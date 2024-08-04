"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p>You are not authenticated. Please log in.</p>;
    }

    if (session?.user?.role !== "admin") {
        return <p>You are not authorized to access this page.</p>;
    }

    return (
        <div>
            <h1>Admin Page</h1>
            <p>Welcome, {session.user.username}</p>
        </div>
    );
}
