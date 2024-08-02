import type { Metadata } from "next";
import { Provider } from "./provider";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Todo App",
    description: "Created by pouria darandi",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Provider>
                <body className={inter.className}>{children}</body>
            </Provider>
        </html>
    );
}
