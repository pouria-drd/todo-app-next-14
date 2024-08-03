"use client";

import { ProfileCard } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";

const ProfilePage = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (!session || !session.user) {
        return (
            <p className="text-center text-gray-600">
                You need to be authenticated to view this page.
            </p>
        );
    }

    const { user } = session;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4">
            <ProfileCard user={user} onSignOut={() => signOut()} />
        </div>
    );
};

export default ProfilePage;
