import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Todo App | Admin",
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
    return (
        <section className="flex flex-col items-center justify-start p-4 w-full h-svh">
            {children}
        </section>
    );
};

export default AuthLayout;
