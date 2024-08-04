import Link from "next/link";
import NavLink from "./NavLink";
import AuthLink from "./AuthLink";
import styles from "./Navbar.module.css";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Navbar = async () => {
    // Fetch session server-side
    const session = await getServerSession(authOptions);

    if (!session) {
        return null;
    }

    return (
        <nav className={`${styles.drdNavbar} glass appPX`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl sm:text-2xl font-bold">
                    <Link href="/">Todo App</Link>
                </div>
                <ul className="flex space-x-4">
                    {session.user.role === "admin" ? (
                        <NavLink href="/admin">Admin</NavLink>
                    ) : (
                        <NavLink href="/">Home</NavLink>
                    )}
                    <NavLink href="/profile">Profile</NavLink>
                    <AuthLink />
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
