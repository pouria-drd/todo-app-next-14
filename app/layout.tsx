import type { Metadata } from "next";
import { Provider } from "./provider";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Todo App",
    description: "Created by pouria darandi",
    robots: "index, follow",
    creator: "Pouria Darandi",
    publisher: "Pouria Darandi",
    authors: [{ name: "Pouria Darandi", url: "https://pouria-drd.liara.run" }],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Provider>
                <body
                    className={`${inter.className} appPX bg-drd-bg-secondary`}>
                    <Navbar />
                    {children}
                </body>
            </Provider>
        </html>
    );
}
