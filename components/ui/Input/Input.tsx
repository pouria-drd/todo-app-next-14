"use client";

import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => (
    <div className="w-full flex flex-col gap-1">
        {label && <p className="text-sm font-medium">{label}</p>}
        <input
            className="border border-gray-300 transition-all duration-150
            focus:outline-none focus:ring-2 focus:ring-drd-primary 
            rounded px-3 py-2"
            {...props}
        />
    </div>
);

export default Input;
