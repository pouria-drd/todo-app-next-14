"use client";

import Link from "next/link";
import { Button, Input } from "../ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/registerUser";
import { useSearchParams } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

interface AuthFormProps {
    type: "Login" | "Register";
}

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams(); // Use this to get URL parameters
    const callbackUrl = searchParams.get("callbackUrl") || "/"; // Default to home if no callbackUrl

    const handleRegistration = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (!username || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const res = await registerUser({ username, password });

        if (res?.error) {
            setError(res.error);
            return;
        }

        formRef.current?.reset();
        router.push("/login");
    };

    const handleLogin = async (formData: FormData) => {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        if (!username || !password) {
            setError("All fields are required.");
            return;
        }

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
            callbackUrl, // Pass the callbackUrl here
        });

        if (res?.error) {
            setError(res.error as string);
            return;
        }

        if (res?.ok && res.url) {
            // Use window.location.href for a full page reload
            window.location.href = res.url;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setError(null);
        if (type === "Login") {
            await handleLogin(formData);
        } else {
            await handleRegistration(formData);
        }
    };

    return (
        <form
            ref={formRef}
            className="flex flex-col justify-between items-center gap-4 
            bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
            onSubmit={handleSubmit}>
            <h1 className="mb-5 w-full text-2xl font-bold">
                {type === "Login" ? "Sign In" : "Register"}
            </h1>
            <Input
                required
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
            />
            <Input
                required
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
            />
            {type === "Register" && (
                <Input
                    required
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                />
            )}
            <Button type="submit">
                {type === "Login" ? "Sign In" : "Sign Up"}
            </Button>
            <Link
                href={type === "Login" ? "/register" : "/login"}
                className="text-sm text-[#888] transition duration-150 ease hover:text-black">
                {type === "Login"
                    ? "Don't have an account?"
                    : "Already have an account?"}
            </Link>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    );
};

export default AuthForm;
