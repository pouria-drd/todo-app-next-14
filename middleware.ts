import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        if (!req.nextauth.token) {
            // Redirect to login page if not authenticated
            return NextResponse.redirect(new URL("/login", req.url));
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        // Protect all paths except for /login, /register, and the landing page (/)
        // "/((?!login|register|).*)",
        // "/((?!login|register|checkAuth).*)", // Protect all routes except login and register
    ],
};
