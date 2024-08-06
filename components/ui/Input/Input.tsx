"use client";

import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({ ...props }) => (
    <input
        className="border border-gray-300 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-drd-primary 
            rounded px-3 py-2"
        {...props}
    />
);

export default Input;
