"use client";

import ProfileCard from "./ProfileCard";
import { useSession } from "next-auth/react";

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

    return <ProfileCard user={user!} />;
};

export default ProfileManager;
