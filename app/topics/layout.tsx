import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Todo App | Topics",
    description: "Created by pouria darandi",
    robots: "index, follow",
    creator: "Pouria Darandi",
    publisher: "Pouria Darandi",
    authors: [{ name: "Pouria Darandi", url: "https://pouria-drd.liara.run" }],
};

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return <section className="pt-4">{children}</section>;
};

export default AuthLayout;
