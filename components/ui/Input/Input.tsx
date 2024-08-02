import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input: FC<InputProps> = ({ label, ...props }) => (
    <div className="w-full flex flex-col mb-4">
        <label className="mb-2 text-sm font-medium">{label}</label>
        <input
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            {...props}
        />
    </div>
);

export default Input;
