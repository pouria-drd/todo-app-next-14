"use client";

import NavLink from "./NavLink";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const AuthLink = () => {
    const router = useRouter();
    const { status } = useSession();

    const showLink = () => {
        if (status === "authenticated") {
            return (
                <button
                    className="text-drd-primary/80 hover:text-drd-primary transition-all duration-200"
                    onClick={() => {
                        signOut({ redirect: false }).then(() => {
                            router.push("/login");
                        });
                    }}>
                    Log Out
                </button>
            );
        } else if (status === "loading") {
            return (
                <span className="text-drd-text-primary/80 text-xs mt-1">
                    Loading...
                </span>
            );
        } else {
            return <NavLink href="/login">Login</NavLink>;
        }
    };

    return <>{showLink()}</>;
};

export default AuthLink;
