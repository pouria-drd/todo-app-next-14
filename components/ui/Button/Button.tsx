"use client";

import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
    <button
        className={`bg-drd-primary/95 hover:bg-drd-primary 
        text-white font-medium 
        rounded transition duration-150 px-3 py-2`}
        {...props}>
        {children}
    </button>
);

export default Button;
