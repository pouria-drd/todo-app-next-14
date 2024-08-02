import connectDB from "@/lib/mongodb";
import type { NextAuthOptions } from "next-auth";

import bcrypt from "bcryptjs";
import User from "@/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    throw new Error("Username and password are required!");
                }

                await connectDB();

                const user = await User.findOne({
                    username: credentials.username,
                }).select("+password");

                if (!user) {
                    throw new Error("Wrong username or password!");
                }

                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordMatch) {
                    throw new Error("Wrong username or password!");
                }

                return user;

                // return {
                //     _id: user._id,
                //     username: user.username,
                //     isActive: user.isActive,
                //     userRole: user.userRole,
                //     createdAt: user.createdAt,
                //     updatedAt: user.updatedAt,
                // };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login", // Use the custom login page
    },
};
