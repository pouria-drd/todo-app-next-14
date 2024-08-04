import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <nav className={`${styles.drdNavbar} ${styles.glass}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link href="/">Todo App</Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/home">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link href="/auth/login">Login</Link>
                    </li>
                    <li>
                        <Link href="/auth/signup">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
