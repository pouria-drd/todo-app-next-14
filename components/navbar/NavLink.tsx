"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children?: React.ReactNode;
}

const NavLink = (props: NavLinkProps) => {
    const pathname = usePathname();

    const isActive =
        pathname === props.href || pathname.startsWith(`${props.href}/`);

    return (
        <Link
            className={`${styles.navLink}  ${isActive ? styles.active : ""}`}
            href={props.href}>
            {props.children}
        </Link>
    );
};

export default NavLink;
