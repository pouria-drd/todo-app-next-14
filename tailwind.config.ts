import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                drd: {
                    primary: "#256EFF", // 00ccfd, 256EFF, 192BC2
                    bg: {
                        primary: "#ffffff",
                        secondary: "#fafbfd",
                        bgBlue: "#F9FEFF",
                    },
                    text: {
                        primary: "#444444", //292d36
                        secondary: "#80848f",
                    },
                },
            },
        },
    },
    plugins: [],
};
export default config;
