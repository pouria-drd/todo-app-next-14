"use client";

import { ProfileCard } from "@/components/ui";
import { useSession, signOut } from "next-auth/react";

const ProfileManager = () => {
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

    return <ProfileCard user={user} onSignOut={() => signOut()} />;
};

export default ProfileManager;
