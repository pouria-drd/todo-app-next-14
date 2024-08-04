"use client";

import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
    <button
        className="bg-drd-primary/95 hover:bg-drd-primary text-white font-medium 
        rounded transition duration-150 w-full px-4 py-2 min-h-11"
        {...props}>
        {children}
    </button>
);

export default Button;
