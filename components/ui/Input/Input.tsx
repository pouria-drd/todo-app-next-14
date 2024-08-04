"use client";

import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => (
    <div className="w-full flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium">{label}</label>
        <input
            className="border border-gray-300 transition-all duration-200
             focus:outline-none focus:ring-2 focus:ring-drd-primary 
            rounded  min-h-11 w-full px-4 py-2"
            {...props}
        />
    </div>
);

export default Input;
