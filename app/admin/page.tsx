"use client";

import User from "@/types/User";
import { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { Badge, Table } from "@/components/ui";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (status === "authenticated" && session?.user?.role === "admin") {
            fetch("/api/users")
                .then((response) => response.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setUsers(data as User[]);
                    } else {
                        setError("Failed to load users.");
                    }
                })
                .catch(() => setError("Failed to fetch users."));
        }
    }, [status, session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return <p>You are not authenticated. Please log in.</p>;
    }

    if (session?.user?.role !== "admin") {
        return <p>You are not authorized to access this page.</p>;
    }

    const columns = [
        { header: "ID", accessor: (user: User) => user.id },
        {
            header: "Username",
            accessor: (user: User) => user.username,
            sortable: true, // Mark this column as sortable
        },
        {
            header: "Created At",
            accessor: (user: User) => formatDate(user.createdAt),
            sortable: true, // Mark this column as sortable
        },
        {
            header: "Updated At",
            accessor: (user: User) => formatDate(user.updatedAt),
        },
        {
            header: "Active",
            accessor: (user: User) =>
                user.isActive ? (
                    <Badge status="active" />
                ) : (
                    <Badge status="inactive" />
                ),
        },
    ];

    return (
        <div className="space-y-4 w-full">
            <div className="w-full">
                <h1 className="text-2xl text-left font-bold mb-4">
                    Welcome, {session.user.username}
                </h1>
            </div>
            <Table columns={columns} data={users} showIndex />
            {error && <p className="text-red-500 mb-4">{error}</p>}
        </div>
    );
}
