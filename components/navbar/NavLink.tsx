import Link from "next/link";
import styles from "./Navbar.module.css";

interface NavLinkProps {
    href: string;
    children?: React.ReactNode;
}

const NavLink = (navLinkProps: NavLinkProps) => {
    return (
        <Link className={`${styles.navLink} `} href={navLinkProps.href}>
            {navLinkProps.children}
        </Link>
    );
};

export default NavLink;
