"use client";

import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
}

const Button: FC<ButtonProps> = ({ text, ...props }) => (
    <button
        className="w-full h-10 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-150"
        {...props}>
        {text}
    </button>
);

export default Button;
